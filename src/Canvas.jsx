import { useEffect, useRef, useState, useCallback } from "react";
import canvasImages from "./canvasimage";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Canvas({ details }) {
  const { startIndex, numImages, duration, size, top, left, zIndex } = details;

  const [index, setIndex] = useState(startIndex);
  const canvasRef = useRef(null);

  // Memoize the onUpdate function to prevent unnecessary re-renders
  const handleGSAPUpdate = useCallback(() => {
    setIndex(Math.round(index));
  }, [index]);

  useGSAP(
    () => {
      gsap.to({}, { // Animate a dummy object instead of the state directly
        value: startIndex + numImages - 1,
        duration: duration,
        repeat: -1,
        ease: "linear",
        onUpdate: handleGSAPUpdate,
        onUpdateParams: [index], // Pass the current index value
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
    const ctx = canvas?.getContext("2d"); // Optional chaining to prevent errors
    if (!canvas || !ctx) return; // Exit if canvas or context is not available

    const img = new Image();
    img.src = canvasImages[index % canvasImages.length]; // Use modulo to loop through images safely

    img.onload = () => {
      const { offsetWidth, offsetHeight } = canvas;
      canvas.width = offsetWidth * scale;
      canvas.height = offsetHeight * scale;
      canvas.style.width = offsetWidth + "px";
      canvas.style.height = offsetHeight + "px";

      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0, offsetWidth, offsetHeight);
    };

    img.onerror = () => {
      console.error(`Failed to load image at index ${index}`);
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