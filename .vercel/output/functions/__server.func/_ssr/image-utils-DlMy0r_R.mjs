//#region node_modules/.nitro/vite/services/ssr/assets/image-utils-DlMy0r_R.js
async function toWebP(file, quality = .82) {
	if (!file.type.startsWith("image/")) return file;
	const img = new Image();
	const blob = await new Promise((resolve, reject) => {
		img.onload = () => {
			URL.revokeObjectURL(img.src);
			const canvas = document.createElement("canvas");
			canvas.width = img.width;
			canvas.height = img.height;
			const ctx = canvas.getContext("2d");
			if (!ctx) {
				reject(/* @__PURE__ */ new Error("Canvas ctx unavailable"));
				return;
			}
			ctx.drawImage(img, 0, 0);
			canvas.toBlob(resolve, "image/webp", quality);
		};
		img.onerror = () => {
			URL.revokeObjectURL(img.src);
			reject(/* @__PURE__ */ new Error("Image load failed"));
		};
		img.src = URL.createObjectURL(file);
	});
	if (!blob) return file;
	const name = file.name.replace(/\.[^.]+$/, "") + ".webp";
	return new File([blob], name, { type: "image/webp" });
}
//#endregion
export { toWebP as t };
