import * as dotenv from 'dotenv';
import * as admin from 'firebase-admin';
import { Firestore } from 'firebase-admin/firestore';

dotenv.config();

const firebaseConfig = {
	type: process.env.FIREBASE_type,
	project_id: process.env.FIREBASE_project_id,
	private_key_id: process.env.FIREBASE_private_key_id,
	private_key: process.env.FIREBASE_private_key?.replace(/\\n/g, '\n'),
	client_id: process.env.FIREBASE_client_id,
	auth_uri: process.env.FIREBASE_auth_uri,
	token_uri: process.env.FIREBASE_token_uri,
	auth_provider_x509_cert_url: process.env.FIREBASE_auth_provider_x509_cert_url,
	client_x509_cert_url: process.env.FIREBASE_client_x509_cert_url,
	client_email: process.env.FIREBASE_client_email,
};

if (!firebaseConfig.project_id || !firebaseConfig.private_key || !firebaseConfig.client_email) {
	throw new Error('Missing required Firebase configuration environment variables');
}

admin.initializeApp({
	credential: admin.credential.cert(firebaseConfig as admin.ServiceAccount),
});

const firestoreAdmin: Firestore = admin.firestore();

export const manhwaRef = firestoreAdmin.collection('manhwa');
export const historyRef = firestoreAdmin.collection('history');

export { admin, firestoreAdmin };
