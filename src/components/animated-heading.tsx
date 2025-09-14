"use client";

import { useEffect, useState, useRef } from "react";

export const AnimatedHeading = ({ text }: { text: React.ReactNode }) => {
  const [showLine, setShowLine] = useState(false);
  const [wordWidth, setWordWidth] = useState<number>(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ref = headingRef.current;
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowLine(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "0px 0px -30% 0px", 
      }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (wordRef.current) {
      setWordWidth(wordRef.current.offsetWidth);
    }
  }, [text]);

  const str = typeof text === "string" ? text : "";
  const words = str.split(" ");
  const lastWord = words.pop();
  const firstWords = words.join(" ");

  return (
    <div className="relative inline-block">
      <h2 className="text-3xl font-semibold" ref={headingRef}>
        {firstWords && <span>{firstWords} </span>}
        <span className="relative inline-block" ref={wordRef}>
          {lastWord}
          {showLine && wordWidth > 0 && (
            <svg
              width={wordWidth * 1.05}
              height="24"
              viewBox={`0 0 ${wordWidth * 1.1} 24`}
              className="absolute left-1/2 -bottom-2 -translate-x-1/2"
              style={{ transform: "rotate(-3deg)" }}
            >
              <path
                d={`M0 22 Q${(wordWidth * 1.1) / 2} 12 ${wordWidth * 1.1} 22`}
                stroke="var(--accent)"
                strokeWidth="2.43"
                fill="none"
              >
                <animate
                  attributeName="stroke-dasharray"
                  from={`0,${wordWidth * 1.1}`}
                  to={`${wordWidth * 1.1},0`}
                  dur="0.5s"
                  fill="freeze"
                />
              </path>
            </svg>
          )}
        </span>
      </h2>
    </div>
  );
}
