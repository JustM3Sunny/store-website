import { useEffect, useRef, useState, useCallback } from "react";
import canvasImages from "./canvasimage";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Canvas({ details }) {
  const { startIndex, numImages, duration, size, top, left, zIndex } = details;

  const [index, setIndex] = useState(startIndex);
  const canvasRef = useRef(null);
  const animationValue = useRef(startIndex); // Ref to hold the animated value

  // Memoize the onUpdate function to prevent unnecessary re-renders
  const handleGSAPUpdate = useCallback(() => {
    animationValue.current = gsap.utils.clamp(startIndex, startIndex + numImages - 1, animationValue.current + 1);
    setIndex(Math.floor(animationValue.current) % canvasImages.length); // Ensure index stays within bounds
  }, [startIndex, numImages]);

  useGSAP(
    () => {
      gsap.to(animationValue, { // Animate the ref's current property
        duration: duration,
        repeat: -1,
        ease: "linear",
        overwrite: true, // Prevents conflicts with other GSAP animations
        modifiers: {
          current: gsap.utils.unitize(0), // Ensure value stays a number
        },
        onUpdate: handleGSAPUpdate,
      });

      gsap.from(canvasRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
      });
    },
    [startIndex, numImages, duration, handleGSAPUpdate] // Dependencies for useGSAP
  );

  useEffect(() => {
    const scale = window.devicePixelRatio;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const img = new Image();
    img.src = canvasImages[index % canvasImages.length];

    img.onload = () => {
      const { offsetWidth, offsetHeight } = canvas;
      const width = offsetWidth * scale;
      const height = offsetHeight * scale;

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = offsetWidth + "px";
        canvas.style.height = offsetHeight + "px";
      }

      ctx.scale(scale, scale);
      ctx.clearRect(0, 0, width, height); // Clear the canvas before drawing
      ctx.drawImage(img, 0, 0, offsetWidth, offsetHeight);
    };

    img.onerror = () => {
      console.error(`Failed to load image at index ${index}`);
    };

    return () => {
      img.onload = null; // Clean up event listeners
      img.onerror = null;
    };
  }, [index]);

  return (
    <canvas
      data-scroll
      data-scroll-speed={Math.random().toFixed(1)}
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