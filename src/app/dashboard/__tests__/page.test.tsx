import { render, screen, waitFor } from '@testing-library/react';
import DashboardPage from '../page';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

// モックの作成
jest.mock('@/hooks/useAuth');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('DashboardPage', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    // モックのリセット
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('should render dashboard content when user is authenticated', () => {
    // 認証済みユーザーの状態をモック
    (useAuth as jest.Mock).mockReturnValue({
      user: { email: 'test@example.com' },
      loading: false,
    });

    render(<DashboardPage />);

    // ユーザーの歓迎メッセージが表示されることを確認
    expect(screen.getByText('ようこそ、test@example.comさん')).toBeInTheDocument();

    // 統計カードが表示されることを確認
    expect(screen.getByText('在庫アイテム数')).toBeInTheDocument();
    expect(screen.getByText('今月の売上')).toBeInTheDocument();
    expect(screen.getByText('未処理の注文')).toBeInTheDocument();

    // 最近の活動セクションが表示されることを確認
    expect(screen.getByText('最近の活動')).toBeInTheDocument();
    expect(screen.getByText('まだ活動記録がありません')).toBeInTheDocument();
  });

  it('should show loading state when authentication is in progress', () => {
    // ローディング状態をモック
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      loading: true,
    });

    render(<DashboardPage />);

    // ローディングインジケータが表示されることを確認
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should redirect to signin page when user is not authenticated', async () => {
    // 未認証状態をモック
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      loading: false,
    });

    render(<DashboardPage />);

    // サインインページにリダイレクトされることを確認
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/signin');
    });
  });

  it('should not redirect when loading', () => {
    // ローディング状態をモック
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      loading: true,
    });

    render(<DashboardPage />);

    // リダイレクトが発生しないことを確認
    expect(mockRouter.push).not.toHaveBeenCalled();
  });
});
