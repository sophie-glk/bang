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

