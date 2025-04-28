import { useEffect, useRef, useState, useCallback } from "react";
import canvasImages from "./canvasimage";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Canvas({ details }) {
  const { startIndex, numImages, duration, size, top, left, zIndex } = details;

  const [index, setIndex] = useState(startIndex);
  const canvasRef = useRef(null);
  const animationValue = useRef(startIndex);
  const imageCache = useRef({}); // Cache images

  const handleGSAPUpdate = useCallback(() => {
    animationValue.current = gsap.utils.clamp(startIndex, startIndex + numImages - 1, animationValue.current + 1);
    setIndex(Math.floor(animationValue.current) % canvasImages.length);
  }, [startIndex, numImages]);

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

  useEffect(() => {
    const scale = window.devicePixelRatio;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    const imageUrl = canvasImages[index % canvasImages.length];

    // Check if the image is already cached
    if (imageCache.current[imageUrl]) {
      drawImage(imageCache.current[imageUrl]);
    } else {
      const img = new Image();
      img.src = imageUrl;

      img.onload = () => {
        imageCache.current[imageUrl] = img; // Cache the loaded image
        drawImage(img);
      };

      img.onerror = () => {
        console.error(`Failed to load image: ${imageUrl} at index ${index}`);
      };
    }

    function drawImage(img) {
      const { offsetWidth, offsetHeight } = canvas;
      const width = offsetWidth * scale;
      const height = offsetHeight * scale;

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = offsetWidth + "px";
        canvas.style.height = offsetHeight + "px";
      }

      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      ctx.clearRect(0, 0, offsetWidth, offsetHeight); // Clear with offset dimensions
      ctx.drawImage(img, 0, 0, offsetWidth, offsetHeight);
    }

    return () => {
      // No need to nullify onload/onerror as image is cached and reused.
    };
  }, [index]);

  const randomScrollSpeed = useRef(Math.random().toFixed(1));

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
      }}
      id="canvas"
    ></canvas>
  );
}

export default Canvas;