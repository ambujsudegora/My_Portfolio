import React from "react";

export default function CharZoomer({ text, className = "" }) {
  if (typeof text !== "string") return null;

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {text.split("").map((char, index) => {
        // Render spaces as inline space rather than inline-block to preserve natural wrapping
        if (char === " ") {
          return (
            <span key={index} className="inline cursor-default">
              &nbsp;
            </span>
          );
        }
        return (
          <span
            key={index}
            className="char-zoom-letter cursor-default"
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}
