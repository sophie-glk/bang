function restore_options() {
    chrome.storage.sync.get(['bangs', 'prefix'], function(result) {
        if (result.prefix != null) {
            document.getElementById("prefix").value = result.prefix;

        }
        if (result.bangs != null) {
            var bangs = JSON.parse(result.bangs);
            var i;
            for (i = 0; i < bangs.length; i++) {
                addline(bangs[i].bang, bangs[i].url, i);
            }
        }
    });
}

function addline(bang, url, i) {

    var p = document.getElementById("prefix").value;
    var prefix = "!";
    if (p != "" && p != null) {
        prefix = p;
    }
    var list = document.getElementById("list");
    var d = document.createElement("div");
    d.id = "d" + i;
    var exl = document.createTextNode(prefix + " ");
    var space = document.createTextNode(" ");
    var br = document.createElement("br");
    var button = document.createElement("button");
    button.innerHTML = '-';
    button.id = "bu" + i;
    button.addEventListener("click", function(event) {
        var i = event.target.id.replace("bu", "");
        document.getElementById("d" + i).outerHTML = "";

    });

    var inpb = document.createElement("input");
    inpb.value = bang;
    inpb.style = "width:21%"
    inpb.classList.add("bang");
    inpb.id = "ba" + i;


    var inpu = document.createElement("input");
    inpu.value = url;
    inpu.style = "width:60.5%";
    inpu.classList.add("url");
    inpu.id = "u" + i;

    d.appendChild(exl);
    d.appendChild(inpb);
    d.appendChild(space);
    d.appendChild(inpu);
    d.appendChild(space);
    d.appendChild(button);
    d.appendChild(br);
    list.appendChild(d);
}

function save_options() {

    var bangs = document.getElementsByClassName("bang");
    var urls = document.getElementsByClassName("url");
    var prefix = document.getElementById("prefix").value[0];
    var i;
    var ba = [];
    for (i = 0; i < bangs.length; i++) {
        var x = bangs[i].value;
        var y = urls[i].value;
        if (x != "" && y != "") {
            var bang = {
                "bang": x,
                "url": y
            }
            ba.push(bang);
        }
    }
    var save = JSON.stringify(ba);
    chrome.storage.sync.set({
        "bangs": save,
        "prefix": prefix

    });

    location.reload();
}

function update_banglist() {
    chrome.runtime.sendMessage({
        update: true
    }, function(response) {
        alert("OK");
    });

}

function import_settings() {
    var inp = document.getElementById('import_input');
    inp.click();
    inp.addEventListener('change', function(e) {
        var reader = new FileReader();
        reader.onload = function(e) {
            try {
                var st = JSON.parse(this.result);
                if (st.ddb) {
                    chrome.storage.sync.set({
                        "bangs": st.bangs,
                        "prefix": st.prefix

                    });
                    location.reload();
                }
            } catch (e) {
                console.log(e);
            }
        };
        reader.readAsText(this.files[0]);


    });
}

function export_settings() {
    chrome.storage.sync.get(['bangs', 'prefix'], function(result) {
        var output = {
            "bangs": result.bangs,
            "prefix": result.prefix,
            "ddb": true
        };
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(output));
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "settings.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    });
}


document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('review').addEventListener('click', function() {
    window.open("https://addons.mozilla.org/en-US/firefox/addon/tt7753bang/");
});
document.getElementById('bug').addEventListener('click', function() {
    window.open("https://github.com/sophie-glk/bang/issues");
});
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('import').addEventListener('click', import_settings);
document.getElementById('export').addEventListener('click', export_settings);
document.getElementById('update').addEventListener('click', update_banglist)
document.getElementById('add').addEventListener('click', function() {
    addline("", "", document.getElementsByClassName("bang").length);
});
