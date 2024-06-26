browser.storage.sync.set({
    "banglist": ""
});

browser.storage.local.get(['version'], function (result) {
    var manv = browser.runtime.getManifest().version;
    if (result.version == null || result.version < manv) {
        console.log("reset banglist");

        browser.storage.local.set({
            "banglist": "",
            "version": manv
        });
    }

});

browser.runtime.onMessage.addListener(function (request, sender) {
        bang(request, sender.tab.id);
});

function bang(request, tab_id) {
    var search = request.srch;
    var raw_search = request.raw_srch;
    var replace = request.rpl;
    var bang = request.bng;
    bang = "!" + bang.substring(1);
    console.log(bang);
    var search_url = request.srch_url;
    if (search == null) { return;}
        browser.storage.sync.get(['bangs', 'onlycustom', "useddg"], function (result) {
            var bangs = null;
            if (result.bangs != null) {
                bangs = JSON.parse(result.bangs);
            }
 
            //check custom bang
            if (bangs != null && bangs.length != 0) {
                for (let i = 0; i < bangs.length; i++) {
                    var bang_alias = bangs[i].bang.split(" ");
                    for (j = 0; j < bang_alias.length; j++) {
                        if (bang == "!" + bang_alias[j]) {
                            use_bang(bang, bangs[i].url, raw_search, "@search@", true);
                            return;
                        }
                    }
                }

            }
        //check normal list
            if (result.onlycustom != true) {
                checklocal();
            }


    

    function checklocal() {
        browser.storage.local.get(['banglist'], function (result) {
            var banglist = result.banglist;
            if (banglist == null || banglist == "") {
                console.log("first run");
                load_bangsjson(check);
            } else {
                check(banglist);
            }
        });

        function load_bangsjson(check) {
            get_file(browser.runtime.getURL('banglist/bangs.json'), "json", function (response) {
                var bl = JSON.stringify(response);
                browser.storage.local.set({
                    "banglist": bl
                });
                check(bl);
            });

        }

        function check(bl) {
            var found = false;
            var banglist = JSON.parse(bl);
            for (var i = 0; i < banglist.length; i++) {
                if ("!" + banglist[i].t == bang.toLowerCase()) {
                    console.log("using local list");
                    use_bang(bang.toLowerCase(), banglist[i].u, raw_search, "{{{s}}}", false);
                    found = true;
                    break;
                }
            }
            if (!found) {
                normalsearch();
            }

        }

    }

    function normalsearch() {
        if (search_url != null) {
            var URL = search_url.replace("@search@", encodeURIComponent(search));
            update_tab(URL);
        }
    }

    function update_tab(url) {
        // `!blogspot` returns `/?q={{{s}}}+site:blogspot.com`
        // Turn relative URLs like above into absolute URLs
        // Already absolute URLs are left unchanged
        url = new URL(url, 'https://duckduckgo.com/').href;
        browser.runtime.getPlatformInfo().then((info) => {
            let updateProperties;
            //android doesn't support the loadReplace option.
            if (info.os == "android") {
                updateProperties = { url };
            }
            else {
                updateProperties = {
                    loadReplace: replace,
                    url
                };
            }
            if (tab_id != null) {
                browser.tabs.update(tab_id, updateProperties);
            } else {
                browser.tabs.update(updateProperties);
            }
        }

        );


    }

    function use_bang(bang, bang_url, raw_search, id, custom) {
        var url = "";

        //user internal bang list
        if(result.useddg != true || custom == true){
        if (raw_search != "") { url = bang_url.replace(id, encodeURIComponent(raw_search)); }
        else {
            var u = new URL(bang_url);
            url = u.protocol + "//" + u.hostname;
        }
    }
    // use ddgs search 
    else{
       url = "https://duckduckgo.com/?q="+bang + " " + encodeURIComponent(raw_search);
    }
        update_tab(url);
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
