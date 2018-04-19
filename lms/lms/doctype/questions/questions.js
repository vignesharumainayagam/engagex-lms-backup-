// Copyright (c) 2017, Valiant Systems and contributors
// For license information, please see license.txt
frappe.ui.form.on('Questions', {
	
});


frappe.ui.form.on('Questions', {


	refresh: function(frm) {
		
	},
	onload: function(frm) {
	


	}
});

frappe.ui.form.on("Questions", "refresh", function(frm) { 
   	frm.set_query("course", function(doc, cdt, cdn) {
				return{
					query: "lms.lms.doctype.questions.questions.get_program_courses",
					filters: {
						'program': frm.doc.program
					}
				}
	});  
		frm.set_query("chapter", function(doc, cdt, cdn) {
				return{
					filters: {
						'course': frm.doc.course
					}
				}
	});  
			frm.set_query("section", function(doc, cdt, cdn) {
				return{
					filters: {
						'chapter': frm.doc.chapter
					}
				}
	});  
});