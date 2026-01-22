import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";
import { getMessaging, isSupported } from "firebase/messaging";

import { firebaseConfig, isFirebaseConfigured } from "./config";

let firebaseApp: FirebaseApp | null = null;

export function getFirebaseApp(): FirebaseApp | null {
  if (!isFirebaseConfigured) {
    return null;
  }
  if (firebaseApp) {
    return firebaseApp;
  }
  firebaseApp =
    getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
  return firebaseApp;
}

export function getFirebaseAuth() {
  const app = getFirebaseApp();
  return app ? getAuth(app) : null;
}

export function getFirebaseDb() {
  const app = getFirebaseApp();
  return app ? getFirestore(app) : null;
}

export function getFirebaseFunctions() {
  const app = getFirebaseApp();
  return app ? getFunctions(app) : null;
}

export function getFirebaseStorage() {
  const app = getFirebaseApp();
  return app ? getStorage(app) : null;
}

export async function getFirebaseMessaging() {
  const app = getFirebaseApp();
  if (!app) {
    return null;
  }
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
}
