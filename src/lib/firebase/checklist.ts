import { 
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './config';
import { ChecklistItem, ChecklistCategory, ChecklistStatus } from '@/types/checklist';

const COLLECTION_CATEGORIES = 'checklistCategories';
const COLLECTION_ITEMS = 'checklistItems';

export class ChecklistService {
  // カテゴリの操作
  async getAllCategories(userId: string): Promise<ChecklistCategory[]> {
    const categoriesRef = collection(db, COLLECTION_CATEGORIES);
    const q = query(categoriesRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    })) as ChecklistCategory[];
  }

  async createCategory(userId: string, category: Omit<ChecklistCategory, 'id' | 'progress'>): Promise<string> {
    const categoriesRef = collection(db, COLLECTION_CATEGORIES);
    const newCategoryRef = doc(categoriesRef);
    
    await setDoc(newCategoryRef, {
      ...category,
      userId,
      progress: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return newCategoryRef.id;
  }

  async updateCategory(categoryId: string, data: Partial<ChecklistCategory>): Promise<void> {
    const categoryRef = doc(db, COLLECTION_CATEGORIES, categoryId);
    await updateDoc(categoryRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  }

  async deleteCategory(categoryId: string): Promise<void> {
    const categoryRef = doc(db, COLLECTION_CATEGORIES, categoryId);
    await deleteDoc(categoryRef);
  }

  // アイテムの操作
  async getItemsByCategory(categoryId: string): Promise<ChecklistItem[]> {
    const itemsRef = collection(db, COLLECTION_ITEMS);
    const q = query(itemsRef, where('categoryId', '==', categoryId));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    })) as ChecklistItem[];
  }

  async createItem(categoryId: string, item: Omit<ChecklistItem, 'id' | 'updatedAt' | 'status'>): Promise<string> {
    const itemsRef = collection(db, COLLECTION_ITEMS);
    const newItemRef = doc(itemsRef);
    
    await setDoc(newItemRef, {
      ...item,
      categoryId,
      status: 'not_started' as ChecklistStatus,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return newItemRef.id;
  }

  async updateItem(itemId: string, data: Partial<ChecklistItem>): Promise<void> {
    const itemRef = doc(db, COLLECTION_ITEMS, itemId);
    await updateDoc(itemRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  }

  async updateItemStatus(itemId: string, status: ChecklistStatus): Promise<void> {
    const itemRef = doc(db, COLLECTION_ITEMS, itemId);
    await updateDoc(itemRef, {
      status,
      updatedAt: serverTimestamp(),
      ...(status === 'completed' ? { completedAt: serverTimestamp() } : {})
    });
  }

  async deleteItem(itemId: string): Promise<void> {
    const itemRef = doc(db, COLLECTION_ITEMS, itemId);
    await deleteDoc(itemRef);
  }

  async addNote(itemId: string, note: string): Promise<void> {
    const itemRef = doc(db, COLLECTION_ITEMS, itemId);
    const itemDoc = await getDoc(itemRef);
    const currentNotes = itemDoc.data()?.notes || [];
    
    await updateDoc(itemRef, {
      notes: [...currentNotes, note],
      updatedAt: serverTimestamp()
    });
  }

  async addDocument(itemId: string, document: string): Promise<void> {
    const itemRef = doc(db, COLLECTION_ITEMS, itemId);
    const itemDoc = await getDoc(itemRef);
    const currentDocs = itemDoc.data()?.requiredDocuments || [];
    
    await updateDoc(itemRef, {
      requiredDocuments: [...currentDocs, document],
      updatedAt: serverTimestamp()
    });
  }
}
