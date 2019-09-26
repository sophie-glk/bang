var branch = "develop";
setInterval(function() {
   check_for_banglist_update();
 }, 1000 * 60 * 30);
function check_for_banglist_update() {
    chrome.storage.sync.get(['banglist_version'], function(result) {
        var version = result.banglist_version;
        if (version == null) {
            get_json(chrome.runtime.getURL('banglist/version.json'), function(response) {
                version = response.version;
                chrome.storage.sync.set({
                    "banglist_version": version
                });
                console.log(version);
                check(version);

            });

        } else {
            check(version);
        }

    });

    function check(curr_version) {
        get_json("https://raw.githubusercontent.com/sophie-glk/bang/"+branch+"/banglist/version.json", function(response) {
            var new_version = response.version;
            console.log(new_version);
            if (new_version > curr_version) {
                update_banglist();
            }
        });
       

    }

}

function update_banglist() {
     get_json("https://raw.githubusercontent.com/sophie-glk/bang/"+branch+"/banglist/bangs.json", function(response) {
         if(response != null && Array.isArray(response)){
         var bl = JSON.stringify(response);
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
