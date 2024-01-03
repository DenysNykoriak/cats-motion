import { useEffect, useRef } from "react";

export const usePreloadImages = (urls: string[]) => {
  const preloadedRef = useRef<Set<string>>(new Set());
  const urlsKey = urls.join("\0");

  useEffect(() => {
    urls.forEach((url) => {
      if (!url || preloadedRef.current.has(url)) {
        return;
      }

      preloadedRef.current.add(url);

      const image = new window.Image();

      image.src = url;
    });
  }, [urlsKey, urls]);
};
