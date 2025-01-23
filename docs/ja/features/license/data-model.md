# ライセンス管理 データモデル

## 1. 申請管理（Application）
```typescript
interface Application {
  id: string;
  userId: string;
  status: ApplicationStatus;
  type: LicenseType;
  
  // 申請情報
  businessInfo: {
    name: string;        // 事業者名
    location: string;    // 所在地
    startDate: Date;     // 開業予定日
    capitalAmount: number; // 資本金
  };
  
  // 書類管理
  documents: {
    [key in DocumentType]: {
      status: DocumentStatus;
      url?: string;
      uploadedAt?: Date;
      expiryDate?: Date;
    };
  };
  
  // 進捗管理
  progress: {
    currentStep: number;
    totalSteps: number;
    lastUpdated: Date;
    nextAction?: string;
  };
  
  // 履歴
  history: {
    date: Date;
    action: string;
    note?: string;
  }[];
}
```

## 2. ライセンス情報（License）
```typescript
interface License {
  id: string;
  userId: string;
  number: string;      // 免許番号
  type: LicenseType;
  status: LicenseStatus;
  
  // 期間管理
  issuedDate: Date;    // 発行日
  expiryDate: Date;    // 有効期限
  renewalDate?: Date;  // 更新日
  
  // 営業所情報
  businessLocation: {
    address: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  
  // 書類管理
  documents: Document[];
  
  // 通知設定
  notifications: {
    renewalReminder: boolean;
    expiryWarning: boolean;
  };
}
```

## 3. 書類管理（Document）
```typescript
interface Document {
  id: string;
  type: DocumentType;
  name: string;
  url: string;
  uploadedAt: Date;
  expiryDate?: Date;
  status: DocumentStatus;
  metadata?: Record<string, unknown>;
}
```

## 4. 列挙型定義
```typescript
enum ApplicationStatus {
  DRAFT = '下書き',
  IN_PROGRESS = '申請中',
  SUBMITTED = '提出済み',
  UNDER_REVIEW = '審査中',
  APPROVED = '承認済み',
  REJECTED = '却下'
}

enum LicenseType {
  RETAIL = '小売',
  WHOLESALE = '卸売',
  ONLINE = '通信販売'
}

enum DocumentType {
  APPLICATION_FORM = '申請書',
  RESIDENT_CERT = '住民票',
  FLOOR_PLAN = '営業所図面',
  BUSINESS_PLAN = '事業計画書',
  FINANCIAL_DOCS = '財務書類',
  ID_DOCUMENTS = '本人確認書類'
}

enum DocumentStatus {
  NOT_SUBMITTED = '未提出',
  PENDING = '確認待ち',
  VERIFIED = '確認済み',
  REJECTED = '却下',
  EXPIRED = '期限切れ'
}
```

## 5. データベース設計
### Firestore コレクション構造
```
/users/{userId}
  /applications/{applicationId}
  /licenses/{licenseId}
  /documents/{documentId}
```
