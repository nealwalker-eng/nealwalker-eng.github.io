"use client";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { appConfig } from "./config";
import { getFirebaseAuth, getFirebaseDb } from "./firebase";
import {
  mockOfficerProfile,
  mockSupervisorProfile,
} from "./mockData";
import type { UserProfile, UserRole } from "./models";

type AuthStatus = "loading" | "signedOut" | "signedIn" | "denied";

type AuthState = {
  status: AuthStatus;
  profile?: UserProfile;
  error?: string;
};

type AuthContextValue = {
  state: AuthState;
  signInWithGoogle: () => Promise<void>;
  signInWithMockRole: (role: UserRole) => void;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ status: "loading" });

  const handleAuthChange = useCallback(async () => {
    if (appConfig.useMocks) {
      setState({ status: "signedOut" });
      return;
    }
    const auth = getFirebaseAuth();
    const db = getFirebaseDb();
    if (!auth || !db) {
      setState({ status: "signedOut" });
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setState({ status: "signedOut" });
        return;
      }
      try {
        const email = user.email?.toLowerCase() ?? "";
        const whitelistDoc = await getDoc(
          doc(db, "whitelist", email),
        );
        if (!whitelistDoc.exists()) {
          setState({
            status: "denied",
            profile: {
              uid: user.uid,
              email: user.email ?? "",
              displayName: user.displayName ?? user.email ?? "User",
              role: "officer",
              isApproved: false,
              siteIds: [],
            },
          });
          return;
        }
        const data = whitelistDoc.data() as {
          role?: UserRole;
          siteIds?: string[];
        };
        const profile: UserProfile = {
          uid: user.uid,
          email: user.email ?? "",
          displayName: user.displayName ?? user.email ?? "User",
          role: data.role ?? "officer",
          isApproved: true,
          siteIds: data.siteIds ?? [],
        };
        await setDoc(
          doc(db, "users", user.uid),
          {
            email: profile.email,
            displayName: profile.displayName,
            role: profile.role,
            siteIds: profile.siteIds,
            updatedAt: serverTimestamp(),
          },
          { merge: true },
        );
        setState({ status: "signedIn", profile });
      } catch (error) {
        setState({
          status: "signedOut",
          error: error instanceof Error ? error.message : String(error),
        });
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    handleAuthChange().then((cleanup) => {
      unsubscribe = cleanup;
    });
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [handleAuthChange]);

  const signInWithGoogle = useCallback(async () => {
    if (appConfig.useMocks) {
      setState({ status: "signedIn", profile: mockOfficerProfile });
      return;
    }
    const auth = getFirebaseAuth();
    if (!auth) {
      setState({
        status: "signedOut",
        error: "Firebase not configured.",
      });
      return;
    }
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }, []);

  const signInWithMockRole = useCallback((role: UserRole) => {
    setState({
      status: "signedIn",
      profile: role === "supervisor" ? mockSupervisorProfile : mockOfficerProfile,
    });
  }, []);

  const signOut = useCallback(async () => {
    if (appConfig.useMocks) {
      setState({ status: "signedOut" });
      return;
    }
    const auth = getFirebaseAuth();
    if (!auth) {
      setState({ status: "signedOut" });
      return;
    }
    await firebaseSignOut(auth);
    setState({ status: "signedOut" });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      state,
      signInWithGoogle,
      signInWithMockRole,
      signOut,
    }),
    [state, signInWithGoogle, signInWithMockRole, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
