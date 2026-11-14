// Client-side image compression. Run this in the browser BEFORE uploading,
// so only a small file ever reaches your storage.
// Usage: const small = await compressImage(fileInput.files[0]);
//        // upload `small` (a File) instead of the original.

export async function compressImage(file, { maxWidth = 1400, maxBytes = 250 * 1024, type = "image/webp" } = {}) {
  if (!file.type.startsWith("image/") || file.type === "image/gif") return file;
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, maxWidth / bmp.width);
  const w = Math.round(bmp.width * scale), h = Math.round(bmp.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w; canvas.height = h;
  canvas.getContext("2d").drawImage(bmp, 0, 0, w, h);

  let q = 0.82, blob;
  do {
    blob = await new Promise(r => canvas.toBlob(r, type, q));
    q -= 0.08;
  } while (blob && blob.size > maxBytes && q > 0.3);

  if (!blob || blob.size >= file.size) return file; // keep original if no gain
  const name = file.name.replace(/\.[^.]+$/, "") + ".webp";
  return new File([blob], name, { type: blob.type });
}
