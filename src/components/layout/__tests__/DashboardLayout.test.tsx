import { render, screen } from '@testing-library/react';
import { DashboardLayout } from '../DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

// モックの作成
jest.mock('@/hooks/useAuth');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('../Header', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-header">Header</div>,
}));

describe('DashboardLayout', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('should render children when user is authenticated', () => {
    // 認証済みユーザーの状態をモック
    (useAuth as jest.Mock).mockReturnValue({
      user: { email: 'test@example.com' },
      loading: false,
    });

    render(
      <DashboardLayout>
        <div data-testid="test-content">Test Content</div>
      </DashboardLayout>
    );

    // ヘッダーとコンテンツが表示されることを確認
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });

  it('should show loading state when authentication is in progress', () => {
    // ローディング状態をモック
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      loading: true,
    });

    render(
      <DashboardLayout>
        <div>Test Content</div>
      </DashboardLayout>
    );

    // ローディングインジケータが表示されることを確認
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should redirect to signin page when user is not authenticated', () => {
    // 未認証状態をモック
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      loading: false,
    });

    render(
      <DashboardLayout>
        <div>Test Content</div>
      </DashboardLayout>
    );

    // サインインページにリダイレクトされることを確認
    expect(mockRouter.push).toHaveBeenCalledWith('/signin');
  });

  it('should not render children when user is not authenticated', () => {
    // 未認証状態をモック
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      loading: false,
    });

    render(
      <DashboardLayout>
        <div data-testid="test-content">Test Content</div>
      </DashboardLayout>
    );

    // コンテンツが表示されないことを確認
    expect(screen.queryByTestId('test-content')).not.toBeInTheDocument();
  });
});
