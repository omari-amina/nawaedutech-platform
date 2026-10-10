import React, { createContext, useContext, useState } from 'react';

// Simplified User Type since we don't have supabase.User anymore
interface User {
  id: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, role: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user] = useState<User | null>(null);
  const [loading] = useState(false);

  const signIn = async () => {
    console.log("Auth is disabled in static mode");
    alert("تسجيل الدخول غير متاح حالياً. يرجى التواصل معنا لطلب المنتجات.");
  };

  const signUp = async () => {
    console.log("Auth is disabled in static mode");
    alert("التسجيل غير متاح حالياً. يرجى التواصل معنا لطلب المنتجات.");
  };

  const signOut = async () => {
    // No-op
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
