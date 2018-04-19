# -*- coding: utf-8 -*-
# Copyright (c) 2017, Valiant Systems and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class Campaigns(Document):
        pass   
        
@frappe.whitelist()
def get_call_logs(name1):
        vicky = frappe.get_list('Call Log',
                fields=["name1", "is_official", "phone_no", "date", "duration", "call_type", "assigned", "branch"],
                filters = [
                ["name1", "=", name1]
                ]
                )
        n = len(vicky)        
        return vicky
        frappe.msgprint(_(vicky));

@frappe.whitelist()
def get_last_contacted_date(name):
        vicky = frappe.db.sql("""SELECT max(date) from `tabCall Log` where name1 =%s """, (name))
        n = len(vicky)        
        return vicky
        frappe.msgprint(_(vicky));


@frappe.whitelist()
def get_fresh_contacts(number):
        vicky = frappe.db.sql("""SELECT first_name, mobile_no from `tabContact` where last_contacted_date IS NULL LIMIT """+number+"""""")
        n = len(vicky)        
        return vicky
        frappe.msgprint(_(vicky));


@frappe.whitelist()
def get_contacts_before_specific_date(date, number):
        vicky = frappe.db.sql("""SELECT first_name, mobile_no, last_contacted_date from `tabContact` where last_contacted_date <%s LIMIT """+number+"""""", (date))
        n = len(vicky)        
        return vicky
        frappe.msgprint(_(vicky));


@frappe.whitelist()
def get_contacts_before_month(month, number):
        vicky = frappe.db.sql("""SELECT first_name, mobile_no, last_contacted_date from `tabContact` where month(last_contacted_date) <%s LIMIT """+number+"""""", (month))
        n = len(vicky)        
        return vicky
        frappe.msgprint(_(vicky));

@frappe.whitelist()
def get_contacts_before_day(day, number):
        vicky = frappe.db.sql("""SELECT first_name, mobile_no, last_contacted_date from `tabContact` where day(last_contacted_date) <=%s LIMIT """+number+"""""", (day))
        n = len(vicky)        
        return vicky
        frappe.msgprint(_(vicky));

@frappe.whitelist()
def get_contacts_before_week(week, number):
        vicky = frappe.db.sql("""SELECT first_name, mobile_no, datepart(week, last_contacted_date) from `tabContact` LIMIT """+number+"""""")
        n = len(vicky)        
        return vicky
        frappe.msgprint(_(vicky));



# ****************************************************----TO GET NUMBER OF CONTACTS AVAILABLE----******************************************************************************



@frappe.whitelist()
def get_fresh_contacts_number():
        vicky = frappe.db.sql("""SELECT  COUNT(*)  from `tabContact` where last_contacted_date IS NULL""")
        n = len(vicky)        
        return vicky
        frappe.msgprint(_(vicky));


@frappe.whitelist()
def get_contacts_before_specific_date_number(date):
        vicky = frappe.db.sql("""SELECT COUNT(*) from `tabContact` where last_contacted_date <%s""", (date))
        n = len(vicky)        
        return vicky
        frappe.msgprint(_(vicky));


@frappe.whitelist()
def get_contacts_before_month_number(month):
        vicky = frappe.db.sql("""SELECT COUNT(*) from `tabContact` where month(last_contacted_date) <%s""", (month))
        n = len(vicky)        
        return vicky
        frappe.msgprint(_(vicky));

@frappe.whitelist()
def get_contacts_before_day_number(day):
        vicky = frappe.db.sql("""SELECT COUNT(*) from `tabContact` where day(last_contacted_date) <=%s""", (day))
        n = len(vicky)        
        return vicky
        frappe.msgprint(_(vicky));

@frappe.whitelist()
def get_contacts_before_week_number(week):
        vicky = frappe.db.sql("""SELECT COUNT(*) from `tabContact`""")
        n = len(vicky)        
        return vicky
        frappe.msgprint(_(vicky));