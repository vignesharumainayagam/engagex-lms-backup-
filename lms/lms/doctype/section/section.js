// Copyright (c) 2017, Valiant Systems and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Section", "refresh", function(frm) {	
//     cur_frm.set_query("course", function() {
//         return {
//             "filters": {
//                 "degree": (frm.doc.degree)
//             }
//         };
//     });   
// });
frappe.ui.form.on("Section", "refresh", function(frm) { 
    cur_frm.set_query("chapter", function() {
        return {
            "filters": {
                "course": frm.doc.course
            }
        };
    });   
});
// frappe.ui.form.on("Section", "refresh", function(frm) { 
//     cur_frm.set_query("chapter", function() {
//         return {
//             "filters": {
//                 "subject": (frm.doc.subject)
//             }
//         };
//     });   
// });
