import React from 'react';
import { ChecklistStatus, StatusBadgeProps } from '../../types/checklist';
import clsx from 'clsx';

const statusConfig: Record<ChecklistStatus, { label: string; bgColor: string; textColor: string }> = {
    not_started: {
        label: '未着手',
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-600'
    },
    in_progress: {
        label: '進行中',
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-600'
    },
    completed: {
        label: '完了',
        bgColor: 'bg-green-100',
        textColor: 'text-green-600'
    },
    needs_review: {
        label: '要確認',
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-600'
    }
};

const sizeConfig = {
    small: 'text-xs px-2 py-0.5',
    medium: 'text-sm px-3 py-1',
    large: 'text-base px-4 py-1.5'
};

const getNextStatus = (currentStatus: ChecklistStatus): ChecklistStatus => {
    const statusOrder: ChecklistStatus[] = ['not_started', 'in_progress', 'completed', 'needs_review'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    return statusOrder[(currentIndex + 1) % statusOrder.length];
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
    status, 
    size = 'medium',
    className,
    onClick,
    'aria-label': ariaLabel,
    ...props
}) => {
    const config = statusConfig[status];
    
    const handleClick = () => {
        if (onClick) {
            const nextStatus = getNextStatus(status);
            onClick(nextStatus);
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            aria-label={ariaLabel || status}
            data-testid="status-badge"
            className={clsx(
                'inline-flex items-center justify-center rounded-full font-medium',
                config.bgColor,
                config.textColor,
                sizeConfig[size],
                className,
                onClick && 'cursor-pointer hover:opacity-80'
            )}
            {...props}
        >
            {config.label}
        </button>
    );
};

export default StatusBadge;
