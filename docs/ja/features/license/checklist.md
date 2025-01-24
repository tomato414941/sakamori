# 通信販売業免許 申請チェックリスト

## チェックリストの使用方法

このチェックリストは、通信販売業免許の申請に必要な要件を確認し、準備状況を管理するためのものです。
各項目について、以下のステータスで管理します：

- 🔴 未着手
- 🟡 準備中
- 🟢 完了
- ❓ 要確認

## 1. 基本要件確認

### 1.1 人的要件
```typescript
interface PersonalRequirements {
    status: "未確認" | "確認済み" | "要相談";
    checkedAt: Date;
    notes?: string;
}
```

- [ ] 申請者が成年被後見人・被保佐人でないことの確認
- [ ] 破産者でないことの確認
- [ ] 刑事罰に関する欠格事由の確認
- [ ] 酒税法違反による罰金刑の有無確認

### 1.2 経営要件
```typescript
interface BusinessRequirements {
    capitalStatus: {
        required: number;    // 300万円
        current: number;
        status: "不足" | "充足" | "確認中";
    };
    salesPlan: {
        annualTarget: number;
        feasibilityCheck: boolean;
    };
}
```

- [ ] 資本金要件（300万円以上）
  - [ ] 資本金額の確認
  - [ ] 資金調達計画の確認
  - [ ] 自己資本比率の確認

- [ ] 事業計画
  - [ ] 年間販売見込数量の算出
  - [ ] 収支計画の作成
  - [ ] マーケティング計画の策定

## 2. システム要件準備

### 2.1 受注システム
```typescript
interface OrderSystem {
    components: {
        name: string;
        status: "未実装" | "開発中" | "テスト中" | "完了";
        provider?: string;
        notes?: string;
    }[];
}
```

- [ ] オンライン注文システム
  - [ ] 商品カタログ機能
  - [ ] ショッピングカート機能
  - [ ] 決済システム連携
  - [ ] SSL/TLS導入

- [ ] 在庫管理システム
  - [ ] 在庫数管理機能
  - [ ] 発注管理機能
  - [ ] 在庫アラート機能

### 2.2 年齢確認システム
```typescript
interface AgeVerification {
    methods: {
        type: "免許証" | "マイナンバー" | "その他";
        implemented: boolean;
        verificationFlow: string;
    }[];
}
```

- [ ] 注文時の年齢確認
  - [ ] 確認方法の選定
  - [ ] システム実装
  - [ ] テスト実施

- [ ] 配達時の年齢確認
  - [ ] 確認手順の策定
  - [ ] 配送業者との合意
  - [ ] マニュアル作成

## 3. 実務要件準備

### 3.1 保管設備
```typescript
interface StorageFacility {
    location: string;
    capacity: number;
    temperatureControl: boolean;
    securityMeasures: string[];
}
```

- [ ] 保管場所の確保
  - [ ] 面積要件の確認
  - [ ] 温度管理設備
  - [ ] セキュリティ対策

### 3.2 配送体制
```typescript
interface DeliverySystem {
    carriers: {
        name: string;
        contract: boolean;
        coverage: string[];
        restrictions?: string[];
    }[];
}
```

- [ ] 配送業者との契約
  - [ ] 配送範囲の確定
  - [ ] 配送料金の決定
  - [ ] 配送時の確認手順

## 4. 書類準備

### 4.1 申請書類
```typescript
interface ApplicationDocuments {
    documents: {
        name: string;
        required: boolean;
        status: "未準備" | "準備中" | "準備完了";
        expiryDate?: Date;
    }[];
}
```

- [ ] 基本書類
  - [ ] 免許申請書
  - [ ] 住民票
  - [ ] 登記事項証明書
  - [ ] 定款
  - [ ] 印鑑証明書
  - [ ] 財務諸表

- [ ] 通信販売関連書類
  - [ ] ウェブサイト企画書
  - [ ] システム構成図
  - [ ] 年齢確認システム仕様書
  - [ ] 販売管理規程
  - [ ] 配送マニュアル

## 5. 運用準備

### 5.1 社内体制
```typescript
interface OperationalPreparation {
    procedures: {
        category: string;
        documented: boolean;
        training: boolean;
        lastUpdated: Date;
    }[];
}
```

- [ ] 社内規程の整備
  - [ ] 販売管理規程
  - [ ] 従業員教育計画
  - [ ] トラブル対応手順

- [ ] 帳簿管理体制
  - [ ] 記帳ルール策定
  - [ ] 管理ツールの準備
  - [ ] 担当者の教育

### 5.2 コンプライアンス体制
- [ ] 法令遵守体制
  - [ ] 確認手順の策定
  - [ ] 責任者の選任
  - [ ] 定期チェック体制

## 使用方法

1. 各項目のステータスを定期的に更新
2. 未完了項目の課題を特定
3. 必要なリソースの割り当て
4. 期限管理との連動

## 注意事項

- 要件は地域や状況により変更の可能性あり
- 定期的な見直しが必要
- 不明点は所轄の税務署に確認
