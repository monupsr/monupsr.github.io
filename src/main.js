viewLoad = function() {
	var viewsDoc = document.getElementById("views");
	var hits = new XMLHttpRequest();
	hits.open("GET", "http://monu.6te.net/tools/hit");
	hits.responseType = "json";
	hits.onload = function() {
		viewsDoc.innerHTML = `<sup><i>👁️ 0${this.response.value}</i></sup>`;
	}; hits.onerror = function() {};
	hits.send();
}
viewLoad();
