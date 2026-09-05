import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, Image as ImageIcon, RefreshCw, Check, Lock, Unlock } from 'lucide-react';
import {
  compressImage,
  resizeImage,
  convertImageFormat,
  cropImage,
  formatBytes,
} from '../../utils/calculations/image';

interface ImageToolsProps {
  toolSlug: string;
}

export const ImageTools: React.FC<ImageToolsProps> = ({ toolSlug }) => {
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);

  // Compressor quality
  const [quality, setQuality] = useState<number>(0.8);

  // Resizer dimensions
  const [targetWidth, setTargetWidth] = useState<number>(800);
  const [targetHeight, setTargetHeight] = useState<number>(600);
  const [maintainAspect, setMaintainAspect] = useState<boolean>(true);

  // Cropper simple coords
  const [cropX, setCropX] = useState<number>(0);
  const [cropY, setCropY] = useState<number>(0);
  const [cropW, setCropW] = useState<number>(400);
  const [cropH, setCropH] = useState<number>(400);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // When a file is loaded, extract dimensions and preview
  const handleFileChange = (newFile: File) => {
    if (!newFile || !newFile.type.startsWith('image/')) return;
    setFile(newFile);
    const url = URL.createObjectURL(newFile);
    setImageSrc(url);
    setProcessedBlob(null);
    setProcessedUrl(null);

    const img = new Image();
    img.src = url;
    img.onload = () => {
      setOriginalDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      setTargetWidth(img.naturalWidth);
      setTargetHeight(img.naturalHeight);
      setCropW(Math.min(img.naturalWidth, 400));
      setCropH(Math.min(img.naturalHeight, 400));
    };
  };

  const handleWidthChange = (w: number) => {
    setTargetWidth(w);
    if (maintainAspect && originalDimensions.width > 0) {
      const ratio = originalDimensions.height / originalDimensions.width;
      setTargetHeight(Math.round(w * ratio));
    }
  };

  const handleHeightChange = (h: number) => {
    setTargetHeight(h);
    if (maintainAspect && originalDimensions.height > 0) {
      const ratio = originalDimensions.width / originalDimensions.height;
      setTargetWidth(Math.round(h * ratio));
    }
  };

  // Perform the target tool operation
  const processImageAction = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      let result: any = null;

      if (toolSlug === 'image-compressor') {
        result = await compressImage(file, quality);
      } else if (toolSlug === 'image-resizer') {
        result = await resizeImage(file, targetWidth, targetHeight, quality);
      } else if (toolSlug === 'jpg-to-png') {
        result = await convertImageFormat(file, 'image/png');
      } else if (toolSlug === 'png-to-jpg') {
        result = await convertImageFormat(file, 'image/jpeg', quality);
      } else if (toolSlug === 'webp-converter') {
        result = await convertImageFormat(file, 'image/webp', quality);
      } else if (toolSlug === 'image-cropper') {
        result = await cropImage(file, cropX, cropY, cropW, cropH);
      }

      if (result) {
        setProcessedBlob(result.blob);
        setProcessedUrl(result.dataUrl || URL.createObjectURL(result.blob));
      }
    } catch (err) {
      console.error('Image processing failed', err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Auto-process on parameter changes if image is loaded
  useEffect(() => {
    if (file) {
      const timer = setTimeout(() => {
        processImageAction();
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [file, quality, targetWidth, targetHeight, cropX, cropY, cropW, cropH, toolSlug]);

  const handleDownload = () => {
    if (!processedUrl || !file) return;
    let ext = 'jpg';
    if (toolSlug === 'jpg-to-png') ext = 'png';
    else if (toolSlug === 'webp-converter') ext = 'webp';
    else if (processedBlob?.type.includes('png')) ext = 'png';

    const baseName = file.name.replace(/\.[^/.]+$/, '');
    const downloadName = `${baseName}_quicksolve.${ext}`;

    const link = document.createElement('a');
    link.href = processedUrl;
    link.download = downloadName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* File Upload Zone */}
      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={e => e.preventDefault()}
          onDrop={e => {
            e.preventDefault();
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              handleFileChange(e.dataTransfer.files[0]);
            }
          }}
          className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-colors bg-slate-50/50 dark:bg-slate-800/40"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={e => e.target.files?.[0] && handleFileChange(e.target.files[0])}
            className="hidden"
          />
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-4">
            <Upload className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-slate-800 dark:text-white text-base sm:text-lg">
            Choose an image or drag &amp; drop it here
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Supports PNG, JPEG, WebP, GIF, SVG. 100% processed securely in your browser.
          </p>
          <button
            type="button"
            className="mt-5 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs shadow-sm hover:bg-blue-700 transition-colors"
          >
            Browse Image File
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Active File Header */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex-shrink-0">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-sm text-slate-800 dark:text-slate-200 truncate">
                  {file.name}
                </div>
                <div className="text-xs text-slate-500">
                  {formatBytes(file.size)} • {originalDimensions.width} × {originalDimensions.height}px
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setFile(null);
                setImageSrc(null);
                setProcessedBlob(null);
                setProcessedUrl(null);
              }}
              className="text-xs text-slate-400 hover:text-rose-500 font-medium"
            >
              Choose Different
            </button>
          </div>

          {/* Controls Specific to Tool */}
          {toolSlug === 'image-compressor' && (
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Compression Quality ({Math.round(quality * 100)}%)
                </label>
                <span className="text-xs text-slate-400">
                  {quality > 0.8 ? 'High Quality' : quality > 0.5 ? 'Balanced' : 'Smallest Size'}
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.95"
                step="0.05"
                value={quality}
                onChange={e => setQuality(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>
          )}

          {toolSlug === 'image-resizer' && (
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Width (px)
                  </label>
                  <input
                    type="number"
                    min="10"
                    value={targetWidth}
                    onChange={e => handleWidthChange(parseInt(e.target.value, 10) || 10)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Height (px)
                  </label>
                  <input
                    type="number"
                    min="10"
                    value={targetHeight}
                    onChange={e => handleHeightChange(parseInt(e.target.value, 10) || 10)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMaintainAspect(prev => !prev)}
                className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 hover:text-blue-600"
              >
                {maintainAspect ? <Lock className="w-3.5 h-3.5 text-blue-600" /> : <Unlock className="w-3.5 h-3.5 text-slate-400" />}
                <span>Maintain aspect ratio ({maintainAspect ? 'Locked' : 'Freeform'})</span>
              </button>
            </div>
          )}

          {toolSlug === 'image-cropper' && (
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Start X (px)</label>
                  <input
                    type="number"
                    min="0"
                    value={cropX}
                    onChange={e => setCropX(parseInt(e.target.value, 10) || 0)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Start Y (px)</label>
                  <input
                    type="number"
                    min="0"
                    value={cropY}
                    onChange={e => setCropY(parseInt(e.target.value, 10) || 0)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Crop Width</label>
                  <input
                    type="number"
                    min="10"
                    value={cropW}
                    onChange={e => setCropW(parseInt(e.target.value, 10) || 10)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Crop Height</label>
                  <input
                    type="number"
                    min="10"
                    value={cropH}
                    onChange={e => setCropH(parseInt(e.target.value, 10) || 10)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Results Comparison & Download */}
          {processedBlob && processedUrl && (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-slate-800/80 dark:to-slate-800/40 border border-blue-100 dark:border-slate-700 space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase">
                    Processed Result
                  </span>
                  <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 mt-0.5">
                    {formatBytes(processedBlob.size)}
                  </div>
                  {file.size > processedBlob.size && (
                    <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                      ✓ Saved {Math.round(((file.size - processedBlob.size) / file.size) * 100)}% of original size
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleDownload}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Image</span>
                </button>
              </div>

              {/* Preview Image */}
              <div className="mt-4 flex items-center justify-center p-2 rounded-xl bg-slate-100 dark:bg-slate-900/60 max-h-64 overflow-hidden">
                <img
                  src={processedUrl}
                  alt="Processed preview"
                  referrerPolicy="no-referrer"
                  className="max-h-60 max-w-full object-contain rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
