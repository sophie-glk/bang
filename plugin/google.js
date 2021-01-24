intercept_url("/search?q=");
var search_url = "https://" + window.location.hostname + "/search?q=@search@"
var form = document.getElementById("tsf");
var button;
if (window.location.href.indexOf("/search") != -1) {
	button = document.getElementsByClassName("Tg7LZd")[0];

}
//home page
else {
    console.log("homepage");
	button = document.getElementsByClassName("gNO89b")[0];
    document.onkeypress = function(e) {
     if(e.code == "Enter"){
      e.preventDefault();
      new_search();
         }
         }

}

intercept_engine({form: form, button: button, getsearch: getsearch, search_url: search_url, fix_btn: true});

function new_search(){
contains_bang(getsearch(), function(b, se, raw_search, bang){
if(b){ check_for_bang(raw_search, search_url, false, bang) }
else if(search != ""){
form.submit()
}
});

function getsearch() {
	return document.getElementsByName("q")[0].value;
}
