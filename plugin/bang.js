chrome.storage.sync.set({
                    "banglist": ""
                });
chrome.runtime.onMessage.addListener(function(request, sender) {
    if(request.update){
     check_for_banglist_update();   
    }
    else{
    bang(request, sender.tab.id);
    }
        
    });

function bang(request, tab_id) {
    var search = request.srch;
    var raw_search = search;
    var replace = request.rpl;
    var bang = request.bng;
    bang = "!" + bang.substring(1);
    console.log(bang);
    var search_url = request.srch_url;
    if (search != null && search != "") {
        chrome.storage.sync.get(['bangs'], function(result) {
            var i;
            var bangs = null;
            if (result.bangs != null) {
                bangs = JSON.parse(result.bangs);
            }

            if (bangs != null && bangs.length != 0) {
                var found = false;
                for (i = 0; i < bangs.length; i++) {
                    var bang_alias = bangs[i].bang.split(" ");
                    for (j = 0; j < bang_alias.length; j++) {
                        if (bang == "!" + bang_alias[j]) {
                            found = true;
                            var URL = (bangs[i].url).replace("@search@", encodeURIComponent(raw_search));
                            update_tab(URL);
                            break;
                        }
                    }
                    if (found) {
                        break;
                    }
                }
                if (!found) {
                    checklocal();
                }

            } else if (search != null && search != "") {
                checklocal();
            }

        });
    }

    function checklocal() {
        chrome.storage.local.get(['banglist'], function(result) {
            var banglist = result.banglist;
            if (banglist == null) {
                console.log("first run");
                load_bangsjson(check);
            } else {
                check(banglist);
            }
        });

        function load_bangsjson(check) {
            get_file(chrome.runtime.getURL('banglist/bangs.json'), "json", function(response) {
                var bl = JSON.stringify(response);
                chrome.storage.local.set({
                    "banglist": bl
                });
                check(bl);
            });

        }

        function check(bl) {
            var found = false;
            var banglist = JSON.parse(bl);
            for (var i = 0; i < banglist.length; i++) {
                if (banglist[i][0] == bang) {
                    console.log("using local list");
                    update_tab(banglist[i][1].replace("bang", encodeURIComponent(raw_search)));
                    found = true;
                    break;
                }
            }
            if (!found) {
                ddg();
            }

        }

    }


    function ddg() {
        var xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
            if (this.readyState == 4 && this.status == 200) {
                var response = xhttp.response;

                // var regex= (?:\()?(?:\+bang+)(?:\))?(?:\<br\>)?(?:);
                var regex = " (?:\\()?(?:\\" + bang + ")(?:\\))?(?:\\<br\\>)?(?:) "
                var rex = new RegExp(regex, "g");
                response = response.replace(/(\r\n|\n|\r)/gm, " ");

                if (response.match(rex) != null) {

                    update_tab("https://www.duckduckgo.com/?q=" + encodeURIComponent(search));
                } else {
                    normalsearch();
                }
            }
        };

        xhttp.open("GET", "https://duckduckgo.com/bang_lite.html", true);
        xhttp.send();
    }

    function normalsearch() {
        if (search_url != null) {
            var URL = search_url.replace("@search@", encodeURIComponent(search));
            update_tab(URL);
        }
    }

    function update_tab(URL) {
        var m = {
            loadReplace: replace,
            url: URL
        };
        if (tab_id != null) {
            chrome.tabs.update(tab_id, m);
        } else {
            chrome.tabs.update(m);
        }
    }

}
