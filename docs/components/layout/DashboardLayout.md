# Dashboard

## Overview

The dashboard serves as the main interface of the SAKAMORI application. Users can quickly view important information such as inventory count, sales, and pending orders at a glance.

## Component Structure

### DashboardLayout

An authentication-protected layout component that provides:

- Authentication state verification
- Redirection for unauthenticated users
- Loading state display
- Common header display

```tsx
import { DashboardLayout } from '@/components/layout/DashboardLayout';

export default function ProtectedPage() {
  return (
    <DashboardLayout>
      <div>Protected Content</div>
    </DashboardLayout>
  );
}
```

### DashboardPage

The main dashboard page component displays:

- User information
- Statistics (inventory count, sales, pending orders)
- Recent activities

## Authentication and Protection

- All dashboard pages require authentication
- Unauthenticated users are automatically redirected to the sign-in page
- Appropriate loading indicators are displayed during authentication checks

## Testing

Tests are located in:

- `src/app/dashboard/__tests__/page.test.tsx`
- `src/components/layout/__tests__/DashboardLayout.test.tsx`

The tests verify:

1. Content display for authenticated users
2. Redirection for unauthenticated users
3. Loading state display
4. Proper component rendering

## Usage Example

```tsx
// pages/dashboard/inventory.tsx
export default function InventoryPage() {
  return (
    <DashboardLayout>
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Inventory Management
        </h1>
        {/* Inventory management content */}
      </div>
    </DashboardLayout>
  );
}
```

## Styling

- Uses TailwindCSS
- Responsive design
- Accessibility considerations (WAI-ARIA compliant)

## Future Development Plans

1. Statistics Implementation
   - Integration with actual database
   - Addition of graphs and charts

2. Activity Log Implementation
   - User action tracking
   - Filtering capabilities

3. Customization Features
   - Dashboard layout customization
   - Selectable statistics display
