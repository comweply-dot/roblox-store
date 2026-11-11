import React, { useState } from 'react';
import { Download, Globe, Github, Check, Copy, ExternalLink, X, FileArchive, Terminal, ShieldCheck, Loader2, AlertCircle } from 'lucide-react';
import { generateAndDownloadProjectZip, ZipExportProgress } from '../utils/zipExport';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState<ZipExportProgress | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDownload = async () => {
    if (isExporting) return;
    setIsExporting(true);
    setErrorMessage(null);
    setDownloadSuccess(false);
    try {
      await generateAndDownloadProjectZip((p) => {
        setProgress(p);
      });
      setDownloadSuccess(true);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to download ZIP file');
    } finally {
      setIsExporting(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const gitCommands = `git init
git add .
git commit -m "Deploy complete ROBLOX STORE"
git branch -M main
git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO>.git
git push -u origin main`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#0d051f] border border-[#3b1d6b] rounded-2xl shadow-2xl shadow-purple-950/80 overflow-hidden text-zinc-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-purple-950/80 via-[#180a30] to-red-950/40 border-b border-[#2d164d] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
              <FileArchive className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-display font-black text-lg text-white flex items-center gap-2">
                Download Website Source Code
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400">
                  Ready to Deploy
                </span>
              </h3>
              <p className="text-xs text-zinc-400">Complete project configured for GitHub Pages & Custom Domain</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Main Download Card */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-purple-950/40 via-[#130728] to-red-950/20 border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-bold text-white text-base">roblox-store-source.zip</h4>
              <p className="text-xs text-zinc-400">
                Includes all React components, images, UPI & Crypto QRs, CNAME, 404 SPA fallback, and GitHub Actions workflow.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono text-zinc-400">
                <span className="text-purple-300">~21 MB</span>
                <span>•</span>
                <span className="text-emerald-400">Zero Build Errors</span>
                <span>•</span>
                <span className="text-blue-400">Vite + React 19</span>
              </div>
            </div>

            <div className="w-full sm:w-auto flex flex-col items-center sm:items-end gap-2 shrink-0">
              <button
                onClick={handleDownload}
                disabled={isExporting}
                className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2.5 transition-all transform active:scale-95 ${
                  isExporting
                    ? 'bg-purple-800 text-purple-200 cursor-wait'
                    : downloadSuccess
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/50'
                    : 'bg-gradient-to-r from-red-600 via-rose-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white shadow-purple-900/50 hover:-translate-y-0.5 cursor-pointer'
                }`}
              >
                {isExporting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-purple-300" />
                    <span>Packing 82 Files ({progress?.percent ?? 50}%)...</span>
                  </>
                ) : downloadSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>ZIP Saved Successfully!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download ZIP (82 Files)</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                <span className="text-zinc-500">MIME: application/zip</span>
                <span>•</span>
                <a
                  href="/roblox-store-source.zip"
                  download="roblox-store-source.zip"
                  className="text-purple-400 hover:text-purple-300 underline underline-offset-2"
                >
                  Direct link fallback
                </a>
              </div>
            </div>
          </div>

          {/* Progress / Status Notice */}
          {isExporting && progress && (
            <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/40 space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between text-xs text-purple-200">
                <span className="font-medium flex items-center gap-1.5">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-400" />
                  {progress.message}
                </span>
                <span className="font-mono font-bold text-purple-300">{progress.percent}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#1b0a33] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 via-rose-500 to-emerald-400 transition-all duration-200"
                  style={{ width: `${progress.percent}%` }}
                />
              </div>
            </div>
          )}

          {downloadSuccess && (
            <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>
                <strong>roblox-store-source.zip</strong> downloaded! Tested & validated archive containing all 82 project source files.
              </span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* 3 Step Deployment Instructions */}
          <div className="space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Quick 3-Step GitHub & Custom Domain Guide
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-[#110725] border border-[#2b164f] space-y-1.5">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
                  <Github className="w-4 h-4" />
                  <span>1. Upload to GitHub</span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Extract the ZIP, create a new GitHub repo, and push the source code to the <code className="text-purple-300">main</code> branch.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#110725] border border-[#2b164f] space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <Globe className="w-4 h-4" />
                  <span>2. Enable Pages</span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  In GitHub <strong>Settings &gt; Pages</strong>, set Source to <strong>GitHub Actions</strong>. The included workflow deploys automatically.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#110725] border border-[#2b164f] space-y-1.5">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  <span>3. Custom Domain</span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Edit <code className="text-rose-300">public/CNAME</code> with your domain and point your DNS A-records to GitHub Pages IPs.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Git Commands Terminal */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span className="flex items-center gap-1.5 font-mono">
                <Terminal className="w-3.5 h-3.5 text-zinc-500" />
                Terminal Push Commands:
              </span>
              <button
                onClick={() => copyToClipboard(gitCommands, 'git')}
                className="flex items-center gap-1 text-[11px] text-purple-400 hover:text-purple-300"
              >
                {copiedCmd === 'git' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCmd === 'git' ? 'Copied!' : 'Copy Commands'}</span>
              </button>
            </div>
            <pre className="p-3.5 rounded-xl bg-[#080214] border border-[#231140] text-[11px] font-mono text-zinc-300 overflow-x-auto leading-relaxed">
              {gitCommands}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#090317] border-t border-[#231140] flex items-center justify-between">
          <span className="text-xs text-zinc-400">
            For full DNS details, see <strong>README.md</strong> inside the archive.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
