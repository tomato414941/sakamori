export type ChecklistStatus = 'not_started' | 'in_progress' | 'completed' | 'needs_review';

export interface ChecklistItem {
    id: string;
    title: string;
    description?: string;
    status: ChecklistStatus;
    category: string;
    subCategory?: string;
    requiredDocuments?: string[];
    notes?: string[];
    updatedAt: Date;
    completedAt?: Date;
}

export interface ChecklistCategory {
    id: string;
    name: string;
    description?: string;
    items: ChecklistItem[];
    progress: number;
}

export interface StatusBadgeProps {
    status: ChecklistStatus;
    size?: 'small' | 'medium' | 'large';
    className?: string;
}
