import * as admin from 'firebase-admin';
import serviceKey from '../env/serviceKey.json'

admin.initializeApp({
    credential: admin.credential.cert(serviceKey as any),
});

const db = admin.firestore()
export { admin , db }
