export const en = {
  common: {
    appName: 'SAKAMORI',
    description: 'Integrated Management System for Liquor Retailers',
  },
  auth: {
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signOut: 'Sign Out',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    forgotPassword: 'Forgot Password?',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
    error: {
      invalidEmail: 'Please enter a valid email address',
      required: 'This field is required',
      invalidCredentials: 'Invalid email or password',
      passwordMismatch: 'Passwords do not match',
      passwordTooShort: 'Password must be at least 8 characters',
      signUpFailed: 'Failed to create account. Please try again.',
    },
  },
  nav: {
    dashboard: 'Dashboard',
    inventory: 'Inventory',
    sales: 'Sales',
    licenses: 'Licenses',
    settings: 'Settings',
  },
} as const;
