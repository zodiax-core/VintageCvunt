import type { ImgHTMLAttributes } from "react";

type OptimizedImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  webp: string;
  fallback: string;
};

export function OptimizedImage({ webp, fallback, className, alt, ...rest }: OptimizedImageProps) {
  return (
    <picture>
      <source srcSet={webp} type="image/webp" />
      <img src={fallback} alt={alt ?? ""} className={className} {...rest} />
    </picture>
  );
}
