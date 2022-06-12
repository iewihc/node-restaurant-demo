import * as admin from 'firebase-admin';
import serviceKey from '../env/serviceKey.json'

export const firebaseSettings = admin.initializeApp({
    credential: admin.credential.cert(serviceKey as any),
});

