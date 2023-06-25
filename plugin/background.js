chrome.webRequest.onBeforeRequest.addListener(
    function(info) {
        console.log(info);
        var url_s = info.url;
        var url = new URL(url_s);
        var search = null;
        //we dont want a bang to trigger bc qwant is giving us suggestions
        if(url_s.includes("qwant.com/v3/suggest")){
            return;
        }
        if (url_s.includes("startpage.com/do/")) {
           search = url.searchParams.get("query");;
        } else {
            search = url.searchParams.get("q");
          
        }
          console.log(search);
          match(url, search, info.tabId);
    },
    // filters
    {
        urls: [
            "http://www.google.com/search*",
            "http://www.google.co.jp/search*",
            "http://www.google.co.uk/search*",
            "http://www.google.es/search*",
            "http://www.google.ca/search*",
            "http://www.google.de/search*",
            "http://www.google.it/search*",
            "http://www.google.fr/search*",
            "http://www.google.com.au/search*",
            "http://www.google.com.tw/search*",
            "http://www.google.nl/search*",
            "http://www.google.com.br/search*",
            "http://www.google.com.tr/search*",
            "http://www.google.be/search*",
            "http://www.google.com.gr/search*",
            "http://www.google.co.in/search*",
            "http://www.google.com.mx/search*",
            "http://www.google.dk/search*",
            "http://www.google.com.ar/search*",
            "http://www.google.ch/search*",
            "http://www.google.cl/search*",
            "http://www.google.at/search*",
            "http://www.google.co.kr/search*",
            "http://www.google.ie/search*",
            "http://www.google.com.co/search*",
            "http://www.google.pl/search*",
            "http://www.google.pt/search*",
            "http://www.google.com.pk/search*",
            "https://www.google.com/search*",
            "https://www.google.co.jp/search*",
            "https://www.google.co.uk/search*",
            "https://www.google.es/search*",
            "https://www.google.ca/search*",
            "https://www.google.de/search*",
            "https://www.google.it/search*",
            "https://www.google.fr/search*",
            "https://www.google.com.au/search*",
            "https://www.google.com.tw/search*",
            "https://www.google.nl/search*",
            "https://www.google.com.br/search*",
            "https://www.google.com.tr/search*",
            "https://www.google.be/search*",
            "https://www.google.com.gr/search*",
            "https://www.google.co.in/search*",
            "https://www.google.com.mx/search*",
            "https://www.google.dk/search*",
            "https://www.google.com.ar/search*",
            "https://www.google.ch/search*",
            "https://www.google.cl/search*",
            "https://www.google.at/search*",
            "https://www.google.co.kr/search*",
            "https://www.google.ie/search*",
            "https://www.google.com.co/search*",
            "https://www.google.pl/search*",
            "https://www.google.pt/search*",
            "https://www.google.com.pk/search*",
            "https://*.startpage.com/do/dsearch*",
            "https://*.startpage.com/do/metasearch.pl*",
            "https://www.bing.com/search*",
            "https://*.ecosia.org/search*",
            "https://*.qwant.com/*"
        ]
    },
    // extraInfoSpec
    ["blocking"]);



function match(url, search, tab_id) {
     console.log("matching...");
    if(search != null){
     contains_possible_bang(search, function(b, raw_search, BANG){
     if(b){
        bang({
            srch: search,
            raw_srch: raw_search,
            rpl: false,
            bng: BANG
        }, tab_id);
    }
     });
    }
}



