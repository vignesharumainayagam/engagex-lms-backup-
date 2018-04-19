
frappe.pages['lms'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'LMS',
		single_column: true
	});
	page.add_menu_item("Contact", () => frappe.set_route('List', 'Contact'))
	page.add_menu_item("Campaigns", () => frappe.set_route('List', 'Campaigns'))
	page.add_menu_item("Call Log", () => frappe.set_route('List', 'Call Log'))
	page.add_menu_item("Lead", () => frappe.set_route('List', 'Lead'));
	console.log(page)
}


