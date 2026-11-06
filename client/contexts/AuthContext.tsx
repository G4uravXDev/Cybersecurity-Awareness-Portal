import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import {
  auth,
  googleProvider,
  isFirebaseConfigured,
  getFriendlyFirebaseErrorMessage,
} from "@/lib/firebase";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  enrolledCourses: string[];
  firebaseUid?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signupWithEmail: (
    email: string,
    password: string,
    name: string,
  ) => Promise<void>;
  signupWithGoogle: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  enrollInCourse: (courseId: string) => void;
  isEnrolledInCourse: (courseId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Auth state listener
  useEffect(() => {
    // If Firebase credentials are still placeholders in .env, operate in local session mode
    if (!isFirebaseConfigured()) {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          localStorage.removeItem("user");
        }
      }
      setIsLoading(false);
      return;
    }

    // When configured with live Firebase, listen to Firebase Auth events
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const storedCoursesKey = `enrolledCourses_${firebaseUser.uid}`;
        const localEnrolled: string[] = JSON.parse(
          localStorage.getItem(storedCoursesKey) || "[]",
        );

        const userData: User = {
          id: firebaseUser.uid,
          firebaseUid: firebaseUser.uid,
          email: firebaseUser.email || "",
          name:
            firebaseUser.displayName ||
            firebaseUser.email?.split("@")[0] ||
            "SecOps Defender",
          role: "user",
          enrolledCourses: localEnrolled,
          avatarUrl: firebaseUser.photoURL || undefined,
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          try {
            const userData: User = JSON.parse(savedUser);
            // Retain local demo / test sessions if no Firebase session exists
            if (
              userData.id === "demo" ||
              userData.id === "admin" ||
              userData.id === "google-demo-user"
            ) {
              setUser(userData);
            } else {
              setUser(null);
              localStorage.removeItem("user");
            }
          } catch {
            setUser(null);
            localStorage.removeItem("user");
          }
        } else {
          setUser(null);
        }
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Demo user credentials
      if (username === "user" && password === "user") {
        const demoUser: User = {
          id: "demo",
          email: "user@cybersafe.com",
          name: "SecOps Analyst",
          role: "user",
          enrolledCourses: JSON.parse(
            localStorage.getItem("enrolledCourses_demo") || '["course-1", "course-13"]',
          ),
        };
        setUser(demoUser);
        localStorage.setItem("user", JSON.stringify(demoUser));
        return true;
      }

      // Admin credentials
      if (username === "admin" && password === "admin") {
        const adminUser: User = {
          id: "admin",
          email: "admin@cybersafe.com",
          name: "Security Director",
          role: "admin",
          enrolledCourses: JSON.parse(
            localStorage.getItem("enrolledCourses_admin") || '["course-1", "course-2", "course-13"]',
          ),
        };
        setUser(adminUser);
        localStorage.setItem("user", JSON.stringify(adminUser));
        return true;
      }

      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    if (!isFirebaseConfigured()) {
      console.info("Firebase is unconfigured; logging in via simulated credentials.");
      const demoEmailUser: User = {
        id: `user-${Date.now()}`,
        email: email,
        name: email.split("@")[0],
        role: "user",
        enrolledCourses: [],
      };
      setUser(demoEmailUser);
      localStorage.setItem("user", JSON.stringify(demoEmailUser));
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      throw new Error(getFriendlyFirebaseErrorMessage(error));
    }
  };

  const signupWithEmail = async (
    email: string,
    password: string,
    name: string,
  ) => {
    if (!isFirebaseConfigured()) {
      console.info("Firebase is unconfigured; registering via simulated credentials.");
      const demoEmailUser: User = {
        id: `user-${Date.now()}`,
        email: email,
        name: name || email.split("@")[0],
        role: "user",
        enrolledCourses: [],
      };
      setUser(demoEmailUser);
      localStorage.setItem("user", JSON.stringify(demoEmailUser));
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName: name });
      }
    } catch (error: any) {
      throw new Error(getFriendlyFirebaseErrorMessage(error));
    }
  };

  const loginWithGoogle = async () => {
    // If real Firebase keys are not in .env yet, provide an instant simulation so authentication works immediately
    if (!isFirebaseConfigured()) {
      console.info("Simulated Google Sign-in activated (No valid Firebase API key detected in .env)");
      const googleUser: User = {
        id: "google-demo-user",
        firebaseUid: "google-demo-uid-7890",
        email: "alex.defender@gmail.com",
        name: "Alex Morgan",
        role: "user",
        enrolledCourses: JSON.parse(
          localStorage.getItem("enrolledCourses_google-demo-uid-7890") || '["course-1", "course-13"]',
        ),
      };
      setUser(googleUser);
      localStorage.setItem("user", JSON.stringify(googleUser));
      return;
    }

    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        const storedCoursesKey = `enrolledCourses_${result.user.uid}`;
        const localEnrolled: string[] = JSON.parse(
          localStorage.getItem(storedCoursesKey) || "[]",
        );

        const userData: User = {
          id: result.user.uid,
          firebaseUid: result.user.uid,
          email: result.user.email || "",
          name:
            result.user.displayName ||
            result.user.email?.split("@")[0] ||
            "SecOps Defender",
          role: "user",
          enrolledCourses: localEnrolled,
          avatarUrl: result.user.photoURL || undefined,
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      }
    } catch (error: any) {
      console.error("Firebase Google Sign-In error:", error);
      throw new Error(getFriendlyFirebaseErrorMessage(error));
    }
  };

  const signupWithGoogle = async () => {
    await loginWithGoogle();
  };

  const logout = async () => {
    try {
      if (isFirebaseConfigured() && auth.currentUser) {
        await signOut(auth);
      }
    } catch (error) {
      console.warn("Logout warning:", error);
    } finally {
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  const enrollInCourse = (courseId: string) => {
    if (!user) return;
    if (!user.enrolledCourses.includes(courseId)) {
      const updatedUser: User = {
        ...user,
        enrolledCourses: [...user.enrolledCourses, courseId],
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      const storageId = user.firebaseUid || user.id;
      localStorage.setItem(
        `enrolledCourses_${storageId}`,
        JSON.stringify(updatedUser.enrolledCourses),
      );
    }
  };

  const isEnrolledInCourse = (courseId: string): boolean => {
    return user?.enrolledCourses?.includes(courseId) || false;
  };

  const value = {
    user,
    login,
    loginWithEmail,
    signupWithEmail,
    signupWithGoogle,
    loginWithGoogle,
    logout,
    isLoading,
    enrollInCourse,
    isEnrolledInCourse,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
