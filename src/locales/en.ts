export const en = {
  common: {
    appName: 'SAKAMORI',
    description: 'Online Liquor Retail License Application Support System',
    loading: 'Loading...',
    save: 'Save',
    next: 'Next',
    back: 'Back',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    required: 'Required',
  },
  home: {
    hero: {
      title: 'Simplify Your Online Liquor Retail License Application',
      description: 'SAKAMORI is a support system for preparing online liquor retail license applications. We help streamline your license acquisition process, from requirement verification to document preparation.',
      dashboard: 'Start Application',
    },
    features: {
      license: {
        title: 'Application Document Support',
        description: 'Step-by-step support for preparing online liquor retail license application documents. Complete application forms by simply entering the required information.',
      },
      requirements: {
        title: 'Requirements Check',
        description: 'Clear explanation of license requirements. Check if you are eligible to apply before starting the process.',
      },
      guidance: {
        title: 'Application Process Guide',
        description: 'Detailed explanation of the process from application to acquisition. Easy-to-understand guidance on required documents and tax office submissions.',
      },
    },
  },
  dashboard: {
    title: 'Application Dashboard',
    description: "Let's proceed with your application step by step",
    steps: {
      requirements: {
        title: 'Requirements Check',
        description: 'Verify application requirements',
        status: {
          notStarted: 'Not Started',
          inProgress: 'In Progress',
          completed: 'Completed',
        },
      },
      documents: {
        title: 'Document Preparation',
        description: 'Prepare necessary documents',
        status: {
          notStarted: 'Not Started',
          inProgress: 'In Progress',
          completed: 'Completed',
        },
      },
      guide: {
        title: 'Application Process',
        description: 'Check the application flow',
      },
    },
    requirements: {
      title: 'Application Requirements Checklist',
      description: 'Please verify the following requirements',
      categories: {
        personal: {
          title: 'Personal Requirements',
          items: {
            age: 'Must be 20 years or older',
            residence: 'Must have a residence in Japan',
            disqualification: 'Must not fall under any disqualification criteria',
          },
        },
        business: {
          title: 'Business Requirements',
          items: {
            location: 'Must have a residence or business office within the jurisdiction of the tax office that oversees the location of the intended online liquor retail business',
            experience: 'Must be able to employ personnel with experience in liquor sales operations',
            facilities: 'Must have necessary facilities for liquor sales operations',
          },
        },
        financial: {
          title: 'Financial Requirements',
          items: {
            capital: 'Must have capital of 10 million yen or more',
            stability: 'Must be financially stable',
          },
        },
      },
    },
    documents: {
      title: 'Document Preparation',
      description: 'Prepare necessary documents',
      types: {
        application: {
          title: 'Application Form',
          description: 'Online Liquor Retail License Application Form',
        },
        businessPlan: {
          title: 'Business Plan',
          description: 'Online Liquor Sales Plan and Details',
        },
        attachments: {
          title: 'Required Attachments',
          description: 'Articles of Incorporation, Certificate of Registration, Tax Payment Certificate, etc.',
        },
      },
    },
    guide: {
      title: 'Application Process Guide',
      description: 'Learn about the application process',
      steps: {
        preparation: {
          title: 'Preparation',
          description: 'Prepare documents and verify requirements',
        },
        submission: {
          title: 'Submission',
          description: 'Submit application documents to the tax office',
        },
        interview: {
          title: 'Interview',
          description: 'Interview with tax office officials',
        },
        inspection: {
          title: 'Site Inspection',
          description: 'Inspection of sales premises',
        },
        issuance: {
          title: 'License Issuance',
          description: 'Issuance of the license',
        },
      },
    },
  },
  auth: {
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signOut: 'Sign Out',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    forgotPassword: 'Forgot Password',
    noAccount: "Don't have an account",
    haveAccount: 'Already have an account',
    notSignedIn: 'Not signed in',
    error: {
      invalidEmail: 'Please enter a valid email address',
      required: 'This field is required',
      invalidCredentials: 'Invalid email or password',
      passwordMismatch: 'Passwords do not match',
      passwordTooShort: 'Password must be at least 8 characters',
      emailInUse: 'This email is already in use',
      weakPassword: 'Password is too weak. Please choose a stronger password',
      tooManyRequests: 'Too many attempts. Please try again later',
      networkError: 'Network error occurred. Please check your internet connection',
      operationNotAllowed: 'Operation not allowed',
      requiresRecentLogin: 'Authentication has expired. Please sign in again',
      unknown: 'An unexpected error occurred',
    },
  },
  profile: {
    title: 'Profile Settings',
    displayName: 'Display Name',
    companyName: 'Company Name',
    phoneNumber: 'Phone Number',
    save: 'Save',
    updateSuccess: 'Profile updated successfully',
    updateError: 'Failed to update profile',
  },
  nav: {
    dashboard: 'Dashboard',
    inventory: 'Inventory',
    sales: 'Sales',
    customers: 'Customers',
    profile: 'Profile',
  },
} as const;
