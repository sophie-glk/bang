function get_prefix(callback){
     chrome.storage.sync.get(['prefix'], function(result) {
      callback(result.prefix);});
}

function has_prefix(bang, prefix){
    if(prefix == "" || prefix == null || prefix == " "){
     prefix = "!";
    }
     if(bang[0] == prefix && bang[1] != "" && bang[1] != null){
         return true;
    }
    else{ return false;}
}

function contains_possible_bang(search, callback){
     get_prefix(function(prefix) {
    var b = false;
    var bang = "";
    var s = "";
    var words = search.split(" ");
   for (var i = 0; i < words.length; i++){
        word = words[i];
        if(has_prefix(word, prefix)){
            var rpl = word;
            if( words.length > 1){
            var space = " ";
            rpl = word + space;
            if(i > 0){
               rpl = space + word; 
            }
            }
            s = search.replace(rpl, "");
            b = true;
            bang = word;
            break;
        }
    }
    callback(b, s, bang);
     });
}
