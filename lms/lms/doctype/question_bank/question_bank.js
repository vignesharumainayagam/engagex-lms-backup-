// Copyright (c) 2018, Valiant Systems and contributors
// For license information, please see license.txt

frappe.ui.form.on('Question Bank', {

	refresh: function(frm) {
      //    frm.add_custom_button(__("Approve"), function() {
			// 	frm.set_value("application_status", "Approved");
			// 	frm.save_or_update();
			// })	
	  }
});

frappe.ui.form.on("Question Bank", "hid", function(frm) {
	// cur_frm.toggle_field("mark", false);
	frm.toggle_display("mark", false);

})

frappe.ui.form.on("Question", "more_hide", function(frm) {
	frm.toggle_display("option_5", false);
	frm.toggle_display("option_6", false);
	// frm.toggle_display("option_1", false)
	// cur_frm.toggle_field("option_1", false);
	// frappe.call({
	// method: "sfit.sfit.doctype.schedules.schedules.reset",
	// args: {
 //            name: frm.doc.member
 //                    },
	// callback: function (r) 
	// {
		 // alert("siva")
	// }
 //            })
 // cur_frm.fields.forEach(function(l){ 
  // cur_frm.set_df_property("option_5", "hidden", 0);
  // cur_frm.set_df_property("option_6", "hidden", 0);
  // })                                                                                                           cur_frm.fields.forEach(function(l){ 
 	// cur_frm.set_df_property(l.wrapper.title, "read_only", 1); })
 // cur_frm.set_df_property("option_5", "hidden"==0);
})