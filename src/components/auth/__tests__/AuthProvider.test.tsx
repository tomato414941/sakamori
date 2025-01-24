import { render, screen, act } from '@testing-library/react';
import { AuthProvider } from '../AuthProvider';
import { useAuth } from '@/hooks/useAuth';

// Mock Firebase Auth
jest.mock('firebase/auth', () => {
    const auth = {
        currentUser: null,
        signOut: jest.fn(),
    };
    const signInWithEmailAndPassword = jest.fn();
    const createUserWithEmailAndPassword = jest.fn();
    const onAuthStateChanged = jest.fn((auth, callback) => {
        Promise.resolve().then(() => callback(auth.currentUser));
        return jest.fn();
    });

    return {
        getAuth: jest.fn(() => auth),
        onAuthStateChanged,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
    };
});

// Mock Firebase Config
jest.mock('@/lib/firebase/config', () => ({
    auth: {
        currentUser: null,
        signOut: jest.fn(),
    },
}));

describe('AuthProvider', () => {
    it('renders without crashing', () => {
        render(
            <AuthProvider>
                <div>Test Child</div>
            </AuthProvider>
        );
        expect(screen.getByText('Test Child')).toBeInTheDocument();
    });
});
