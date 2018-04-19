// Copyright (c) 2017, Valiant Systems and contributors
// For license information, please see license.txt

frappe.ui.form.on('Call Log', {
	refresh: function(frm) {

	}
});


frappe.ui.form.on("Call Log", "refresh", function(frm) {
  debugger;
  var file=frm.doc.audio_file;
  var full_url;
  if(file!=undefined){
  		var token;
        
        debugger;
        var url = 'https://firebasestorage.googleapis.com/v0/b/erp-call-log.appspot.com/o/audio%2F' + file;
        $.get(url).success(function(argument) {
            console.log(argument);
            console.log(argument.downloadTokens);
            token = argument.downloadTokens;
            full_url = url + '?alt=media&token=' + token;
            console.log(full_url);
            
        })

	    frm.add_custom_button(__("Play Call Recording"), function() {
	    	var myplayer=window.open("","Play Recording","width=360,height=100,left=400,top=200");
	    	myplayer.document.write('<html><body><head><title>Recording</title></head><body><audio controls style="margin-top: 20px;margin-left: 15px;"><source src= "'+full_url+'" type="audio/mpeg"></audio></body></html>');
	    });
	}
});