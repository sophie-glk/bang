var search_url = "https://" + window.location.hostname + "/search?q=@search@"
var f = document.getElementById("sb_form");
var button = document.getElementsByClassName("b_searchboxSubmit")[0];
button = document.createElement("BUTTON");
document.getElementsByName("q")[0] = null;
intercept_engine({
    form: f,
    button: button, 
    getsearch: getsearch,
    search_url: search_url,

}
    
);


function getsearch() {
	return document.getElementsByName("q")[0].value;
}
