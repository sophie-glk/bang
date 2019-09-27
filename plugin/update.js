var branch = "develop";
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
            get_json(chrome.runtime.getURL('banglist/version.json'), function(response) {
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
        get_json("https://raw.githubusercontent.com/sophie-glk/bang/" + branch + "/plugin/banglist/version.json", function(response) {
            var new_version = response.version;
            console.log(new_version);
            if (new_version > curr_version) {
                update_banglist(curr_version);
            }
        });


    }

}

function update_banglist(to_version) {
    get_json("https://duckduckgo.com/bang.v" + to_version + ".js", function(response) {
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
                "banglist": bl
            });

        }
    });

}

function get_json(url, callback) {
    var req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open('GET', url, true);
    req.onload = function() {
        callback(req.response);
    };
    req.send(null);

}
