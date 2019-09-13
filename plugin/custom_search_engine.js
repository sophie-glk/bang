window.stop();
var url = new URL(window.location.href);
var search_url = url.searchParams.get("su");
var search = url.searchParams.get("q");
chrome.storage.sync.get(['prefix'], function(result) {
var prefix = result.prefix;
var bang = search.split(" ")[0];
if(has_prefix(bang, prefix)){
check_for_bang(search, search_url, true);
}
else{
    var normal_search = search_url.replace("@search@",  encodeURIComponent(search));
    window.location.replace(normal_search);
    }

      });


