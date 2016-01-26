tinymce.PluginManager.add('autocorrection', function (editor, url) {
//    var param = editor.getParam('on');
    var arr = Array();
    
    editor.on('keypress click', function (e) {
        if (((this.last == ' ') && (this.postlast == '.')) ||
            ((this.last == ' ') && (this.postlast == '!')) ||
            ((this.last == ' ') && (this.postlast == '?'))) 
        {
            this.postlast = 0;
            this.last = 0;
            
            if ((e.charCode > 47 && e.charCode < 123) || // english symbols
                (e.charCode > 0x00c0 && e.charCode < 0x0ff) || //french symbols
                (e.charCode > 1039 && e.charCode < 1106)) {    // Russian symbols
                insertChar(e.key.toUpperCase());
            }
            
            return false;
        }
        this.postlast = this.last;
        this.last = e.key;
    });

    function insertChar(chr) {
        editor.fire('insertCustomChar', {
            chr: chr
        }).chr;
        editor.execCommand('mceInsertContent', false, chr);
    }
});