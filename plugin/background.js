chrome.webRequest.onBeforeRequest.addListener(
    function(info) {
        var url = info.url;
        var vars = getUrlVars(url);
        if (url.includes("startpage.com/do/dsearch")) {
            var search = vars["query"];
            match(url, search);
        } else {
            var search = vars["q"];
            match(url, search);
        }
    },
    // filters
    {
        urls: [
            "https://www.google.com/search?*",
            "https://*.startpage.com/do/dsearch*"
        ]
    },
    // extraInfoSpec
    ["blocking"]);



function match(url, search) {
    if (search[0] == "!") {
        console.log("Is probably a bang");
        bang({
            srch: search.replace("%20", " ")
        });
    }


}

function getUrlVars(url) {
    var vars = {};
    var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}
