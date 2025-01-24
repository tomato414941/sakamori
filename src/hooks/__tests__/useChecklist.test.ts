import { renderHook, act } from '@testing-library/react';
import { useChecklist } from '../useChecklist';
import { ChecklistService } from '@/lib/firebase/checklist';

// ChecklistServiceのモック
jest.mock('@/lib/firebase/checklist');

describe('useChecklist', () => {
    const mockUserId = 'test-user-id';
    const mockCategories = [
        {
            id: '1',
            name: 'テストカテゴリー',
            items: [],
            progress: 0,
        }
    ];

    beforeEach(() => {
        // モックのリセット
        jest.clearAllMocks();
        
        // ChecklistServiceのメソッドをモック
        (ChecklistService as jest.Mock).mockImplementation(() => ({
            getAllCategories: jest.fn().mockResolvedValue(mockCategories),
            getItemsByCategory: jest.fn().mockResolvedValue([]),
            createCategory: jest.fn().mockResolvedValue('new-category-id'),
            createItem: jest.fn().mockResolvedValue('new-item-id'),
            updateItemStatus: jest.fn().mockResolvedValue(undefined),
            addNote: jest.fn().mockResolvedValue(undefined),
            addDocument: jest.fn().mockResolvedValue(undefined),
        }));
    });

    it('初期状態でローディング中になる', () => {
        const { result } = renderHook(() => useChecklist(mockUserId));
        
        expect(result.current.loading).toBe(true);
        expect(result.current.error).toBeNull();
        expect(result.current.categories).toEqual([]);
    });

    it('カテゴリーを正常に取得する', async () => {
        const { result } = renderHook(() => useChecklist(mockUserId));
        
        // 非同期処理の完了を待つ
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });
        
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
        expect(result.current.categories).toEqual(mockCategories);
    });

    it('カテゴリー取得でエラーが発生した場合', async () => {
        const mockError = new Error('データの取得に失敗しました');
        (ChecklistService as jest.Mock).mockImplementation(() => ({
            getAllCategories: jest.fn().mockRejectedValue(mockError),
            getItemsByCategory: jest.fn().mockResolvedValue([]),
        }));

        const { result } = renderHook(() => useChecklist(mockUserId));
        
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });
        
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeTruthy();
        expect(result.current.error?.message).toBe(mockError.message);
    });

    it('新しいカテゴリーを追加する', async () => {
        const { result } = renderHook(() => useChecklist(mockUserId));
        
        await act(async () => {
            await result.current.addCategory('新規カテゴリー', '説明');
        });
        
        const service = (ChecklistService as jest.Mock).mock.results[0].value;
        expect(service.createCategory).toHaveBeenCalledWith(mockUserId, {
            name: '新規カテゴリー',
            description: '説明',
            items: []
        });
    });

    it('アイテムのステータスを更新する', async () => {
        const { result } = renderHook(() => useChecklist(mockUserId));
        
        await act(async () => {
            await result.current.updateItemStatus('item-id', 'completed');
        });
        
        const service = (ChecklistService as jest.Mock).mock.results[0].value;
        expect(service.updateItemStatus).toHaveBeenCalledWith('item-id', 'completed');
    });

    it('ノートを追加する', async () => {
        const { result } = renderHook(() => useChecklist(mockUserId));
        
        await act(async () => {
            await result.current.addNote('item-id', 'テストノート');
        });
        
        const service = (ChecklistService as jest.Mock).mock.results[0].value;
        expect(service.addNote).toHaveBeenCalledWith('item-id', 'テストノート');
    });

    it('書類を追加する', async () => {
        const { result } = renderHook(() => useChecklist(mockUserId));
        
        await act(async () => {
            await result.current.addDocument('item-id', 'test-document.pdf');
        });
        
        const service = (ChecklistService as jest.Mock).mock.results[0].value;
        expect(service.addDocument).toHaveBeenCalledWith('item-id', 'test-document.pdf');
    });
});
