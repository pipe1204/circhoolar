import { initFirestore } from "@auth/firebase-adapter";
import admin from "firebase-admin";

let app;

if (!admin.apps.length) { // Check if no Firebase app is initialized
    app = admin.initializeApp({
        credential: admin.credential.cert({
            projectId: "circhoolar-3c5e5",
            privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDdhLxAVgXy99t2\npcNxKJti/DwwwX1hYn8Oq6dGLdRBub8TYHkT1cwlRtwWQyhUZCmtJdkQM+6EqByz\nDdeSgmumi9k25qqQpV5bqn2WSUa9hp/mfDUGNN7AqhUM+soRxfnzhAlmAtEUoKCm\naGoeE64scBSN39yxbOpopvAI6JX0wKBu8i1lIGC7vzmUHbm4whXJm8TPoXnjFDjS\nwH2A4XDtaDHG45cHhiKFyzVP7tvRfeshTN52xUONGrPAms3rs3dy9psOs5j8K2ff\na/BSfXA3JkMasLjHUQvxTRIWys7cIETIJVEYMHV8bRztUrxCi86eDErxj4qpVBuc\nrMnT6kvHAgMBAAECggEAHxeLuhauQcAlqa2dP7t3XplmHrcfJhVxHVoH4dh6O7oa\nkQRaz5HpVCzHT3NLAdgH5tRdIeJoJBkvOLfvU2fC5wl8tNwDghyeoIx5kX06Kffv\nZvvKutLzlmSeYnKrp3r7mQEmCzocpqHfv/uqiWDccu2jCkGASdcDv9Sj9FwmUB1G\nbOpaZKNtro5Wu2klYVnQzM8joYtHDyUUaWcqgocKEzRlm0Y9WdyG9ILL0E2WHr9H\nY8tA1MgGBj3DsdKZzRWJQeSPHMuF/s5ccGGHsQZ/s50MUFkh4YbsH+jEJnjT16zM\nCEVQiamMLC/TqVdGjlFLeiZtie9bt7lxearXwZN+gQKBgQD9ZH65uvIWVY2tWmpZ\nn0oXP3Szvzeoj2aRfKPKx/Bv07k4iFxGAs2h1C1U1PQgOlUR/ph3fKR35TgvjR/8\nMsBQMoAdpS11mcgNwgulai1Hbf/EgZw0rlY28bW17cco/XEMXDRnhmP6g8zhSuZR\nJczqHA6nMyCPyTqmbJVWrPuItwKBgQDfzEZ/YakWNXjBy8stC5N3u1Iiq7xdE/ZI\nuBX79hZkJnQi/6MEk1gdEfi0kitZeIHrV/2iPFcKtiPFQscyD4BaliEKwGRUmOza\nk5SveFaFfnh3LMMdpVUkJIZdCO0+xeqZdqCguF5x1O3dWcLE1FE6pe5vOkVpVLGi\n9x+vXWOlcQKBgF41dOA83zDqkgg3q36yuGs4Tn1dxKXI2wuQWZ1VBNGu2BhqqlPl\nSuq15jy6CCHLTkGodKtIDiX9dQxI3fF4NQQcIoHjHamxiS2ETawsc7Uw8nzu61Ky\n1p8K8tI3G2rj/5nm1hz/XECRrCS/Ii5dbXhFAjWrzplm6YVirYtSORq1AoGAGmPM\nLFknxyanBrMxUi57RTMhjFUT8SXZdNnAPeXW3hhquXXLk06MpWDpIuHZmsNLDqVh\nky/qU6kGrswhERYi3Iu3eb0WF6OwylV8wvQ9v6AaNHNizqwgThLAhVf4Id7UuyPx\n7QHQoTuqkN90yCEBMxk99H+6j6EdEUpywgsRJQECgYAiiyjs5wESILhvu9U6+5qW\nK7AI0CGc1g+ivmEw9S1Jqd8FrbISIHl2eNbewTYjp9T4OQ3p+p4F/6+8JS7npG27\nZ5aT8H+yp9ZR+JtAr8TgO4Yfb7eMF3M0syRekHS+4niB0xvmsj3NKBNZgsCx3mCb\n8gHV2ZlBEBoirrOlIrlsig==\n-----END PRIVATE KEY-----\n",
            clientEmail: "firebase-adminsdk-5678y@circhoolar-3c5e5.iam.gserviceaccount.com",
        }),
    });
} else {
    app = admin.apps[0]; // Use the already initialized app
}

const adminDb = initFirestore({
    credential: admin.credential.cert({
        projectId: "circhoolar-3c5e5",
        privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDdhLxAVgXy99t2\npcNxKJti/DwwwX1hYn8Oq6dGLdRBub8TYHkT1cwlRtwWQyhUZCmtJdkQM+6EqByz\nDdeSgmumi9k25qqQpV5bqn2WSUa9hp/mfDUGNN7AqhUM+soRxfnzhAlmAtEUoKCm\naGoeE64scBSN39yxbOpopvAI6JX0wKBu8i1lIGC7vzmUHbm4whXJm8TPoXnjFDjS\nwH2A4XDtaDHG45cHhiKFyzVP7tvRfeshTN52xUONGrPAms3rs3dy9psOs5j8K2ff\na/BSfXA3JkMasLjHUQvxTRIWys7cIETIJVEYMHV8bRztUrxCi86eDErxj4qpVBuc\nrMnT6kvHAgMBAAECggEAHxeLuhauQcAlqa2dP7t3XplmHrcfJhVxHVoH4dh6O7oa\nkQRaz5HpVCzHT3NLAdgH5tRdIeJoJBkvOLfvU2fC5wl8tNwDghyeoIx5kX06Kffv\nZvvKutLzlmSeYnKrp3r7mQEmCzocpqHfv/uqiWDccu2jCkGASdcDv9Sj9FwmUB1G\nbOpaZKNtro5Wu2klYVnQzM8joYtHDyUUaWcqgocKEzRlm0Y9WdyG9ILL0E2WHr9H\nY8tA1MgGBj3DsdKZzRWJQeSPHMuF/s5ccGGHsQZ/s50MUFkh4YbsH+jEJnjT16zM\nCEVQiamMLC/TqVdGjlFLeiZtie9bt7lxearXwZN+gQKBgQD9ZH65uvIWVY2tWmpZ\nn0oXP3Szvzeoj2aRfKPKx/Bv07k4iFxGAs2h1C1U1PQgOlUR/ph3fKR35TgvjR/8\nMsBQMoAdpS11mcgNwgulai1Hbf/EgZw0rlY28bW17cco/XEMXDRnhmP6g8zhSuZR\nJczqHA6nMyCPyTqmbJVWrPuItwKBgQDfzEZ/YakWNXjBy8stC5N3u1Iiq7xdE/ZI\nuBX79hZkJnQi/6MEk1gdEfi0kitZeIHrV/2iPFcKtiPFQscyD4BaliEKwGRUmOza\nk5SveFaFfnh3LMMdpVUkJIZdCO0+xeqZdqCguF5x1O3dWcLE1FE6pe5vOkVpVLGi\n9x+vXWOlcQKBgF41dOA83zDqkgg3q36yuGs4Tn1dxKXI2wuQWZ1VBNGu2BhqqlPl\nSuq15jy6CCHLTkGodKtIDiX9dQxI3fF4NQQcIoHjHamxiS2ETawsc7Uw8nzu61Ky\n1p8K8tI3G2rj/5nm1hz/XECRrCS/Ii5dbXhFAjWrzplm6YVirYtSORq1AoGAGmPM\nLFknxyanBrMxUi57RTMhjFUT8SXZdNnAPeXW3hhquXXLk06MpWDpIuHZmsNLDqVh\nky/qU6kGrswhERYi3Iu3eb0WF6OwylV8wvQ9v6AaNHNizqwgThLAhVf4Id7UuyPx\n7QHQoTuqkN90yCEBMxk99H+6j6EdEUpywgsRJQECgYAiiyjs5wESILhvu9U6+5qW\nK7AI0CGc1g+ivmEw9S1Jqd8FrbISIHl2eNbewTYjp9T4OQ3p+p4F/6+8JS7npG27\nZ5aT8H+yp9ZR+JtAr8TgO4Yfb7eMF3M0syRekHS+4niB0xvmsj3NKBNZgsCx3mCb\n8gHV2ZlBEBoirrOlIrlsig==\n-----END PRIVATE KEY-----\n",
        clientEmail: "firebase-adminsdk-5678y@circhoolar-3c5e5.iam.gserviceaccount.com",
    })
});

const adminAuth = admin.auth();

export { adminDb, adminAuth };