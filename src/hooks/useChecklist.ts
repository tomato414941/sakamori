import { useState, useEffect, useCallback } from 'react';
import { ChecklistService } from '@/lib/firebase/checklist';
import { ChecklistCategory, ChecklistItem, ChecklistStatus } from '@/types/checklist';

class ChecklistError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'ChecklistError';
  }
}

const checklistService = new ChecklistService();

export function useChecklist(userId: string) {
  const [categories, setCategories] = useState<ChecklistCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // エラーハンドリングのヘルパー関数
  const handleError = (err: unknown, customMessage: string) => {
    console.error(err);
    if (err instanceof Error) {
      setError(new ChecklistError(err.message));
    } else {
      setError(new ChecklistError(customMessage));
    }
    throw err;
  };

  // カテゴリとアイテムの取得
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedCategories = await checklistService.getAllCategories(userId);
      
      // 各カテゴリのアイテムを取得
      const categoriesWithItems = await Promise.all(
        fetchedCategories.map(async (category) => {
          const items = await checklistService.getItemsByCategory(category.id);
          return { ...category, items };
        })
      );

      setCategories(categoriesWithItems);
    } catch (err) {
      handleError(err, 'チェックリストの取得中にエラーが発生しました');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // 初期データの取得
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // カテゴリの操作
  const addCategory = async (name: string, description?: string) => {
    try {
      setError(null);
      await checklistService.createCategory(userId, {
        name,
        description,
        items: []
      });
      await fetchCategories();
    } catch (err) {
      handleError(err, 'カテゴリの追加中にエラーが発生しました');
    }
  };

  // アイテムの操作
  const addItem = async (categoryId: string, item: Omit<ChecklistItem, 'id' | 'updatedAt' | 'status'>) => {
    try {
      setError(null);
      await checklistService.createItem(categoryId, item);
      await fetchCategories();
    } catch (err) {
      handleError(err, 'アイテムの追加中にエラーが発生しました');
    }
  };

  const updateItemStatus = async (itemId: string, status: ChecklistStatus) => {
    try {
      setError(null);
      await checklistService.updateItemStatus(itemId, status);
      await fetchCategories();
    } catch (err) {
      handleError(err, 'ステータスの更新中にエラーが発生しました');
    }
  };

  const addNote = async (itemId: string, note: string) => {
    try {
      setError(null);
      await checklistService.addNote(itemId, note);
      await fetchCategories();
    } catch (err) {
      handleError(err, 'ノートの追加中にエラーが発生しました');
    }
  };

  const addDocument = async (itemId: string, document: string) => {
    try {
      setError(null);
      await checklistService.addDocument(itemId, document);
      await fetchCategories();
    } catch (err) {
      handleError(err, '書類の追加中にエラーが発生しました');
    }
  };

  return {
    categories,
    loading,
    error,
    addCategory,
    addItem,
    updateItemStatus,
    addNote,
    addDocument,
    refreshData: fetchCategories
  };
}
