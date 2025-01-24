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

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
    status, 
    size = 'medium',
    className
}) => {
    const config = statusConfig[status];
    
    return (
        <span
            data-testid="status-badge"
            className={clsx(
                'inline-flex items-center justify-center rounded-full font-medium',
                config.bgColor,
                config.textColor,
                sizeConfig[size],
                className
            )}
        >
            {config.label}
        </span>
    );
};

export default StatusBadge;
