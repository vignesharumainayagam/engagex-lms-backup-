// Copyright (c) 2017, Valiant Systems and contributors
// For license information, please see license.txt

frappe.ui.form.on('Chapter', {
	refresh: function(frm) {

	}
});
// frappe.ui.form.on("Chapter", "refresh", function(frm) {	
//     cur_frm.set_query("course", function() {
//         return {
//             "filters": {
//                 "degree": (frm.doc.degree)
//             }
//         };
//     });   
// });
// frappe.ui.form.on("Chapter", "refresh", function(frm) { 
//     cur_frm.set_query("subject", function() {
//         return {
//             "filters": {
//                 "course": (frm.doc.course)
//             }
//         };
//     });   
// });
// frappe.ui.form.on("Chapter", "validate", function(frm) {
//     if (frm.doc.degree == "B.E" && frm.doc.course == "ECONOMICS","POLITICAL SCIENCE","Litrature" ) {
//         msgprint("Proceed Step By Step");
//         validated = false;
//     }
// });
