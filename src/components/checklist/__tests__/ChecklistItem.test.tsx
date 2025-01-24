import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChecklistItem from '../ChecklistItem';
import { ChecklistItem as ChecklistItemType } from '../../../types/checklist';

describe('ChecklistItem', () => {
    const mockItem: ChecklistItemType = {
        id: '1',
        title: 'テストアイテム',
        description: 'テストの説明',
        status: 'not_started',
        category: 'test',
        updatedAt: new Date(),
    };

    const mockItemWithSubItems: ChecklistItemType = {
        ...mockItem,
        subItems: [
            {
                id: '1-1',
                title: 'サブアイテム1',
                status: 'completed',
                category: 'test',
                updatedAt: new Date(),
            },
            {
                id: '1-2',
                title: 'サブアイテム2',
                status: 'in_progress',
                category: 'test',
                updatedAt: new Date(),
            },
        ],
    };

    it('renders basic item information', () => {
        render(<ChecklistItem item={mockItem} />);
        
        expect(screen.getByText('テストアイテム')).toBeInTheDocument();
        expect(screen.getByText('テストの説明')).toBeInTheDocument();
        // StatusBadgeコンポーネントの存在を確認
        expect(screen.getByTestId('status-badge')).toBeInTheDocument();
    });

    it('calls onStatusChange when status button is clicked', () => {
        const onStatusChange = jest.fn();
        render(<ChecklistItem item={mockItem} onStatusChange={onStatusChange} />);
        
        // ステータス変更ボタンをクリック
        const inProgressButton = screen.getByRole('button', { name: '進行中' });
        fireEvent.click(inProgressButton);
        
        expect(onStatusChange).toHaveBeenCalledWith(mockItem.id, 'in_progress');
    });

    it('shows progress indicator for items with subitems', () => {
        render(<ChecklistItem item={mockItemWithSubItems} expanded={true} />);
        
        // サブアイテムの進捗が表示される（1/2 = 50%）
        expect(screen.getByText('50%')).toBeInTheDocument();
    });

    it('toggles subitems visibility when expand button is clicked', () => {
        const onExpandToggle = jest.fn();
        render(
            <ChecklistItem
                item={mockItemWithSubItems}
                expanded={false}
                onExpandToggle={onExpandToggle}
            />
        );
        
        const expandButton = screen.getByText('▶');
        fireEvent.click(expandButton);
        
        expect(onExpandToggle).toHaveBeenCalledWith(mockItemWithSubItems.id);
    });

    it('shows documents when available', () => {
        const itemWithDocs = {
            ...mockItem,
            requiredDocuments: ['書類1', '書類2'],
        };
        
        render(<ChecklistItem item={itemWithDocs} />);
        
        expect(screen.getByText('必要書類:')).toBeInTheDocument();
        expect(screen.getByText('書類1')).toBeInTheDocument();
        expect(screen.getByText('書類2')).toBeInTheDocument();
    });

    it('shows notes when available', () => {
        const itemWithNotes = {
            ...mockItem,
            notes: ['ノート1', 'ノート2'],
        };
        
        render(<ChecklistItem item={itemWithNotes} />);
        
        expect(screen.getByText('ノート:')).toBeInTheDocument();
        expect(screen.getByText('ノート1')).toBeInTheDocument();
        expect(screen.getByText('ノート2')).toBeInTheDocument();
    });

    it('applies depth-based indentation', () => {
        const { container } = render(<ChecklistItem item={mockItem} depth={2} />);
        
        const itemContainer = container.firstChild as HTMLElement;
        expect(itemContainer.className).toContain('ml-4');
    });
});
