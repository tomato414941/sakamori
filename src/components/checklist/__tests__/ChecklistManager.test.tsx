import React from 'react';
import { render, screen } from '@testing-library/react';
import ChecklistManager from '../ChecklistManager';
import { ChecklistCategory } from '../../../types/checklist';

describe('ChecklistManager', () => {
    // モックデータ
    const mockCategories: ChecklistCategory[] = [
        {
            id: '1',
            name: 'カテゴリー1',
            description: 'テストカテゴリー1の説明',
            items: [],
        }
    ];

    it('renders without crashing', () => {
        render(<ChecklistManager categories={mockCategories} />);
    });

    it('shows loading spinner', () => {
        render(<ChecklistManager categories={[]} isLoading={true} />);
        expect(screen.getByRole('status')).toBeInTheDocument();
    });
});
