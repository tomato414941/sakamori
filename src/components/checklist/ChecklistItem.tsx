import React from 'react';
import { ChecklistItemProps, ChecklistStatus } from '../../types/checklist';
import StatusBadge from './StatusBadge';
import ProgressIndicator from './ProgressIndicator';
import clsx from 'clsx';

export const ChecklistItem: React.FC<ChecklistItemProps> = ({
    item,
    depth = 0,
    onStatusChange,
    onNoteAdd,
    onDocumentAdd,
    className,
    expanded = false,
    onExpandToggle,
}) => {
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const hasDocuments = item.requiredDocuments && item.requiredDocuments.length > 0;
    const hasNotes = item.notes && item.notes.length > 0;

    // サブアイテムの進捗を計算
    const calculateProgress = () => {
        if (!hasSubItems) return null;
        
        const total = item.subItems!.length;
        const completed = item.subItems!.filter(
            subItem => subItem.status === 'completed'
        ).length;
        
        return { completed, total };
    };

    const progress = calculateProgress();

    const handleStatusChange = (newStatus: ChecklistStatus) => {
        onStatusChange?.(item.id, newStatus);
    };

    const handleExpandToggle = () => {
        onExpandToggle?.(item.id);
    };

    const handleNoteAdd = () => {
        const note = prompt('ノートを追加してください:');
        if (note) {
            onNoteAdd?.(item.id, note);
        }
    };

    const handleDocumentAdd = () => {
        const document = prompt('必要書類を追加してください:');
        if (document) {
            onDocumentAdd?.(item.id, document);
        }
    };

    return (
        <div
            className={clsx(
                'border rounded-lg p-4 my-2',
                depth > 0 && 'ml-4',
                className
            )}
        >
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        {hasSubItems && (
                            <button
                                onClick={handleExpandToggle}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                {expanded ? '▼' : '▶'}
                            </button>
                        )}
                        <h3 className="text-lg font-medium">{item.title}</h3>
                        <StatusBadge status={item.status} size="small" />
                    </div>
                    {item.description && (
                        <p className="text-gray-600 mt-1">{item.description}</p>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handleStatusChange('not_started')}
                        className={clsx(
                            'px-2 py-1 rounded',
                            item.status === 'not_started'
                                ? 'bg-gray-200'
                                : 'hover:bg-gray-100'
                        )}
                    >
                        未着手
                    </button>
                    <button
                        onClick={() => handleStatusChange('in_progress')}
                        className={clsx(
                            'px-2 py-1 rounded',
                            item.status === 'in_progress'
                                ? 'bg-blue-200'
                                : 'hover:bg-blue-100'
                        )}
                    >
                        進行中
                    </button>
                    <button
                        onClick={() => handleStatusChange('completed')}
                        className={clsx(
                            'px-2 py-1 rounded',
                            item.status === 'completed'
                                ? 'bg-green-200'
                                : 'hover:bg-green-100'
                        )}
                    >
                        完了
                    </button>
                    <button
                        onClick={() => handleStatusChange('needs_review')}
                        className={clsx(
                            'px-2 py-1 rounded',
                            item.status === 'needs_review'
                                ? 'bg-yellow-200'
                                : 'hover:bg-yellow-100'
                        )}
                    >
                        要確認
                    </button>
                </div>
            </div>

            {/* 進捗バー（サブアイテムがある場合） */}
            {progress && (
                <div className="mt-4">
                    <ProgressIndicator
                        completed={progress.completed}
                        total={progress.total}
                        size="small"
                    />
                </div>
            )}

            {/* メタ情報（書類、ノート） */}
            <div className="mt-4 space-y-2">
                {hasDocuments && (
                    <div className="text-sm">
                        <h4 className="font-medium">必要書類:</h4>
                        <ul className="list-disc list-inside ml-2">
                            {item.requiredDocuments!.map((doc, index) => (
                                <li key={index} className="text-gray-600">
                                    {doc}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {hasNotes && (
                    <div className="text-sm">
                        <h4 className="font-medium">ノート:</h4>
                        <ul className="list-disc list-inside ml-2">
                            {item.notes!.map((note, index) => (
                                <li key={index} className="text-gray-600">
                                    {note}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* アクションボタン */}
            <div className="mt-4 flex gap-2">
                <button
                    onClick={handleNoteAdd}
                    className="text-sm text-blue-600 hover:text-blue-800"
                >
                    ＋ ノートを追加
                </button>
                <button
                    onClick={handleDocumentAdd}
                    className="text-sm text-blue-600 hover:text-blue-800"
                >
                    ＋ 必要書類を追加
                </button>
            </div>

            {/* サブアイテム */}
            {hasSubItems && expanded && (
                <div className="mt-4">
                    {item.subItems!.map((subItem) => (
                        <ChecklistItem
                            key={subItem.id}
                            item={subItem}
                            depth={depth + 1}
                            onStatusChange={onStatusChange}
                            onNoteAdd={onNoteAdd}
                            onDocumentAdd={onDocumentAdd}
                            expanded={expanded}
                            onExpandToggle={onExpandToggle}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ChecklistItem;
