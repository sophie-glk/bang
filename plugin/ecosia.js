intercept_url("/search?q=");
var form = document.getElementsByClassName("search-form")[0];
var button = document.getElementsByClassName("button-submit")[0];
var search_url = "https://" + window.location.hostname + "/search?q=@search@"
intercept_engine(form, button, getsearch, search_url);

function getsearch() {
	return document.getElementsByName("q")[0].value;
}
