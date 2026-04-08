viewLoad = function() {
	var viewsDoc = document.getElementById("views");
	var hits = new XMLHttpRequest();
	hits.open("GET", "https://monupsr.000webhostapp.com/tools/hit/");
	hits.responseType = "json";
	hits.onload = function() {
		viewsDoc.innerHTML = `<sup><i>👁️ 0${this.response.value}</i></sup>`;
 	};
hits.onerror = function() { console.log("hit error")};
	hits.send();
};
viewLoad();
var el = document.querySelector(".countdown");
var countdown = setInterval(()=>{
		var count = el.textContent;
		if (count > 0) {
			 el.write = --el.textContent; 
		} else {
			
			clearInterval(countdown);
			window.location.href = "https://github.com/monupsr";
		}
	},1000);
