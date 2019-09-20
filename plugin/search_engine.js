function intercept_engine(options) {
    var form = options.form;
    var button = options.button;
    var getsearch = options.getsearch;
    var search_url = options.search_url;
    var fix_btn = options.fix_btn;
 var search = getsearch();
 var bang = search.split(" ")[0];

    if (form != null) {
        form.addEventListener('submit', function(event){ 
            get_prefix( function(prefix) {
               var search = getsearch();
               var bang = search.split(" ")[0];
               if(has_prefix(bang, prefix)){
            check_for_bang(search, search_url, false);
		if(search_url != null){
                  event.preventDefault();
		}
	    
        }
        });
    });    
    }
    

    if (button != null) {
            //get rid of all other event listeners by cloning
            var new_button = button.cloneNode(true);
            new_button.setAttribute("type", "button"),
     new_button.addEventListener("click", function() {
         console.log(getsearch());
          get_prefix( function(prefix) {
                var search = getsearch();
               var bang = search.split(" ")[0];
               if(has_prefix(bang, prefix)){
                check_for_bang(search, search_url, false);
		    if(search_url != null){
		    return false;}
               }
                              
               else{
                  if(fix_btn && getsearch() != ""){
                  form.submit();
                  }
          }
              
            }
              
        );
            });
     button.parentNode.replaceChild(new_button, button);
     
    }

       get_prefix( function(prefix)  {
       if(has_prefix(bang, prefix)){
        check_for_bang(getsearch(), null, true);
       }
      });
       
    
}

function intercept_url(search_param){
var url = new URL(window.location.href);
var search = url.searchParams.get(search_param);
console.log(search_param);
console.log(search);
 get_prefix( function(prefix) {
var bang = search.split(" ")[0];
if(has_prefix(bang, prefix)){
check_for_bang(search, null, true);
}
});
}

function check_for_bang(search, search_url, replace) {
    chrome.runtime.sendMessage({
        srch: search,
	srch_url: search_url,
    rpl: replace
    },  function(response) {
    });


}
function get_prefix(callback){
     chrome.storage.sync.get(['prefix'], function(result) {
      callback(result.prefix);});
}

function has_prefix(bang, prefix){
    if(prefix == "" || prefix == null || prefix == " "){
     prefix = "!";
    }
     if(bang[0] == prefix && bang[1] != "" && bang[1] != null){
         return true;
    }
    
    else{ return false;}
    
}

