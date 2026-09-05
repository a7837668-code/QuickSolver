// Client-side image processing utilities using HTML5 Canvas

export interface ImageProcessingResult {
  dataUrl: string;
  blob: Blob;
  fileName: string;
  originalSize: number;
  newSize: number;
  originalWidth: number;
  originalHeight: number;
  newWidth: number;
  newHeight: number;
  compressionRatio: number;
}

export function loadImage(file: File | Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to decode image file. Make sure it is a valid image format.'));
    };
    img.src = url;
  });
}

export async function compressImage(
  file: File,
  quality: number = 0.75,
  maxWidth: number = 1920,
  maxHeight: number = 1920
): Promise<ImageProcessingResult> {
  const img = await loadImage(file);
  let width = img.naturalWidth;
  let height = img.naturalHeight;

  // Scale down if exceeds max dimensions
  if (width > maxWidth || height > maxHeight) {
    const ratio = Math.min(maxWidth / width, maxHeight / height);
    width = Math.round(width * ratio);
    height = Math.round(height * ratio);
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas 2D context.');

  ctx.drawImage(img, 0, 0, width, height);

  // Default to webp or jpeg for compression
  const mimeType = file.type === 'image/png' ? 'image/jpeg' : file.type || 'image/jpeg';
  const dataUrl = canvas.toDataURL(mimeType, quality);

  const resBlob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      b => {
        if (b) resolve(b);
        else reject(new Error('Failed to generate image blob.'));
      },
      mimeType,
      quality
    );
  });

  const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
  const ext = mimeType === 'image/jpeg' ? 'jpg' : 'webp';
  const outName = `${baseName}-compressed.${ext}`;

  return {
    dataUrl,
    blob: resBlob,
    fileName: outName,
    originalSize: file.size,
    newSize: resBlob.size,
    originalWidth: img.naturalWidth,
    originalHeight: img.naturalHeight,
    newWidth: width,
    newHeight: height,
    compressionRatio: Number((((file.size - resBlob.size) / file.size) * 100).toFixed(1)),
  };
}

export async function resizeImage(
  file: File,
  targetWidth: number,
  targetHeight: number,
  quality: number = 0.9
): Promise<ImageProcessingResult> {
  const img = await loadImage(file);
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(targetWidth));
  canvas.height = Math.max(1, Math.round(targetHeight));

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not initialize canvas context.');

  // High quality image smoothing
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const mimeType = file.type || 'image/png';
  const dataUrl = canvas.toDataURL(mimeType, quality);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      b => (b ? resolve(b) : reject(new Error('Blob generation failed'))),
      mimeType,
      quality
    );
  });

  const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
  const ext = mimeType.split('/')[1] || 'png';

  return {
    dataUrl,
    blob,
    fileName: `${baseName}-resized.${ext}`,
    originalSize: file.size,
    newSize: blob.size,
    originalWidth: img.naturalWidth,
    originalHeight: img.naturalHeight,
    newWidth: canvas.width,
    newHeight: canvas.height,
    compressionRatio: Number((((file.size - blob.size) / file.size) * 100).toFixed(1)),
  };
}

export async function convertImageFormat(
  file: File,
  targetFormat: 'image/png' | 'image/jpeg' | 'image/webp',
  quality: number = 0.92,
  backgroundColor: string = '#ffffff'
): Promise<ImageProcessingResult> {
  const img = await loadImage(file);
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable.');

  if (targetFormat === 'image/jpeg') {
    // Fill transparent background for JPEG
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.drawImage(img, 0, 0);

  const dataUrl = canvas.toDataURL(targetFormat, quality);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      b => (b ? resolve(b) : reject(new Error('Blob generation failed'))),
      targetFormat,
      quality
    );
  });

  const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || 'image';
  const extMap: Record<string, string> = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/webp': 'webp',
  };
  const ext = extMap[targetFormat] || 'png';

  return {
    dataUrl,
    blob,
    fileName: `${baseName}-converted.${ext}`,
    originalSize: file.size,
    newSize: blob.size,
    originalWidth: img.naturalWidth,
    originalHeight: img.naturalHeight,
    newWidth: canvas.width,
    newHeight: canvas.height,
    compressionRatio: Number((((file.size - blob.size) / file.size) * 100).toFixed(1)),
  };
}

export async function cropImage(
  file: File,
  cropX: number,
  cropY: number,
  cropWidth: number,
  cropHeight: number
): Promise<ImageProcessingResult> {
  const img = await loadImage(file);
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(cropWidth));
  canvas.height = Math.max(1, Math.round(cropHeight));

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context unavailable');

  ctx.drawImage(
    img,
    cropX,
    cropY,
    cropWidth,
    cropHeight,
    0,
    0,
    canvas.width,
    canvas.height
  );

  const mimeType = file.type || 'image/png';
  const dataUrl = canvas.toDataURL(mimeType, 0.95);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(b => (b ? resolve(b) : reject(new Error('Blob failed'))), mimeType, 0.95);
  });

  const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || 'image';
  const ext = mimeType.split('/')[1] || 'png';

  return {
    dataUrl,
    blob,
    fileName: `${baseName}-cropped.${ext}`,
    originalSize: file.size,
    newSize: blob.size,
    originalWidth: img.naturalWidth,
    originalHeight: img.naturalHeight,
    newWidth: canvas.width,
    newHeight: canvas.height,
    compressionRatio: Number((((file.size - blob.size) / file.size) * 100).toFixed(1)),
  };
}

export function formatBytes(bytes: number, decimals: number = 1): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
