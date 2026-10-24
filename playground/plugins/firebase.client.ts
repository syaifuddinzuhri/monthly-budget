import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId,
  }

  const hasFirebaseConfig = Object.values(firebaseConfig).every(Boolean)

  if (!hasFirebaseConfig) {
    nuxtApp.provide('firebaseDb', null)
    nuxtApp.provide('firebaseReady', false)
    return
  }

  const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
  const db = getFirestore(app)

  nuxtApp.provide('firebaseDb', db)
  nuxtApp.provide('firebaseReady', true)
})
