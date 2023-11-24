import { initFirestore } from "@auth/firebase-adapter";
import admin from "firebase-admin";

let app;

if (!admin.apps.length) { // Check if no Firebase app is initialized
    app = admin.initializeApp({
        credential: admin.credential.cert({
            projectId: "circhoolar-3c5e5",
            privateKey: process.env.FIREBASE_PRIVATE_KEY,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
    });
} else {
    app = admin.apps[0]; // Use the already initialized app
}

const adminDb = initFirestore({
    credential: admin.credential.cert({
        projectId: "circhoolar-3c5e5",
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    })
});

const adminAuth = admin.auth();

export { adminDb, adminAuth };