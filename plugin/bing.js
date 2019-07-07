intercept_url("/search?q=");
var search_url = "https://" + window.location.hostname + "/search?q=@search@"
var f = document.getElementById("sb_form");
var button = document.getElementsByClassName("b_searchboxSubmit")[0];
button = document.createElement("BUTTON");
intercept_engine(f, button, getsearch, search_url);


function getsearch() {
	return document.getElementsByName("q")[0].value;
}
