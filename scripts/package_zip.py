#!/usr/bin/env python3
import os
import zipfile

def make_zip(source_dir, output_zip_path):
    exclude_dirs = {
        'node_modules',
        '.git',
        'dist',
        '.aistudio',
        '.cache',
        '__pycache__',
        '.tmp'
    }
    
    exclude_files = {
        'roblox-store-source.zip',
        '.DS_Store'
    }

    print(f"Creating archive: {output_zip_path} from {source_dir}")
    count = 0
    with zipfile.ZipFile(output_zip_path, 'w', compression=zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(source_dir):
            # Prune excluded directories in-place (ensure .github is kept!)
            dirs[:] = [d for d in dirs if d not in exclude_dirs and d != '.git' and not d.startswith('.git_')]
            
            for file in files:
                if file in exclude_files or file.endswith('.zip'):
                    continue
                abs_path = os.path.join(root, file)
                rel_path = os.path.relpath(abs_path, source_dir)
                
                # Double-check relative path does not start with excluded dirs
                parts = rel_path.split(os.sep)
                if any(p in exclude_dirs for p in parts):
                    continue
                
                zipf.write(abs_path, arcname=rel_path)
                count += 1
                
    file_size_mb = os.path.getsize(output_zip_path) / (1024 * 1024)
    print(f"Archive created successfully: {count} files packed ({file_size_mb:.2f} MB)")

if __name__ == '__main__':
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    
    # 1. Write to public/roblox-store-source.zip for direct browser download
    pub_zip = os.path.join(root_dir, 'public', 'roblox-store-source.zip')
    make_zip(root_dir, pub_zip)
    
    # 2. Also write to root directory
    root_zip = os.path.join(root_dir, 'roblox-store-source.zip')
    import shutil
    shutil.copyfile(pub_zip, root_zip)
    print(f"Copied archive to {root_zip}")
