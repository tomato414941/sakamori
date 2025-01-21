export const useAuth = jest.fn(() => ({
  user: null,
  signIn: jest.fn(),
  signOut: jest.fn(),
  loading: false,
  error: null,
}));
