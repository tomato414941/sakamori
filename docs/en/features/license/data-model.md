# License Management Data Model

## 1. Application Management
```typescript
interface Application {
  id: string;
  userId: string;
  status: ApplicationStatus;
  type: LicenseType;
  
  // Application Information
  businessInfo: {
    name: string;        // Business name
    location: string;    // Business location
    startDate: Date;     // Planned start date
    capitalAmount: number; // Capital amount
  };
  
  // Document Management
  documents: {
    [key in DocumentType]: {
      status: DocumentStatus;
      url?: string;
      uploadedAt?: Date;
      expiryDate?: Date;
    };
  };
  
  // Progress Management
  progress: {
    currentStep: number;
    totalSteps: number;
    lastUpdated: Date;
    nextAction?: string;
  };
  
  // History
  history: {
    date: Date;
    action: string;
    note?: string;
  }[];
}
```

## 2. License Information
```typescript
interface License {
  id: string;
  userId: string;
  number: string;      // License number
  type: LicenseType;
  status: LicenseStatus;
  
  // Period Management
  issuedDate: Date;
  expiryDate: Date;
  renewalDate?: Date;
  
  // Business Location
  businessLocation: {
    address: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  
  // Document Management
  documents: Document[];
  
  // Notification Settings
  notifications: {
    renewalReminder: boolean;
    expiryWarning: boolean;
  };
}
```

## 3. Document Management
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

## 4. Enum Definitions
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

## 5. Database Design
### Firestore Collection Structure
```
/users/{userId}
  /applications/{applicationId}
  /licenses/{licenseId}
  /documents/{documentId}
```
