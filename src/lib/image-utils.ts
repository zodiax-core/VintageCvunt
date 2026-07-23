export async function toWebP(file: File, quality = 0.82): Promise<File> {
  if (!file.type.startsWith("image/")) return file;

  const img = new Image();
  const blob = await new Promise<Blob | null>((resolve, reject) => {
    img.onload = () => {
      URL.revokeObjectURL(img.src);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) { reject(new Error("Canvas ctx unavailable")); return; }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(resolve, "image/webp", quality);
    };
    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error("Image load failed"));
    };
    img.src = URL.createObjectURL(file);
  });

  if (!blob) return file;
  const name = file.name.replace(/\.[^.]+$/, "") + ".webp";
  return new File([blob], name, { type: "image/webp" });
}
