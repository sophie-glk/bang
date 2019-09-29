/*
 check_for_banglist_update();
setInterval(function() {
    check_for_banglist_update();
}, 1000 * 60 * 30);
*/
function check_for_banglist_update() {
    chrome.storage.sync.get(['banglist_version'], function(result) {
        var version = result.banglist_version;
        if (version == null) {
            get_file(chrome.runtime.getURL('banglist/version.json'), "json", function(response) {
                version = response.version;
                chrome.storage.sync.set({
                    "banglist_version": version
                });
                check(version);

            });

        } else {
            check(version);
        }

    });

    function check(curr_version) {
        console.log(curr_version);
        get_file("https://duckduckgo.com/bang?q=a", "html", function(response) {
        var lines = response.split("\n");
            for(var i = 0; i < lines.length; i++){
               if(lines[i].includes("DDG.inject(\"DDG.Data.bangs.version\"")){
                   var regex = /[0-9]+/;
                   var new_version = lines[i].match(regex)[0];
                   console.log(new_version);
                   if(new_version > curr_version){
                       update_banglist(new_version);
                }
                   break;
            }
            }
        });


    }

}

function update_banglist(to_version) {
    get_file("https://duckduckgo.com/bang.v" + to_version + ".js", "json", function(response) {
        if (response != null && Array.isArray(response)) {
            var result = [];
            for (var i = 0; i < response.length; i++) {
                var bang_site = response[i].u.replace("{{{s}}}", "bang");
                var bang_prefix = "!" + response[i].t;
                result.push([bang_prefix, bang_site]);
            }
            console.log(result);
            console.log("Update successful!");
            var bl = JSON.stringify(result);
            chrome.storage.sync.set({
                "banglist": bl,
                "banglist_version": to_version
            });

        }
    });

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

