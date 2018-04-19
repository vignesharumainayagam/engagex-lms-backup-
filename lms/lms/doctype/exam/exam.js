// Copyright (c) 2017, Valiant Systems and contributors
// For license information, please see license.txt

frappe.ui.form.on('Exam', {
	validate: function(frm) {
		 if ((frm.doc.save_to == "LMS" || frm.doc.save_to == "Exam")) {
			if(!(frm.doc.degree && frm.doc.course)){
				frappe.throw("Mandatory fields are empty")

			}

		  }
	},
	onload: function (frm) {
		if ((frm.doc.publish_result == "Publish From Admin") && (frm.doc.results_published == 0)) {
			frm.add_custom_button(__("Publish Result"), function() {
				frm.set_value("results_published", 1);
				frm.clear_custom_buttons();
				
				frappe.call({
				        method: "frappe.client.get_list",
				        args: {
				            doctype: "Exam Result",
				            fields: ["name"],
				            filters: {
								"exam_id": frm.doc.name,
							}

				        },
				        callback: function(r) 
				        {
				        	console.log(r.message)
				        	for (var i=0; i<r.message.length; i++) {
								frappe.call({
									method: "frappe.client.set_value",
									args: {
											doctype: "Exam Result",
											name: r.message[i].name,
											fieldname: "results_published",
											value: 1
		
									},
									callback: function(r) {
										frappe.msgprint("Results Have Been Successfully Published");
										cur_frm.save();
									}
								});

				        	}

				   		}
				        });

				

			})
		}
		else
		{
			return true
		}

	}
	
});

frappe.ui.form.on("Exam", "course", function(frm) {
return frappe.call({
			method: "lms.lms.doctype.exam.exam.get_chapter_list",
			args: {
				"course": frm.doc.course
			},
			callback: function(r) {
				console.log(r.message)
				 for(var e=0; e<r.message.length; e++){
					frappe.model.add_child(frm.doc, "Exam Child", "exam_child"); 
			        $.each(frm.doc.exam_child || [], function(e, v) {
			        frappe.model.set_value(v.doctype, v.name, "chapter", r.message[e].name)
			        })
			        frm.refresh_field("exam_child");			
				}

			}

		});

});


frappe.ui.form.on("Exam", "onload", function(frm) {



});
