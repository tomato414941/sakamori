import React, { useState, useCallback } from 'react';
import {
    ChecklistManagerProps,
    ChecklistState,
    ChecklistStatus,
    ChecklistCategory,
} from '../../types/checklist';
import ChecklistItem from './ChecklistItem';
import ProgressIndicator from './ProgressIndicator';
import clsx from 'clsx';

export const ChecklistManager: React.FC<ChecklistManagerProps> = ({
    categories,
    onStatusChange,
    onNoteAdd,
    onDocumentAdd,
    onCategoryAdd,
    onItemAdd,
    className,
}) => {
    const [state, setState] = useState<ChecklistState>({
        categories,
        expandedItems: new Set<string>(),
        selectedCategory: categories.length > 0 ? categories[0].id : null,
    });

    // カテゴリー選択の処理
    const handleCategorySelect = useCallback((categoryId: string) => {
        setState(prev => ({
            ...prev,
            selectedCategory: categoryId,
        }));
    }, []);

    // アイテムの展開/折りたたみの処理
    const handleExpandToggle = useCallback((itemId: string) => {
        setState(prev => ({
            ...prev,
            expandedItems: new Set(
                prev.expandedItems.has(itemId)
                    ? Array.from(prev.expandedItems).filter(id => id !== itemId)
                    : [...prev.expandedItems, itemId]
            ),
        }));
    }, []);

    // 新しいカテゴリーの追加
    const handleCategoryAdd = () => {
        const name = prompt('カテゴリー名を入力してください:');
        if (name && onCategoryAdd) {
            const description = prompt('カテゴリーの説明を入力してください（任意）:');
            onCategoryAdd(name, description || undefined);
        }
    };

    // 新しいアイテムの追加
    const handleItemAdd = (categoryId: string) => {
        if (!onItemAdd) return;

        const title = prompt('タイトルを入力してください:');
        if (!title) return;

        const description = prompt('説明を入力してください（任意）:');
        const category = state.categories.find(c => c.id === categoryId);
        
        if (category) {
            onItemAdd(categoryId, {
                title,
                description: description || undefined,
                status: 'not_started',
                category: category.name,
            });
        }
    };

    // カテゴリーの進捗計算
    const calculateCategoryProgress = (category: ChecklistCategory) => {
        const total = category.items.length;
        if (total === 0) return 0;

        const completed = category.items.filter(
            item => item.status === 'completed'
        ).length;
        return Math.round((completed / total) * 100);
    };

    return (
        <div className={clsx('flex h-full', className)}>
            {/* サイドバー：カテゴリー一覧 */}
            <div className="w-64 bg-gray-50 p-4 border-r">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium">カテゴリー</h2>
                    <button
                        onClick={handleCategoryAdd}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        ＋ 追加
                    </button>
                </div>
                <div className="space-y-2">
                    {state.categories.map(category => (
                        <div
                            key={category.id}
                            className={clsx(
                                'p-3 rounded-lg cursor-pointer transition-colors',
                                state.selectedCategory === category.id
                                    ? 'bg-blue-100'
                                    : 'hover:bg-gray-100'
                            )}
                            onClick={() => handleCategorySelect(category.id)}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-medium">{category.name}</h3>
                                <span className="text-sm text-gray-500">
                                    {category.items.length}項目
                                </span>
                            </div>
                            <ProgressIndicator
                                completed={calculateCategoryProgress(category)}
                                total={100}
                                size="small"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* メインコンテンツ：選択されたカテゴリーのアイテム一覧 */}
            <div className="flex-1 p-4 overflow-auto">
                {state.selectedCategory && (
                    <>
                        {/* カテゴリーヘッダー */}
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h1 className="text-2xl font-bold">
                                    {
                                        state.categories.find(
                                            c => c.id === state.selectedCategory
                                        )?.name
                                    }
                                </h1>
                                <p className="text-gray-600">
                                    {
                                        state.categories.find(
                                            c => c.id === state.selectedCategory
                                        )?.description
                                    }
                                </p>
                            </div>
                            <button
                                onClick={() =>
                                    handleItemAdd(state.selectedCategory!)
                                }
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                ＋ 新規アイテム
                            </button>
                        </div>

                        {/* アイテム一覧 */}
                        <div className="space-y-4">
                            {state.categories
                                .find(c => c.id === state.selectedCategory)
                                ?.items.map(item => (
                                    <ChecklistItem
                                        key={item.id}
                                        item={item}
                                        onStatusChange={onStatusChange}
                                        onNoteAdd={onNoteAdd}
                                        onDocumentAdd={onDocumentAdd}
                                        expanded={state.expandedItems.has(item.id)}
                                        onExpandToggle={handleExpandToggle}
                                    />
                                ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ChecklistManager;
