import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import canvasImages from "./canvasimage";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Canvas({ details }) {
  const { startIndex, numImages, duration, size, top, left, zIndex } = details;

  const [index, setIndex] = useState(startIndex);
  const canvasRef = useRef(null);
  const animationValue = useRef(startIndex);
  const imageCache = useRef({});
  const randomScrollSpeed = useRef(Math.random().toFixed(1));

  const canvasImagesLength = useMemo(() => canvasImages.length, []);

  const handleGSAPUpdate = useCallback(() => {
    animationValue.current = gsap.utils.clamp(
      startIndex,
      startIndex + numImages - 1,
      animationValue.current + 1
    );
    setIndex((prevIndex) => {
      const newIndex = Math.floor(animationValue.current) % canvasImagesLength;
      return newIndex === prevIndex ? prevIndex : newIndex;
    });
  }, [startIndex, numImages, canvasImagesLength]);

  const drawImage = useCallback(
    (img) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");

      if (!canvas || !ctx) return;

      const scale = window.devicePixelRatio;
      const { offsetWidth, offsetHeight } = canvas;
      const width = offsetWidth * scale;
      const height = offsetHeight * scale;

      // Optimize: Only resize if necessary
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      // Ensure canvas style matches the actual size
      canvas.style.width = offsetWidth + "px";
      canvas.style.height = offsetHeight + "px";


      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      ctx.clearRect(0, 0, offsetWidth, offsetHeight);
      ctx.drawImage(img, 0, 0, offsetWidth, offsetHeight);
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    const imageUrl = canvasImages[index % canvasImagesLength];

    // Check if image is already in cache
    if (imageCache.current[imageUrl]) {
      drawImage(imageCache.current[imageUrl]);
      return; // Exit early if image is cached
    }

    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      imageCache.current[imageUrl] = img;
      drawImage(img);
    };

    img.onerror = (error) => {
      console.error(`Failed to load image: ${imageUrl} at index ${index}`, error);
    };
  }, [index, canvasImagesLength, drawImage]);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.to(animationValue, {
          duration: duration,
          repeat: -1,
          ease: "linear",
          overwrite: true,
          modifiers: {
            current: gsap.utils.unitize(0),
          },
          onUpdate: handleGSAPUpdate,
        });

        gsap.from(canvasRef.current, {
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
        });
      }, canvasRef);

      return () => ctx.revert();
    },
    [startIndex, numImages, duration, handleGSAPUpdate]
  );

  return (
    <canvas
      data-scroll
      data-scroll-speed={randomScrollSpeed.current}
      ref={canvasRef}
      className="absolute"
      style={{
        width: `${size * 1.8}px`,
        height: `${size * 1.8}px`,
        top: `${top}%`,
        left: `${left}%`,
        zIndex: `${zIndex}`,
        imageRendering: 'pixelated', // Add pixelated rendering for crisp images
      }}
      id="canvas"
    ></canvas>
  );
}

export default Canvas;