import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../Header';
import { useAuth } from '@/hooks/useAuth';

// Mock the useAuth hook
jest.mock('@/hooks/useAuth');

describe('Header', () => {
  // Reset all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when user is not authenticated', () => {
    beforeEach(() => {
      (useAuth as jest.Mock).mockReturnValue({ user: null });
    });

    it('renders the SAKAMORI logo', () => {
      render(<Header />);
      const logo = screen.getByText('SAKAMORI');
      expect(logo).toBeInTheDocument();
      expect(logo.tagName).toBe('A');
      expect(logo).toHaveAttribute('href', '/');
    });

    it('renders navigation links', () => {
      render(<Header />);
      expect(screen.getByText('ダッシュボード')).toHaveAttribute('href', '/dashboard');
      expect(screen.getByText('在庫管理')).toHaveAttribute('href', '/inventory');
      expect(screen.getByText('免許管理')).toHaveAttribute('href', '/licenses');
    });

    it('renders sign in button when user is not authenticated', () => {
      render(<Header />);
      const signInButton = screen.getByText('サインイン');
      expect(signInButton).toBeInTheDocument();
      expect(signInButton).toHaveAttribute('href', '/signin');
    });

    it('does not render sign out button when user is not authenticated', () => {
      render(<Header />);
      expect(screen.queryByText('サインアウト')).not.toBeInTheDocument();
    });
  });

  describe('when user is authenticated', () => {
    const mockUser = {
      email: 'test@example.com',
    };

    beforeEach(() => {
      (useAuth as jest.Mock).mockReturnValue({ user: mockUser });
    });

    it('renders user email when authenticated', () => {
      render(<Header />);
      expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    });

    it('renders sign out button when user is authenticated', () => {
      render(<Header />);
      expect(screen.getByText('サインアウト')).toBeInTheDocument();
    });

    it('does not render sign in button when user is authenticated', () => {
      render(<Header />);
      expect(screen.queryByText('サインイン')).not.toBeInTheDocument();
    });
  });

  describe('responsive behavior', () => {
    beforeEach(() => {
      (useAuth as jest.Mock).mockReturnValue({ user: null });
    });

    it('navigation is hidden on mobile by default', () => {
      render(<Header />);
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('hidden sm:ml-6 sm:flex sm:space-x-8');
    });
  });
});
