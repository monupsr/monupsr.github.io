window.onload = function() {
	var viewsDoc = document.getElementById("views");
	var hits = new XMLHttpRequest();
	hits.open("GET", "https://api.countapi.xyz/hit/monupsr/monu.rf.gd");
	hits.responseType = "json";
	hits.onload = function() {
		viewsDoc.innerHTML = `<sup><i>👁️ 0${this.response.value}</i></sup>`;
	}; hits.onerror = function() {};
	hits.send();
}
