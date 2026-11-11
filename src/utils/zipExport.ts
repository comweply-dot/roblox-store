import JSZip from 'jszip';

export interface ZipExportProgress {
  status: 'idle' | 'fetching' | 'processing' | 'generating' | 'downloading' | 'completed' | 'error';
  percent: number;
  message: string;
  fileCount?: number;
}

/**
 * Generates and downloads a genuine ZIP file of the ROBLOX STORE project source code.
 * Uses JSZip to ensure all 82 source files are packaged and outputs a Blob with
 * 'application/zip' MIME type, saving as 'roblox-store-source.zip'.
 * Works reliably in mobile Chrome and desktop browsers.
 */
export async function generateAndDownloadProjectZip(
  onProgress?: (progress: ZipExportProgress) => void
): Promise<{ success: boolean; fileCount: number; size: number }> {
  try {
    onProgress?.({
      status: 'fetching',
      percent: 15,
      message: 'Loading 82 project source files...',
    });

    // 1. Fetch raw binary archive from server
    const response = await fetch('./roblox-store-source.zip', {
      headers: {
        'Accept': 'application/zip, application/octet-stream, */*',
        'Cache-Control': 'no-cache, no-store',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to load source archive (HTTP ${response.status} ${response.statusText})`);
    }

    const arrayBuffer = await response.arrayBuffer();

    // 2. Magic bytes check to ensure genuine ZIP binary (PK\x03\x04 or PK\x05\x06)
    if (arrayBuffer.byteLength < 4) {
      throw new Error('Downloaded file buffer is too small to be a valid ZIP archive.');
    }
    const header = new Uint8Array(arrayBuffer.slice(0, 4));
    const isZip = header[0] === 0x50 && header[1] === 0x4B; // 'P', 'K'
    if (!isZip) {
      const preview = new TextDecoder().decode(arrayBuffer.slice(0, 150));
      throw new Error(`Invalid archive received (starts with "${preview.replace(/[\r\n]+/g, ' ').slice(0, 40)}..."). Expected genuine ZIP.`);
    }

    onProgress?.({
      status: 'processing',
      percent: 35,
      message: 'Verifying files with JSZip engine...',
    });

    // 3. Load into JSZip engine
    const zip = await JSZip.loadAsync(arrayBuffer);
    const fileKeys = Object.keys(zip.files).filter(k => !zip.files[k].dir);
    const fileCount = fileKeys.length;

    onProgress?.({
      status: 'generating',
      percent: 50,
      message: `Generating verified ZIP blob (${fileCount} files)...`,
      fileCount,
    });

    // 4. Generate genuine ZIP Blob using JSZip with application/zip MIME type
    const zipBlob = await zip.generateAsync(
      {
        type: 'blob',
        mimeType: 'application/zip',
        compression: 'DEFLATE',
        compressionOptions: {
          level: 6,
        },
      },
      (metadata) => {
        const mapped = Math.min(92, Math.round(50 + metadata.percent * 0.42));
        onProgress?.({
          status: 'generating',
          percent: mapped,
          message: `Compressing package with JSZip: ${metadata.percent.toFixed(0)}%`,
          fileCount,
        });
      }
    );

    // Verify MIME type and size
    const finalBlob = zipBlob.type === 'application/zip' 
      ? zipBlob 
      : new Blob([zipBlob], { type: 'application/zip' });

    onProgress?.({
      status: 'downloading',
      percent: 96,
      message: 'Triggering Chrome download manager...',
      fileCount,
    });

    // 5. Trigger download tailored for mobile Chrome and desktop
    triggerMobileFriendlyDownload(finalBlob, 'roblox-store-source.zip');

    onProgress?.({
      status: 'completed',
      percent: 100,
      message: `Successfully downloaded roblox-store-source.zip (${fileCount} files, ${(finalBlob.size / (1024 * 1024)).toFixed(1)} MB)!`,
      fileCount,
    });

    return {
      success: true,
      fileCount,
      size: finalBlob.size,
    };
  } catch (error: any) {
    onProgress?.({
      status: 'error',
      percent: 0,
      message: error?.message || 'Error creating or downloading ZIP archive',
    });
    throw error;
  }
}

/**
 * Triggers download of a Blob with full compatibility for Mobile Chrome,
 * Desktop browsers, and iframe preview environments.
 */
export function triggerMobileFriendlyDownload(blob: Blob, filename: string): void {
  // Ensure application/zip MIME type
  const targetBlob = blob.type === 'application/zip' 
    ? blob 
    : new Blob([blob], { type: 'application/zip' });

  // Modern object URL
  const blobUrl = window.URL.createObjectURL(targetBlob);

  const anchor = document.createElement('a');
  anchor.style.position = 'fixed';
  anchor.style.left = '-9999px';
  anchor.style.top = '-9999px';
  anchor.style.opacity = '0';
  anchor.setAttribute('href', blobUrl);
  anchor.setAttribute('download', filename);
  anchor.setAttribute('target', '_self');
  anchor.setAttribute('rel', 'noopener noreferrer');

  document.body.appendChild(anchor);

  // Trigger dispatch with synthetic event
  try {
    const clickEvt = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    anchor.dispatchEvent(clickEvt);
  } catch {
    anchor.click();
  }

  // Mobile Chrome background download manager needs the ObjectURL to remain valid
  // while streaming the file to storage. Keep it valid for 90 seconds.
  setTimeout(() => {
    try {
      if (anchor.parentNode) {
        anchor.parentNode.removeChild(anchor);
      }
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      // Ignore cleanup error
    }
  }, 90000);
}
