import { useState, useEffect, useCallback } from 'react';
import { ChecklistService } from '@/lib/firebase/checklist';
import { ChecklistCategory, ChecklistItem, ChecklistStatus } from '@/types/checklist';

const checklistService = new ChecklistService();

export function useChecklist(userId: string) {
  const [categories, setCategories] = useState<ChecklistCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // カテゴリとアイテムの取得
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedCategories = await checklistService.getAllCategories(userId);
      
      // 各カテゴリのアイテムを取得
      const categoriesWithItems = await Promise.all(
        fetchedCategories.map(async (category) => {
          const items = await checklistService.getItemsByCategory(category.id);
          return { ...category, items };
        })
      );

      setCategories(categoriesWithItems);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
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
      await checklistService.createCategory(userId, {
        name,
        description,
        items: []
      });
      await fetchCategories();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add category'));
      throw err;
    }
  };

  // アイテムの操作
  const addItem = async (categoryId: string, item: Omit<ChecklistItem, 'id' | 'updatedAt' | 'status'>) => {
    try {
      await checklistService.createItem(categoryId, item);
      await fetchCategories();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add item'));
      throw err;
    }
  };

  const updateItemStatus = async (itemId: string, status: ChecklistStatus) => {
    try {
      await checklistService.updateItemStatus(itemId, status);
      await fetchCategories();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update item status'));
      throw err;
    }
  };

  const addNote = async (itemId: string, note: string) => {
    try {
      await checklistService.addNote(itemId, note);
      await fetchCategories();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add note'));
      throw err;
    }
  };

  const addDocument = async (itemId: string, document: string) => {
    try {
      await checklistService.addDocument(itemId, document);
      await fetchCategories();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add document'));
      throw err;
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
