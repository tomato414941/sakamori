import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChecklistManager from '../ChecklistManager';
import { ChecklistCategory } from '../../../types/checklist';

describe('ChecklistManager', () => {
    const mockCategories: ChecklistCategory[] = [
        {
            id: '1',
            name: 'カテゴリー1',
            description: 'テストカテゴリー1の説明',
            items: [
                {
                    id: '1-1',
                    title: 'アイテム1',
                    description: 'テストアイテム1の説明',
                    status: 'not_started',
                    category: 'カテゴリー1',
                    updatedAt: new Date(),
                },
                {
                    id: '1-2',
                    title: 'アイテム2',
                    status: 'completed',
                    category: 'カテゴリー1',
                    updatedAt: new Date(),
                },
            ],
            progress: 50,
        },
        {
            id: '2',
            name: 'カテゴリー2',
            items: [],
            progress: 0,
        },
    ];

    beforeEach(() => {
        // プロンプトをモック化
        window.prompt = jest.fn();
    });

    it('renders categories and items correctly', () => {
        const { container } = render(<ChecklistManager categories={mockCategories} />);
        
        // サイドバー内のカテゴリーを確認
        const sidebar = container.querySelector('.bg-gray-50');
        expect(within(sidebar!).getByText('カテゴリー1')).toBeInTheDocument();
        expect(within(sidebar!).getByText('カテゴリー2')).toBeInTheDocument();
        
        // メインコンテンツ内の要素を確認
        const mainContent = container.querySelector('.flex-1');
        expect(within(mainContent!).getByText('テストカテゴリー1の説明')).toBeInTheDocument();
        expect(within(mainContent!).getByText('アイテム1')).toBeInTheDocument();
        expect(within(mainContent!).getByText('アイテム2')).toBeInTheDocument();
    });

    it('switches between categories when clicked', async () => {
        const { container } = render(<ChecklistManager categories={mockCategories} />);
        
        // カテゴリー2をクリック
        const sidebar = container.querySelector('.bg-gray-50');
        const category2 = within(sidebar!).getByText('カテゴリー2');
        await userEvent.click(category2);
        
        // カテゴリー1のアイテムが表示されなくなることを確認
        const mainContent = container.querySelector('.flex-1');
        expect(within(mainContent!).queryByText('アイテム1')).not.toBeInTheDocument();
    });

    it('calls onStatusChange when item status is changed', async () => {
        const onStatusChange = jest.fn();
        const { container } = render(
            <ChecklistManager
                categories={mockCategories}
                onStatusChange={onStatusChange}
            />
        );
        
        // 進行中ステータスボタンをクリック
        const mainContent = container.querySelector('.flex-1');
        const inProgressButton = within(mainContent!).getAllByRole('button', {
            name: '進行中',
        })[0];
        await userEvent.click(inProgressButton);
        
        expect(onStatusChange).toHaveBeenCalledWith('1-1', 'in_progress');
    });

    it('shows correct progress for categories', () => {
        const { container } = render(<ChecklistManager categories={mockCategories} />);
        
        // カテゴリー1の進捗が50%であることを確認
        const sidebar = container.querySelector('.bg-gray-50');
        const progressIndicators = within(sidebar!).getAllByText('50%');
        expect(progressIndicators.length).toBe(1);
    });

    it('adds new category when add button is clicked', async () => {
        const onCategoryAdd = jest.fn();
        (window.prompt as jest.Mock)
            .mockReturnValueOnce('新規カテゴリー')  // カテゴリー名
            .mockReturnValueOnce('カテゴリーの説明');  // 説明

        const { container } = render(
            <ChecklistManager
                categories={mockCategories}
                onCategoryAdd={onCategoryAdd}
            />
        );
        
        // カテゴリー追加ボタンをクリック
        const sidebar = container.querySelector('.bg-gray-50');
        const addButton = within(sidebar!).getByText('＋ 追加');
        await userEvent.click(addButton);
        
        expect(onCategoryAdd).toHaveBeenCalledWith(
            '新規カテゴリー',
            'カテゴリーの説明'
        );
    });

    it('adds new item when add button is clicked', async () => {
        const onItemAdd = jest.fn();
        (window.prompt as jest.Mock)
            .mockReturnValueOnce('新規アイテム')  // タイトル
            .mockReturnValueOnce('アイテムの説明');  // 説明

        const { container } = render(
            <ChecklistManager
                categories={mockCategories}
                onItemAdd={onItemAdd}
            />
        );
        
        // 新規アイテムボタンをクリック
        const mainContent = container.querySelector('.flex-1');
        const addButton = within(mainContent!).getByText('＋ 新規アイテム');
        await userEvent.click(addButton);
        
        expect(onItemAdd).toHaveBeenCalledWith('1', {
            title: '新規アイテム',
            description: 'アイテムの説明',
            status: 'not_started',
            category: 'カテゴリー1',
        });
    });
});
