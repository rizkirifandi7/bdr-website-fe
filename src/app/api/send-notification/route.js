import admin from "firebase-admin";
import { Message } from "firebase-admin/messaging";
import { NextRequest, NextResponse } from "next/server";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
	const serviceAccount = {
		type: "service_account",
		project_id: "dbr-notification",
		private_key_id: "f41ed13b8d37202992d0260e929baf2282ff0dd2",
		private_key:
			"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDcc0tDOXqPKg8y\nk8qEk4YmstBkzgODKXux0rSpEzGEsPZwlwV7Ey13vKElCEDWB9S/DZ+bNw/f3OhG\nik/iMSTR5FvCH7aMxPsIkns60PfOKyWryEZCZZ2/jQEucMXrhgyKhB9kFjSEpGr+\nsOSS/We5b6Houa0PxzDi7TjbsoSDI9nNNY/KfbVMNIHIomdJX/wtWCVafquW/u45\nmskah8EvUZsZwBq0tjd+di11nZZDpMnP0ubzU/V7sMpMX0nCrQ4ViZego4P5GgN2\nVqId4xFXH4Oz9yGqGqNrz3LhlsGYrVTzX12rKD1VYTQKj4+DHouHgj+zjIIG/oNH\nY5j/bHZjAgMBAAECggEAa+p8w3HVz1OVkPrMPs5A85zBazd2fLTH+qrdCY99xCkk\n2sTzR+aBcYYDlK9PnfbDbKtsoHz55mqrwixfIqlQDves+4CuyoZ7JR0f+hDl3iU9\nEbS+wC4iZOzP0T4fhUZfyUcYXtSH7Q7X2coaeuJV7m75YYXTdE/cXJooJVRkjhUM\nHJlu1hPf4Qbine8SYhmzr8RH6I9bNUgV4R8PLzrmPhweSWugAvIRZ0Z5EmR1HYJ9\nsskUieWUC5DNuFpFJBjdPiKBGcYA3iDYOuC2f9+QKB8tJhgTGTSn+V0DaPZt4Atr\n8Nd4QmrYt1M9DRx1Mdhpw590ePET312cELXXg4fWYQKBgQDyjBzghMmzbegZU0q7\nGc+1O6VQQu+C1B68LroL4J2uzJNqlKKiubWg3Aw2EU0ZiUIALw6oS9KPSiMfN79J\nTl5gsxE3hgOheHUCGVL5a1YnlGwTGaZKuFuM8bl8C8pkJmfJ8oBW2zKokRo5Crk3\nT8HvG5PxU0VxdvrHKs5iZZ9auQKBgQDorW4yswyc0vYeuIROxI6ee+uuapmtmYgH\nMtkTi/WdTTooHPuPY090nWdcvcDDcXChZp8Qv4XiWKV8Js1w/rh5t5DxTDd1kIrI\nGrJaMKB6j12mR3JDsgYQgg62bKUhgAzK4raT0/C0XUcOqH88v6EkfRfY0XJ7oO90\nkH6dCAUb+wKBgQCiusK9GBpDmh+4rhtbgKvMymHVgbM0MaEVXLxSL7dbicH2Jhcf\n2j0z2a8Pr3ftBBwWB3xsCcMRhAogbcSXKE9FzZ5lhDJ3aVwHtnnnAc7h60C/Z9wc\nEajK3Xs28Kovm1zTLzJQE+zfD8tqLfmqVIanJ/eQV/AlelAyxFOHzOqncQKBgFBO\nAzmWWGUL3owtzOROrJaAWJBjFFU5Jxys7QT1CjlXPRo5Ho2XjgXGibUVfKE31tKt\n03p5T6EWTU8zKTa1gz/nHixZzM5Tq8JyjFnabJjAQGcyQ3qfx74M1T0a9EdCpaek\nZbVRscLearbhasCxttEcJ43ag/OtUNffQwO5j+HfAoGAWJNXvAAFu5kB3RE4j38i\nZFR7uIkiqZL7yyKu13tRYwWd4VK4U3tDh7gioy3BJQyIOzlYJr+gfxh1MRk026HT\neVOY3M6X5nedZBJ/JQlUL+GoV+U0kJ4TRQPWOk0+Wus+Wvi2MpNTblvaIVLr7Tji\nDbXYJ7Y/yH+OX/B5BQuo/iQ=\n-----END PRIVATE KEY-----\n",
		client_email:
			"firebase-adminsdk-76f7b@dbr-notification.iam.gserviceaccount.com",
		client_id: "113486503257590661938",
		auth_uri: "https://accounts.google.com/o/oauth2/auth",
		token_uri: "https://oauth2.googleapis.com/token",
		auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
		client_x509_cert_url:
			"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-76f7b%40dbr-notification.iam.gserviceaccount.com",
		universe_domain: "googleapis.com",
	};
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
	});
}

export async function POST(request) {
	const { token, title, message, link } = await request.json();

	const payload = {
		token,
		notification: {
			title: title,
			body: message,
		},
		webpush: link && {
			fcmOptions: {
				link,
			},
		},
	};

	try {
		await admin.messaging().send(payload);

		return NextResponse.json({ success: true, message: "Notification sent!" });
	} catch (error) {
		return NextResponse.json({ success: false, error });
	}
}
