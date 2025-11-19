import React, { useEffect, useState } from "react";

interface ProgressCircleProps {
    progress?: number;
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
            {/* фоновый круг */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="var(--card-border)"
                strokeWidth={strokeWidth}
                fill="none"
                vectorEffect="non-scaling-stroke"
                shapeRendering="geometricPrecision"
            />
            {/* прогресс */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="var(--primary-color)"
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
