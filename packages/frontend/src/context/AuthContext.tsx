import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../lib/api';
import { UserRole, UserSessionItem } from '@proofly/shared';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isEmailVerified: boolean;
  studentProfile?: {
    id: string;
    username: string;
    headline: string;
    visibility: string;
    completenessScore: number;
  } | null;
  recruiterProfile?: {
    id: string;
    organizationId: string;
    fullName: string;
    title: string;
    organization?: {
      id: string;
      name: string;
      slug: string;
    };
  } | null;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<AuthUser>;
  register: (data: any) => Promise<AuthUser>;
  loginWithGoogle: (credential: string, role?: string) => Promise<AuthUser>;
  forgotPassword: (email: string) => Promise<{ message: string; devOtp?: string }>;
  verifyResetOtp: (email: string, otp: string) => Promise<{ valid: boolean; resetToken?: string }>;
  resetPassword: (data: { email: string; otp?: string; token?: string; newPassword: string }) => Promise<{ message: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  getSessions: () => Promise<UserSessionItem[]>;
  revokeSession: (id: string) => Promise<void>;
  revokeOtherSessions: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const data = await api.get<{ user: AuthUser }>('/auth/me');
      setUser(data.user);
    } catch {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('proofly_token');
      }
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (email: string, password: string, rememberMe?: boolean): Promise<AuthUser> => {
    const data = await api.post<{ user: AuthUser; token: string }>('/auth/login', {
      email,
      password,
      rememberMe,
    });
    if (data?.token && typeof window !== 'undefined') {
      localStorage.setItem('proofly_token', data.token);
    }
    setUser(data.user);
    return data.user;
  };

  const register = async (input: any): Promise<AuthUser> => {
    const data = await api.post<{ user: AuthUser; token: string }>('/auth/register', input);
    if (data?.token && typeof window !== 'undefined') {
      localStorage.setItem('proofly_token', data.token);
    }
    setUser(data.user);
    return data.user;
  };

  const loginWithGoogle = async (credential: string, role?: string): Promise<AuthUser> => {
    const data = await api.post<{ user: AuthUser; token: string }>('/auth/google/token', {
      credential,
      role,
    });
    if (data?.token && typeof window !== 'undefined') {
      localStorage.setItem('proofly_token', data.token);
    }
    setUser(data.user);
    return data.user;
  };

  const forgotPassword = async (email: string) => {
    const data = await api.post<{ message: string; devOtp?: string }>('/auth/forgot-password', { email });
    return data;
  };

  const verifyResetOtp = async (email: string, otp: string) => {
    const data = await api.post<{ valid: boolean; resetToken?: string }>('/auth/verify-reset-otp', { email, otp });
    return data;
  };

  const resetPassword = async (input: { email: string; otp?: string; token?: string; newPassword: string }) => {
    const data = await api.post<{ message: string }>('/auth/reset-password', input);
    return data;
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // In case server is unreachable, ensure local logout
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('proofly_token');
      }
      setUser(null);
    }
  };

  const getSessions = async (): Promise<UserSessionItem[]> => {
    const res = await api.get<{ sessions: UserSessionItem[] }>('/auth/sessions');
    return res.sessions || [];
  };

  const revokeSession = async (id: string) => {
    await api.delete(`/auth/sessions/${id}`);
  };

  const revokeOtherSessions = async () => {
    await api.post('/auth/sessions/revoke-others');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        loginWithGoogle,
        forgotPassword,
        verifyResetOtp,
        resetPassword,
        logout,
        refreshUser,
        getSessions,
        revokeSession,
        revokeOtherSessions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
