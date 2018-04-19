// Copyright (c) 2017, Valiant Systems and contributors
// For license information, please see license.txt

frappe.provide('frappe.request');
frappe.request.url = '/';
frappe.request.ajax_count = 0;
frappe.request.waiting_for_ajax = [];

frappe.ui.form.on("Campaigns", "contacts_needed", function(frm) {
  if(frm.doc.available_contacts < frm.doc.contacts_needed)
  {
    cur_frm.set_value("contacts_needed", " ");
    frappe.throw(__("Current month reading cannot be less than previous month reading"));
  }
});

frappe.ui.form.on("Campaigns", "onload", function(frm) {
  cur_frm.fields_dict.contacts_needed.$input.on("keypress", function(evt) {
      var theEvent = evt || window.event;
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode( key );
      var regex = /[0-9]|\./;
      if( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
      }

  });

});

frappe.ui.form.on("Campaigns", "contact_type", function(frm) {
  if(frm.doc.contact_type == "Fresh Contact")
  {
              frappe.call({
              method: "lms.lms.doctype.campaigns.campaigns.get_fresh_contacts_number",
              args:   {
                          name1: frm.doc.first_name,
                          date: frm.doc.date,
                          month: frm.doc.month,
                      },
                      callback: function (r) {
                          if(r.message){
                        console.log(r.message);
                        cur_frm.set_value("available_contacts", r.message["0"]["0"]);                        
                          }
                          else if(!r.message)
                          {
                        cur_frm.set_value("available_contacts", " ");                        
                          }
                      }
            });
  }
  else 
  {
  cur_frm.set_value("available_contacts", " ");
  }
});

frappe.ui.form.on("Campaigns", "month", function(frm) {
          frappe.call({
          method: "lms.lms.doctype.campaigns.campaigns.get_contacts_before_month_number",
          args:   {
                      name1: frm.doc.first_name,
                      date: frm.doc.date,
                      month: frm.doc.month
                  },
                  callback: function (r) {
                    if(r.message){
                    cur_frm.set_value("available_contacts", r.message["0"]["0"]);                        
                      }
                      else if(!r.message)
                      {
                    cur_frm.set_value("available_contacts", " ");                        
                      }
                  }
        });
});

frappe.ui.form.on("Campaigns", "day", function(frm) {
          frappe.call({
          method: "lms.lms.doctype.campaigns.campaigns.get_contacts_before_day_number",
          args:   {
                      name1: frm.doc.first_name,
                      date: frm.doc.date,
                      month: frm.doc.month,
                      day: frm.doc.day
                  },
                  callback: function (r) {
                    if(r.message){
                    cur_frm.set_value("available_contacts", r.message.length);                        
                      }
                      else if(!r.message)
                      {
                    cur_frm.set_value("available_contacts", " ");                        
                      }
                  }
        });
});

frappe.ui.form.on("Campaigns", "date", function(frm) {
          frappe.call({
          method: "lms.lms.doctype.campaigns.campaigns.get_contacts_before_specific_date_number",
          args:   {
                      name1: frm.doc.first_name,
                      date: frm.doc.date,
                      month: frm.doc.month
                  },
                  callback: function (r) {
                    if(r.message){
                    cur_frm.set_value("available_contacts", r.message["0"]["0"]);                        
                      }
                      else if(!r.message)
                      {
                    cur_frm.set_value("available_contacts", " ");                        
                      }
                  }
        });
});



frappe.ui.form.on("Campaigns", "get_contacts", function(frm) {
  if(!frm.doc.contacts_needed)
  {
     frappe.throw(__("Please Enter the number of contacts you need!"));
  }
    else if (frm.doc.contact_type == "Fresh Contact") 
    {
          frappe.call({
          method: "lms.lms.doctype.campaigns.campaigns.get_fresh_contacts",
          args:   {
                      name1: frm.doc.first_name,
                      date: frm.doc.date,
                      month: frm.doc.month,
                      doctype: "Campaigns",
                      name: frm.doc.table_25,
                      number: parseInt(frm.doc.contacts_needed)
                  },
                  callback: function (r) {
                      console.log(r.message.length)
                      for(var i=0; i<parseInt(frm.doc.contacts_needed); i++)
                      {
                        frappe.model.add_child(cur_frm.doc, "Campaign Contact", "table_25");  
                        $.each(frm.doc.table_25 || [], function(i, v) {
                          frappe.model.set_value(v.doctype, v.name, "name1", r.message[i][0])
                          frappe.model.set_value(v.doctype, v.name, "phone_no", r.message[i][1])
                          frappe.model.set_value(v.doctype, v.name, "last_contacted_date", "Fresh Contact")                          
                        })
                        frm.refresh_field("table_25");
                      }
                  }
        });
    }
    else if (frm.doc.contact_type == "Used Contact" && frm.doc.specify_date == 1)
    {
          frappe.call({
          method: "lms.lms.doctype.campaigns.campaigns.get_contacts_before_specific_date",
          args:   {
                      name1: frm.doc.first_name,
                      date: frm.doc.date,
                      month: frm.doc.month,
                      number: parseInt(frm.doc.contacts_needed)
                  },
                  callback: function (r) {
                      for(var i=0; i<parseInt(frm.doc.contacts_needed); i++)
                      {
                        frappe.model.add_child(cur_frm.doc, "Campaign Contact", "table_25");  
                        $.each(frm.doc.table_25 || [], function(i, v) {
                          frappe.model.set_value(v.doctype, v.name, "name1", r.message[i][0])
                          frappe.model.set_value(v.doctype, v.name, "phone_no", r.message[i][1]) 
                          frappe.model.set_value(v.doctype, v.name, "last_contacted_date", r.message[i][2])                         
                        })
                        frm.refresh_field("table_25");
                      }
                  }
        });
    }
    else if (frm.doc.contact_type == "Used Contact" && frm.doc.before == "Month")
    {
          frappe.call({
          method: "lms.lms.doctype.campaigns.campaigns.get_contacts_before_month",
          args:   {
                      name1: frm.doc.first_name,
                      date: frm.doc.date,
                      month: frm.doc.month,
                      number: parseInt(frm.doc.contacts_needed)
                  },
                  callback: function (r) {
                      console.log(r.message.length)
                      for(var i=0; i<parseInt(frm.doc.contacts_needed); i++)
                      {
                        frappe.model.add_child(cur_frm.doc, "Campaign Contact", "table_25");  
                        $.each(frm.doc.table_25 || [], function(i, v) {
                          frappe.model.set_value(v.doctype, v.name, "name1", r.message[i][0])
                          frappe.model.set_value(v.doctype, v.name, "phone_no", r.message[i][1])
                          frappe.model.set_value(v.doctype, v.name, "last_contacted_date", r.message[i][2])                          
                        })
                        frm.refresh_field("table_25");
                      }
                  }
        });

    }
    else if (frm.doc.contact_type == "Used Contact" && frm.doc.before == "Day")
    {
          frappe.call({
          method: "lms.lms.doctype.campaigns.campaigns.get_contacts_before_day",
          args:   {
                      name1: frm.doc.first_name,
                      date: frm.doc.date,
                      month: frm.doc.month,
                      day: frm.doc.day,
                      number: parseInt(frm.doc.contacts_needed)
                  },
                  callback: function (r) {
                      console.log(r.message.length)
                      for(var i=0; i<parseInt(frm.doc.contacts_needed); i++)
                      {
                        frappe.model.add_child(cur_frm.doc, "Campaign Contact", "table_25");  
                        $.each(frm.doc.table_25 || [], function(i, v) {
                          frappe.model.set_value(v.doctype, v.name, "name1", r.message[i][0])
                          frappe.model.set_value(v.doctype, v.name, "phone_no", r.message[i][1])
                          frappe.model.set_value(v.doctype, v.name, "last_contacted_date", r.message[i][2])                        
                        })
                        frm.refresh_field("table_25");
                      }

                  }
        });
    }
});




// frappe.ui.form.on("Campaigns", "get_contacts", function(frm) {
//   if(!frm.doc.contacts_needed)
//   {
//      frappe.throw(__("Please Enter the number of contacts you need!"));
//   }
//     else if (frm.doc.contact_type == "Fresh Contact") 
//     {
//           frappe.call({
//           method: "lms.lms.doctype.campaigns.campaigns.get_fresh_contacts",
//           args:   {
//                       name1: frm.doc.first_name,
//                       date: frm.doc.date,
//                       month: frm.doc.month,
//                       doctype: "Campaigns",
//                       name: frm.doc.table_25
//                   },
//                   callback: function (r) {
//                       console.log(r.message.length)
//                     cur_frm.set_value("available_contacts", r.message.length);
//                     if(!frm.contacts_area) {
//                       var contacts_area = '<table><tr><th>Name</th><th>Phone No.</th></tr>\
//                       <style>table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}td,\
//                       th {border: 1px solid #dddddd;text-align: left;padding: 8px;}tr:nth-child(even) {background-color: #dddddd;}</style>';
//                       for(var i=0; i<parseInt(frm.doc.contacts_needed); i++){
//                      contacts_area+="<tr><td><a href='"+window.location.origin+"/desk#Form/Contact/"+r.message[i]["0"]+"'>\
//                      "+r.message[i]["0"]+"</a></td><td>"+r.message[i][1]+"</td></tr>";                    
                    
//                       }
//                       contacts_area+="</table>";
//                       $(".frappe-control[data-fieldname=contacts_html]").html(contacts_area);
//                      }

//                   }
//         });
//     }
//     else if (frm.doc.contact_type == "Used Contact" && frm.doc.specify_date == 1)
//     {
//           frappe.call({
//           method: "lms.lms.doctype.campaigns.campaigns.get_contacts_before_specific_date",
//           args:   {
//                       name1: frm.doc.first_name,
//                       date: frm.doc.date,
//                       month: frm.doc.month
//                   },
//                   callback: function (r) {
//                       console.log(r.message.length)
//                     cur_frm.set_value("available_contacts", r.message.length);
//                     if(!frm.contacts_area) {
//                       var contacts_area = '<table><tr><th>Name</th><th>Phone No.</th><th>Last Contacted Date</th></tr>\
//                       <style>table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}td,\
//                       th {border: 1px solid #dddddd;text-align: left;padding: 8px;}tr:nth-child(even) {background-color: #dddddd;}</style>';
//                       for(var i=0; i<parseInt(frm.doc.contacts_needed); i++){
//                      contacts_area+="<tr><td><a href='"+window.location.origin+"/desk#Form/Contact/"+r.message[i]["0"]+"'>\
//                      "+r.message[i]["0"]+"</a></td><td>"+r.message[i][1]+"</td><td>"+r.message[i][2]+"</td></tr>";                    
                    
//                       }
//                       contacts_area+="</table>";
//                       $(".frappe-control[data-fieldname=contacts_html]").html(contacts_area);
//                      }

//                   }
//         });
//     }
//     else if (frm.doc.contact_type == "Used Contact" && frm.doc.before == "Month")
//     {
//           frappe.call({
//           method: "lms.lms.doctype.campaigns.campaigns.get_contacts_before_month",
//           args:   {
//                       name1: frm.doc.first_name,
//                       date: frm.doc.date,
//                       month: frm.doc.month
//                   },
//                   callback: function (r) {
//                       console.log(r.message.length)
//                     cur_frm.set_value("available_contacts", r.message.length);
//                     if(!frm.contacts_area) {
//                       var contacts_area = '<table><tr><th>Name</th><th>Phone No.</th><th>Last Contacted Date</th></tr>\
//                       <style>table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}td,\
//                       th {border: 1px solid #dddddd;text-align: left;padding: 8px;}tr:nth-child(even) {background-color: #dddddd;}</style>';
//                       for(var i=0; i<parseInt(frm.doc.contacts_needed); i++){
//                      contacts_area+="<tr><td><a href='"+window.location.origin+"/desk#Form/Contact/"+r.message[i]["0"]+"'>\
//                      "+r.message[i]["0"]+"</a></td><td>"+r.message[i][1]+"</td><td>"+r.message[i][2]+"</td></tr>";                    
                    
//                       }
//                       contacts_area+="</table>";
//                       $(".frappe-control[data-fieldname=contacts_html]").html(contacts_area);
//                      }

//                   }
//         });

//     }
//     else if (frm.doc.contact_type == "Used Contact" && frm.doc.before == "Day")
//     {
//           frappe.call({
//           method: "lms.lms.doctype.campaigns.campaigns.get_contacts_before_day",
//           args:   {
//                       name1: frm.doc.first_name,
//                       date: frm.doc.date,
//                       month: frm.doc.month,
//                       day: frm.doc.day
//                   },
//                   callback: function (r) {
//                       console.log(r.message.length)
//                     cur_frm.set_value("available_contacts", r.message.length);
//                     if(!frm.contacts_area) {
//                       var contacts_area = '<table><tr><th>Name</th><th>Phone No.</th><th>Last Contacted Date</th></tr>\
//                       <style>table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}td,\
//                       th {border: 1px solid #dddddd;text-align: left;padding: 8px;}tr:nth-child(even) {background-color: #dddddd;}</style>';
//                       for(var i=0; i<parseInt(frm.doc.contacts_needed); i++){
//                      contacts_area+="<tr><td><a href='"+window.location.origin+"/desk#Form/Contact/"+r.message[i]["0"]+"'>\
//                      "+r.message[i]["0"]+"</a></td><td>"+r.message[i][1]+"</td><td>"+r.message[i][2]+"</td></tr>";                    
                    
//                       }
//                       contacts_area+="</table>";
//                       $(".frappe-control[data-fieldname=contacts_html]").html(contacts_area);
//                      }

//                   }
//         });
//     }
// });
