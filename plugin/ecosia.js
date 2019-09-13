intercept_url("/search?q=");
var form = document.getElementsByClassName("search-form")[0];
var button = document.getElementsByClassName("button-submit")[0];
var search_url = "https://" + window.location.hostname + "/search?q=@search@"
intercept_engine({form: form, button: button, getsearch: getsearch, search_url: search_url, fix_btn: true});

function getsearch() {
	return document.getElementsByName("q")[0].value;
}
