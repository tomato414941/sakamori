import React from 'react';
import { ProgressIndicatorProps } from '../../types/checklist';
import clsx from 'clsx';

const sizeConfig = {
    small: {
        bar: 'h-1.5',
        circle: 'w-16 h-16',
        text: 'text-xs',
    },
    medium: {
        bar: 'h-2',
        circle: 'w-20 h-20',
        text: 'text-sm',
    },
    large: {
        bar: 'h-3',
        circle: 'w-24 h-24',
        text: 'text-base',
    },
};

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
    completed,
    total,
    type = 'bar',
    size = 'medium',
    showPercentage = true,
    className,
}) => {
    const safeTotal = Math.max(total, 1); // 0除算を防ぐ
    const safeCompleted = Math.min(Math.max(completed, 0), safeTotal); // 0以上total以下に制限
    const percentage = Math.round((safeCompleted / safeTotal) * 100);
    const config = sizeConfig[size];

    if (type === 'circle') {
        const radius = 36;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percentage / 100) * circumference;

        return (
            <div className={clsx('relative inline-flex items-center justify-center', config.circle, className)}>
                <svg className="transform -rotate-90 w-full h-full">
                    {/* Background circle */}
                    <circle
                        className="text-gray-200"
                        strokeWidth="4"
                        stroke="currentColor"
                        fill="transparent"
                        r={radius}
                        cx="50%"
                        cy="50%"
                    />
                    {/* Progress circle */}
                    <circle
                        className="text-blue-600 transition-all duration-300"
                        strokeWidth="4"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r={radius}
                        cx="50%"
                        cy="50%"
                    />
                </svg>
                {showPercentage && (
                    <div className={clsx('absolute font-medium', config.text)}>
                        {percentage}%
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className={clsx('w-full bg-gray-200 rounded-full overflow-hidden', config.bar, className)}>
            <div
                className="bg-blue-600 transition-all duration-300 rounded-full h-full flex items-center justify-end"
                style={{ width: `${percentage}%` }}
            >
                {showPercentage && percentage >= 10 && (
                    <span className={clsx('text-white px-2', config.text)}>
                        {percentage}%
                    </span>
                )}
            </div>
            {showPercentage && percentage < 10 && (
                <div className={clsx('text-gray-600 px-2 -mt-[1.5em]', config.text)}>
                    {percentage}%
                </div>
            )}
        </div>
    );
};

export default ProgressIndicator;
