import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-check.js";
import { getFirestore, collection, doc, updateDoc, getDoc, increment, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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
				viewElement.innerText ="00"+ currentData.view;
			}
			//success 
		}
	} catch (error) {	}
}

updateVisitCounter();