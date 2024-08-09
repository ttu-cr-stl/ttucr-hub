"use client";

import React, { useState, useRef, useEffect } from "react";

interface ExpandableDescriptionProps {
  description: string;
}

const ExpandableDescription: React.FC<ExpandableDescriptionProps> = ({
  description,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const hiddenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measureText = () => {
      if (contentRef.current && hiddenRef.current) {
        const lineHeight = parseInt(window.getComputedStyle(contentRef.current).lineHeight);
        const maxHeight = lineHeight * 4;
        const actualHeight = hiddenRef.current.clientHeight;
        setShowToggle(actualHeight > maxHeight);
      }
    };

    measureText();
    window.addEventListener('resize', measureText);

    return () => window.removeEventListener('resize', measureText);

  }, [description]);

  return (
    <div className="relative">
      <div
        ref={contentRef}
        className={`leading-snug text-gray-500 ${
          isExpanded ? "" : "line-clamp-4"
        }`}
      >
        {description}
      </div>
      <div 
        ref={hiddenRef} 
        className="absolute top-0 left-0 invisible w-full leading-snug text-gray-500"
        aria-hidden="true"
      >
        {description}
      </div>
      {showToggle && (
        <span
          className="text-sm underline cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show less" : "Show more"}
        </span>
      )}
    </div>
  );
};

export default ExpandableDescription;