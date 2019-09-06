function intercept_engine(form, button, getsearch, search_url) {

 var search = getsearch();
 var bang = search.split(" ")[0];

    if (form != null) {
        form.onsubmit = function() {
            chrome.storage.sync.get(['prefix'], function(result) {
                var prefix = result.prefix;
               var search = getsearch();
               var bang = search.split(" ")[0];
               if(has_prefix(bang, prefix)){
            check_for_bang(search, search_url);
		if(search_url != null){
                  return false;
		}
	    
        }
        });
    }
    }

    if (button != null) {
            //get rid of all other event listeners by cloning
            var new_button = button.cloneNode(true);
            new_button.setAttribute("type", "button"),
     new_button.addEventListener("click", function() {
          chrome.storage.sync.get(['prefix'], function(result) {
              var prefix = result.prefix;
                var search = getsearch();
               var bang = search.split(" ")[0];
               if(has_prefix(bang, prefix)){
                check_for_bang(search, search_url);
		    if(search_url != null){
		    return false;}
               }
          });
            });
     button.parentNode.replaceChild(new_button, button);
     
    }
      chrome.storage.sync.get(['prefix'], function(result) {
          var prefix = result.prefix;
              if(has_prefix(bang, prefix)){
        check_for_bang(getsearch(), null);
               }
      });
    
}

function intercept_url(url_param){
 if (url_param != null && window.location.href.indexOf(url_param) != -1) {
        console.log("is search");
        var search = window.location.href.substring(
            window.location.href.indexOf(url_param) + url_param.length
        ).split('&')[0];
        var search = decodeURIComponent(search).replace("+", " ");
         var bang = search.split(" ")[0];

 chrome.storage.sync.get(['prefix'], function(result) {
          var prefix = result.prefix;
              if(has_prefix(bang, prefix)){
        check_for_bang(getsearch(), null);
               }
      });
 }
}
function check_for_bang(search, search_url) {

    chrome.runtime.sendMessage({
        srch: search,
	srch_url: search_url   
    },  function(response) {});


}

function has_prefix(bang, prefix){
    if(prefix == "" || prefix == null || prefix == " "){
     prefix = "!";
    }
    console.log(prefix);
     if(bang[0] == prefix && bang[1] != "" && bang[1] != null){
         return true;
    }
    
    else{ return false;}
    
}
