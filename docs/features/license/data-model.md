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
    name: string;
    location: string;
    startDate: Date;
    capitalAmount: number;
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
  number: string;
  type: LicenseType;
  status: LicenseStatus;
  
  // 期間管理
  issuedDate: Date;
  expiryDate: Date;
  renewalDate?: Date;
  
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
  DRAFT = 'draft',
  IN_PROGRESS = 'in_progress',
  SUBMITTED = 'submitted',
  UNDER_REVIEW = 'under_review',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

enum LicenseType {
  RETAIL = 'retail',
  WHOLESALE = 'wholesale',
  ONLINE = 'online'
}

enum DocumentType {
  APPLICATION_FORM = 'application_form',
  RESIDENT_CERT = 'resident_certificate',
  FLOOR_PLAN = 'floor_plan',
  BUSINESS_PLAN = 'business_plan',
  FINANCIAL_DOCS = 'financial_documents',
  ID_DOCUMENTS = 'identification_documents'
}

enum DocumentStatus {
  NOT_SUBMITTED = 'not_submitted',
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
  EXPIRED = 'expired'
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
