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
    
    // do search if enter key is pressed
    document.onkeypress = function(e) {
     if(e.code == "Enter"){
      e.preventDefault();
      new_search();
         }
         }

}

intercept_engine(form, button, getsearch, search_url);



function new_search(){
    chrome.storage.sync.get(['prefix'], function(result) {
          var prefix = result.prefix;
var search = getsearch();
var bang = search.split(" ")[0];
if(has_prefix(bang, prefix)){
check_for_bang(search, search_url, false)
}
else if(search != ""){
form.submit()
}
    });
}

function getsearch() {
	return document.getElementsByName("q")[0].value;
}
