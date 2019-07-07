intercept_url("/dsearch?query=");
intercept_url("/metasearch.pl?query=");

console.log("startpage.js loaded");
var form;
var getsearch;
if (document.getElementById("q") != null) {
	form = document.getElementById("search")
	getsearch = getsearch_1
}
//home page
else {
	form = document.getElementById("search-form")
	getsearch = getsearch_2
}
var search_url = "https://" + window.location.hostname + "/do/metasearch.pl?query=@search@"
intercept_engine(form, null, getsearch, search_url);


function getsearch_1() {
	return document.getElementById("q").value;
}

function getsearch_2() {
	return document.getElementById("query").value;
}
