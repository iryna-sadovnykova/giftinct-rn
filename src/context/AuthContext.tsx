import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { AuthContextValue, SocialProvider, User } from './authTypes';

const SOCIAL_MOCK_PROFILES: Record<
  SocialProvider,
  { email: string; firstName: string; lastName: string }
> = {
  google: {
    email: 'user@gmail.com',
    firstName: 'Google',
    lastName: 'User',
  },
  facebook: {
    email: 'user@facebook.com',
    firstName: 'Facebook',
    lastName: 'User',
  },
  apple: {
    email: 'user@icloud.com',
    firstName: 'Apple',
    lastName: 'User',
  },
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const createUserFromEmail = (email: string, overrides?: Partial<User>): User => {
  const localPart = email.split('@')[0] ?? 'user';
  const nameParts = localPart.replace(/[._-]/g, ' ').split(' ').filter(Boolean);
  const firstName =
    overrides?.firstName ??
    (nameParts[0]
      ? nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1)
      : 'Guest');
  const lastName =
    overrides?.lastName ??
    (nameParts[1]
      ? nameParts[1].charAt(0).toUpperCase() + nameParts[1].slice(1)
      : '');

  return {
    id: `user-${Date.now()}`,
    email,
    firstName,
    lastName,
    phoneNumber: overrides?.phoneNumber,
  };
};

/** Session state for the signed-in user — login, signup, profile, logout. */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, _password: string) => {
    if (!email.trim()) {
      throw new Error('Email is required');
    }
    setUser(createUserFromEmail(email.trim()));
  }, []);

  const loginWithSocial = useCallback(async (provider: SocialProvider) => {
    const profile = SOCIAL_MOCK_PROFILES[provider];
    setUser(createUserFromEmail(profile.email, profile));
  }, []);

  const signUp = useCallback(
    async ({
      email,
      password: _password,
      firstName,
      lastName,
    }: {
      email: string;
      password: string;
      firstName?: string;
      lastName?: string;
    }) => {
      if (!email.trim()) {
        throw new Error('Email is required');
      }
      setUser(createUserFromEmail(email.trim(), { firstName, lastName }));
    },
    [],
  );

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const updateProfile = useCallback((updates: Partial<Omit<User, 'id'>>) => {
    setUser(current =>
      current ? { ...current, ...updates } : current,
    );
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: user != null,
      login,
      loginWithSocial,
      signUp,
      logout,
      updateProfile,
    }),
    [user, login, loginWithSocial, signUp, logout, updateProfile],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
