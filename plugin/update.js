/*
 check_for_banglist_update();
setInterval(function() {
    check_for_banglist_update();
}, 1000 * 60 * 30);
*/
function check_for_banglist_update() {
    chrome.storage.local.get(['banglist_version'], function(result) {
        var version = result.banglist_version;
        if (version == null) {
            get_file(chrome.runtime.getURL('banglist/version.json'), "json", function(response) {
                version = response.version;
                chrome.storage.local.set({
                    "banglist_version": version
                });
                check(version);

            });

        } else {
            check(version);
        }

    });
}

    function check(curr_version) {
        console.log(curr_version);
        get_file("https://duckduckgo.com/bv1.js", "html", function(response) {
                   var regex = /[0-9]+/;
                   var new_version = response.match(regex)[0];
                   console.log(new_version);
                   if(new_version > curr_version){
                       update_banglist(new_version);
                }
            });
            }




function update_banglist(to_version) {
    get_file("https://duckduckgo.com/bang.v" + to_version + ".js", "json", function(response) {
        if (response != null && Array.isArray(response)) {
	    var data = JSON.stringify(response)
            console.log(data)
            chrome.storage.local.set({
                "banglist": data,
                "banglist_version": to_version
            });
        }
    });
     console.log("updated")
}

function get_file(url, type, callback) {
    var req = new XMLHttpRequest();
    req.responseType = type;
    req.open('GET', url, true);
    req.onload = function() {
        callback(req.response);
    };
    req.send(null);

}

