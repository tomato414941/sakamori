# チェックリストコンポーネントの設計

## 1. コンポーネント構造

```typescript
// src/types/checklist.ts
export interface ChecklistItem {
    id: string;
    title: string;
    description?: string;
    status: 'not_started' | 'in_progress' | 'completed' | 'needs_review';
    category: string;
    subCategory?: string;
    requiredDocuments?: string[];
    notes?: string;
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
```

## 2. メインコンポーネント

### 2.1 ChecklistDashboard
```typescript
// src/components/checklist/ChecklistDashboard.tsx
interface ChecklistDashboardProps {
    categories: ChecklistCategory[];
    onStatusUpdate: (itemId: string, status: string) => void;
    onNoteAdd: (itemId: string, note: string) => void;
}
```

主な機能：
- カテゴリー別の進捗表示
- 全体の進捗状況の可視化
- カテゴリーの折りたたみ/展開

### 2.2 ChecklistCategory
```typescript
// src/components/checklist/ChecklistCategory.tsx
interface ChecklistCategoryProps {
    category: ChecklistCategory;
    onItemUpdate: (itemId: string, updates: Partial<ChecklistItem>) => void;
}
```

主な機能：
- カテゴリー内のアイテム一覧表示
- カテゴリーの進捗表示
- 展開/折りたたみ制御

### 2.3 ChecklistItem
```typescript
// src/components/checklist/ChecklistItem.tsx
interface ChecklistItemProps {
    item: ChecklistItem;
    onUpdate: (updates: Partial<ChecklistItem>) => void;
    onNoteAdd: (note: string) => void;
}
```

主な機能：
- ステータス変更UI
- メモ追加機能
- 関連書類へのリンク
- 詳細表示/編集

## 3. 補助コンポーネント

### 3.1 ProgressIndicator
```typescript
interface ProgressIndicatorProps {
    completed: number;
    total: number;
    type?: 'circle' | 'bar';
}
```

### 3.2 StatusBadge
```typescript
interface StatusBadgeProps {
    status: ChecklistItem['status'];
    size?: 'small' | 'medium' | 'large';
}
```

### 3.3 NotesPanel
```typescript
interface NotesPanelProps {
    notes: string[];
    onNoteAdd: (note: string) => void;
    onNoteDelete: (index: number) => void;
}
```

## 4. レイアウト

### 4.1 デスクトップ表示
```
+------------------------+
|     全体の進捗        |
+------------------------+
| カテゴリー1           |
| ├─ アイテム1         |
| ├─ アイテム2         |
| └─ アイテム3         |
+------------------------+
| カテゴリー2           |
| ├─ アイテム1         |
| └─ アイテム2         |
+------------------------+
```

### 4.2 モバイル表示
```
+------------------------+
|     全体の進捗        |
+------------------------+
| カテゴリー1     [▼]   |
+------------------------+
| カテゴリー2     [▼]   |
+------------------------+
```

## 5. インタラクション

### 5.1 ステータス更新
- クリックでステータス変更
- ステータス変更時のアニメーション
- 変更履歴の記録

### 5.2 メモ機能
- クイックメモ入力
- メモの表示/非表示
- メモの編集/削除

### 5.3 フィルタリング
- ステータスによるフィルタリング
- カテゴリーによるフィルタリング
- 検索機能

## 6. データ管理

### 6.1 Firestore データ構造
```typescript
interface ChecklistData {
    userId: string;
    applicationId: string;
    categories: {
        [categoryId: string]: {
            name: string;
            description?: string;
            items: {
                [itemId: string]: ChecklistItem;
            };
        };
    };
    progress: {
        total: number;
        completed: number;
        lastUpdated: Date;
    };
}
```

### 6.2 更新ロジック
- リアルタイム更新
- オフライン対応
- 変更の競合解決

## 7. アクセシビリティ

- キーボード操作対応
- スクリーンリーダー対応
- カラーコントラストの確保
- フォーカス管理

## 8. エラー処理

- データ保存失敗時の再試行
- オフライン時の一時保存
- 同期エラーの表示
- ユーザーへのフィードバック
