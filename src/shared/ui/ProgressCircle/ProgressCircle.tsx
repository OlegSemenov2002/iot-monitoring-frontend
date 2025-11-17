import React, { useEffect, useState } from "react";

interface ProgressCircleProps {
    progress?: number; // 0..1
    size?: number;
    strokeWidth?: number;
    className?: string;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
    progress = 0.75,
    size = 40,
    strokeWidth = 6,
    className,
}) => {
    const [animatedProgress, setAnimatedProgress] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAnimatedProgress(progress);
        }, 50);
        return () => clearTimeout(timeout);
    }, [progress]);

    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference * (1 - animatedProgress);

    return (
        <svg
            width={size}
            height={size}
            className={className}
            style={{ transform: "rotate(-90deg)" }}
        >
            {/* Фоновый круг */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#032340"
                strokeWidth={strokeWidth}
                fill="none"
                vectorEffect="non-scaling-stroke"
                shapeRendering="geometricPrecision"
            />
            {/* Прогресс */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#2196f3"
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                shapeRendering="geometricPrecision"
                style={{ transition: "stroke-dashoffset 1s ease-out" }}
            />
        </svg>
    );
};

export default ProgressCircle;
