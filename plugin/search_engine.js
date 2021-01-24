function intercept_engine(options) {
    var form = options.form;
    var button = options.button;
    var getsearch = options.getsearch;
    var search_url = options.search_url;

    if (form != null) {
        form.addEventListener('submit', function(event){
            var search = getsearch();
               contains_possible_bang(search, function(b, raw_search, bang){
               if(b){
            check_for_bang(search, raw_search, search_url, false, bang);
        }
        });
    });    
    }
       
}

function check_for_bang(search, raw_search, search_url, replace, bang) {
    chrome.runtime.sendMessage({
        srch: search,
    raw_srch: raw_search,
	srch_url: search_url,
    rpl: replace,
    bng: bang
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

function contains_possible_bang(search, callback){
     get_prefix(function(prefix) {
    var b = false;
    var bang = "";
    var s = "";
    var words = search.split(" ");
   for (var i = 0; i < words.length; i++){
        word = words[i];
        if(has_prefix(word, prefix)){
            var rpl = word;
            if( words.length > 1){
            var space = " ";
            rpl = word + space;
            if(i > 0){
               rpl = space + word; 
            }
            }
            s = search.replace(rpl, "");
            b = true;
            bang = word;
            break;
        }
    }
    callback(b, s, bang);
     });
}

