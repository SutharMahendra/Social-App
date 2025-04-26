import React, { useEffect, useState, useRef } from "react";
import "./Text.css";

const texts = ["Let", "Start", "Your", "Social", ":)"];

const Text = () => {
    const [textIndex, setTextIndex] = useState(texts.length - 1);
    const morphTime = 1; // Slow down morphing (increased from 1000ms to 3000ms)
    const cooldownTime = .25; // Slow down cooldown (increased from 250ms to 1000ms)

    const morphRef = useRef(0);
    const cooldownRef = useRef(cooldownTime);

    const text1Ref = useRef(null);
    const text2Ref = useRef(null);

    useEffect(() => {
        const animate = () => {
            requestAnimationFrame(animate);
            let dt = morphTime / 120; // Adjusted for smooth slow transition

            if (cooldownRef.current > 0) {
                cooldownRef.current -= dt;
                if (cooldownRef.current <= 0) {
                    setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
                }
            } else {
                morphRef.current += dt;
                if (morphRef.current >= morphTime) {
                    cooldownRef.current = cooldownTime;
                    morphRef.current = morphTime;
                }
            }

            applyMorph();
        };

        const applyMorph = () => {
            let fraction = morphRef.current / morphTime;
            if (fraction > 1) fraction = 1;

            const blurValue = Math.min(8 / fraction - 8, 100);
            const opacityValue = `${Math.pow(fraction, 0.4) * 100}%`;

            if (text2Ref.current && text1Ref.current) {
                text2Ref.current.style.filter = `blur(${blurValue}px)`;
                text2Ref.current.style.opacity = opacityValue;

                let inverseFraction = 1 - fraction;
                text1Ref.current.style.filter = `blur(${Math.min(8 / inverseFraction - 8, 100)}px)`;
                text1Ref.current.style.opacity = `${Math.pow(inverseFraction, 0.4) * 100}%`;

                text1Ref.current.textContent = texts[textIndex % texts.length];
                text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
            }
        };

        animate();
    }, [textIndex]);

    return (
        <div id="container">
            <span id="text1" ref={text1Ref}></span>
            <span id="text2" ref={text2Ref}></span>
            <svg id="filters">
                <defs>
                    <filter id="threshold">
                        <feColorMatrix
                            in="SourceGraphic"
                            type="matrix"
                            values="1 0 0 0 0
                                    0 1 0 0 0
                                    0 0 1 0 0
                                    0 0 0 255 -140"
                        />
                    </filter>
                </defs>
            </svg>
        </div>
    );
};

export default Text;
