chrome.runtime.onMessage.addListener(function(request, sender) {
    bang(request);
});

function bang(request) {
    var search = request.srch;
     var bang = search.split(" ")[0];
    var raw_search =search.substr(bang.length).trim();
    var search_url = request.srch_url;
    if (search != null && search != "") {
        chrome.storage.sync.get(['bangs'], function(result) {
            var i;
            var bangs = null;
            if (result.bangs != null) {
                bangs = JSON.parse(result.bangs);
            }

            if (bangs != null && bangs.length != 0) {

                for (i = 0; i < bangs.length; i++) {
                  var bang_alias = bangs[i].bang.split(" ");
                    for(j = 0; j < bang_alias.length; j++){
                    if (bang == "!" + bang_alias[j]) {
                        var URL = (bangs[i].url).replace("@search@",  encodeURIComponent(raw_search));
                        chrome.tabs.update({
                            url: URL
                        });
                    } else {
                        if (i + 1 == bangs.length) {
                            checklocal();
                        }
                    }
                }
                }
            } else if (search != null && search != "") {
                checklocal();


            }

        });
    } 

    function checklocal(){
            var url = chrome.runtime.getURL('bangs.json');
            var req = new XMLHttpRequest();
            req.responseType = 'json';
            req.open('GET', url, true);
            req.onload = function() {
                var found = false;
                var banglist = req.response;
                for (var i = 0; i < banglist.length; i++) {
                    if (banglist[i][0] == bang) {
                        console.log("using local list");
                        chrome.tabs.update({
                            url: banglist[i][1].replace("bang",  encodeURIComponent(raw_search))
                        });
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    ddg();
                    }

                };
                req.send(null);
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

                            chrome.tabs.update({
                                url: "https://www.duckduckgo.com/?q=" +  encodeURIComponent(search)
                            });
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
                    var URL = search_url.replace("@search@",  encodeURIComponent(search));
                    chrome.tabs.update({
                        url: URL
                    });
                }
            }
        }
