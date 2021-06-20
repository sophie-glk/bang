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
    var words = search.split(prefix);
            if(words.length > 1){
            var pb = words[1].split(" ");
            var word = prefix + pb[0];
            if( word != null && word.length > 1){
            var space = " ";
            var rpl = space + word;
            if(words.length == 2 && pb.length == 1){
            rpl = word;    
            }
            
            else if(words[0] ==  ""){
               rpl = word + space; 
            }
            s = search.replace(rpl, "");
            b = true;
            bang = word;
            }
            }
    callback(b, s, bang);
     });
}
