viewLoad = function() {
	var viewsDoc = document.getElementById("views");
	var hits = new XMLHttpRequest();
	hits.open("GET", "https://monupsr.000webhostapp.com/tools/hit/");
	hits.responseType = "json";
	hits.onload = function() {
		viewsDoc.innerHTML = `<sup><i>👁️ 0${this.response.value}</i></sup>`;
	}; hits.onerror = function() {alert(0)};
	hits.send();
}
viewLoad();
