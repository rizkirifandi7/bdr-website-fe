import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
	apiKey: "AIzaSyAjnl_bBTidIg8xPvMvaEtLA4yIv9gfGSc",
	authDomain: "dbr-notification.firebaseapp.com",
	projectId: "dbr-notification",
	storageBucket: "dbr-notification.firebasestorage.app",
	messagingSenderId: "725148926243",
	appId: "1:725148926243:web:c52a15091fd0fb0d0ccc96",
	measurementId: "G-550GX4T5TE",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
	const supported = await isSupported();
	return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
	try {
		const fcmMessaging = await messaging();
		if (fcmMessaging) {
			const token = await getToken(fcmMessaging, {
				vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
			});
			return token;
		}
		return null;
	} catch (err) {
		console.error("An error occurred while fetching the token:", err);
		return null;
	}
};

export { app, messaging };
