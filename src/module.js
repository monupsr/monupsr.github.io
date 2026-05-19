import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-check.js";
import { getFirestore, collection, doc, updateDoc, getDoc, setDoc, increment, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
	apiKey: "AIzaSyClxf6gdARtMirRQIIx0Bni7UE-afrn48Y",
	authDomain: "spck112.firebaseapp.com",
	databaseURL: "https://spck112-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "spck112",
	storageBucket: "spck112.firebasestorage.app",
	messagingSenderId: "503793655605",
	appId: "1:503793655605:web:60443e8910d2eb8af9367c",
	measurementId: "G-XTJHG495QJ"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

if (location.hostname === "localhost") {
	self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

const appCheck = initializeAppCheck(app, {
	provider: new ReCaptchaV3Provider('6LfDWvAsAAAAANoEzZ2rXJyuRrj_0Gyxbl4br2IP'),
	isTokenAutoRefreshEnabled: true
});
async function saveVisitorInfo() {
	try {
		await addDoc(collection(db, "visit_logs"), {
			timestamp: serverTimestamp(),
			page: window.location.pathname,
			browser: navigator.userAgent
		});
		console.log("Visitor data saved!");
	} catch (e) {
		console.error("Error saving data:", e);
	}
}

//saveVisitorInfo();

async function updateVisitCounter() {
	const docRef = doc(db, "t-view", "visit-id");
	try {
		await updateDoc(docRef, {
			view: increment(1),
			last: (new Date()).toLocaleString()
		});
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			const currentData = docSnap.data();
			const viewElement = document.getElementById("t-views");
			if (viewElement) {
				viewElement.innerText = "00" + currentData.view;
			}
			//success 
		}
	} catch (error) {}
}

function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
	return null;
}

function setCookie(name, value, days) {
	const date = new Date();
	date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
	const expires = "expires=" + date.toUTCString();
	document.cookie = name + "=" + value + ";" + expires + ";path=/;Secure;SameSite=Strict";
}

async function fastVisitorLog() {
	const isCookieEnabled = navigator.cookieEnabled;
	let docId = "anon_" + Date.now() + Math.random().toString(36).substring(2, 7);
	
	if (isCookieEnabled) {
		let c_Id = getCookie("visitor_uid");
		if (!c_Id) {
			c_Id = "c_id_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
			setCookie("visitor_uid", c_Id, 365);
		}
		docId = c_Id;
	}
	
	const basePayload = {
		s_date: serverTimestamp(),
		idf: {
			c_Id: isCookieEnabled ? docId : "Disabled",
			cookieEnabled: isCookieEnabled
		},
		dev: {
			userAgent: navigator.userAgent,
			language: navigator.language,
			platform: navigator.platform,
			hardwareConcurrency: navigator.hardwareConcurrency || "Unknown",
			deviceMemory: navigator.deviceMemory || "Unknown"
		},
		screen: {
			res: `${screen.width}x${screen.height}`,
			availableResolution: `${screen.availWidth}x${screen.availHeight}`,
			colorDepth: screen.colorDepth
		},
		session: {
			refr: document.referrer || "Direct",
			c_Page: window.location.pathname,
			c_URL: window.location.href,
			localTime: new Date().toString()
		}
	};
	
	const docRef = doc(db, "visitor", docId);
	
	try {
		await setDoc(docRef, basePayload, { merge: true });
	} catch (error) {
		console.error(error);
		alert(122);
	}
	fetch('https://ipapi.co/json/')
		.then(response => response.ok ? response.json() : null)
		.then(async data => {
			if (data) {
				const networkPayload = {
					network: {
						ipAddress: data.ip || "Unknown",
						country: data.country_name || "Unknown",
						state: data.region || "Unknown",
						city: data.city || "Unknown",
						timezone: data.timezone || "Unknown"
					}
				};
				await setDoc(docRef, networkPayload, { merge: true });
			}
		})
		.catch(error => {
			const fallbackPayload = {
				network: { ipAddress: "Unknown", country: "Unknown", state: "Unknown", city: "Unknown", timezone: "Unknown" }
			};
			setDoc(docRef, fallbackPayload, { merge: true }).catch(e => {})
		});
} fastVisitorLog();

