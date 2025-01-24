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
    subItems?: ChecklistItem[];
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

export interface ProgressIndicatorProps {
    completed: number;
    total: number;
    type?: 'circle' | 'bar';
    size?: 'small' | 'medium' | 'large';
    showPercentage?: boolean;
    className?: string;
}

export interface ChecklistItemProps {
    item: ChecklistItem;
    depth?: number;
    onStatusChange?: (id: string, status: ChecklistStatus) => void;
    onNoteAdd?: (id: string, note: string) => void;
    onDocumentAdd?: (id: string, document: string) => void;
    className?: string;
    expanded?: boolean;
    onExpandToggle?: (id: string) => void;
}

export interface ChecklistManagerProps {
    categories: ChecklistCategory[];
    onStatusChange?: (itemId: string, status: ChecklistStatus) => void;
    onNoteAdd?: (itemId: string, note: string) => void;
    onDocumentAdd?: (itemId: string, document: string) => void;
    onCategoryAdd?: (name: string, description?: string) => void;
    onItemAdd?: (categoryId: string, item: Omit<ChecklistItem, 'id' | 'updatedAt'>) => void;
    className?: string;
    isLoading?: boolean;
    error?: Error | null;
    onRetry?: () => void;
}

export interface ChecklistState {
    categories: ChecklistCategory[];
    expandedItems: Set<string>;
    selectedCategory: string | null;
}
