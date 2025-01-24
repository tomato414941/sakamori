import React from 'react';
import { render, screen } from '@testing-library/react';
import StatusBadge from '../StatusBadge';
import { ChecklistStatus } from '../../../types/checklist';

describe('StatusBadge', () => {
    const statuses: ChecklistStatus[] = ['not_started', 'in_progress', 'completed', 'needs_review'];
    const sizes = ['small', 'medium', 'large'] as const;

    test.each(statuses)('renders correct label for %s status', (status) => {
        render(<StatusBadge status={status} />);
        
        const expectedLabels = {
            not_started: '未着手',
            in_progress: '進行中',
            completed: '完了',
            needs_review: '要確認'
        };
        
        expect(screen.getByText(expectedLabels[status])).toBeInTheDocument();
    });

    test.each(sizes)('applies correct size class for %s size', (size) => {
        const { container } = render(<StatusBadge status="completed" size={size} />);
        const badge = container.firstChild as HTMLElement;
        
        const sizeClasses = {
            small: 'text-xs',
            medium: 'text-sm',
            large: 'text-base'
        };
        
        expect(badge.className).toContain(sizeClasses[size]);
    });

    test('applies custom className when provided', () => {
        const customClass = 'custom-test-class';
        const { container } = render(
            <StatusBadge status="completed" className={customClass} />
        );
        const badge = container.firstChild as HTMLElement;
        
        expect(badge.className).toContain(customClass);
    });
});
