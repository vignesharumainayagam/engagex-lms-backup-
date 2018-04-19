# -*- coding: utf-8 -*-
# Copyright (c) 2017, Valiant Systems and contributors
# For license information, please see license.txt
from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe import _
from frappe.desk.form.linked_with import get_linked_doctypes	

class Section(Document):
	pass

@frappe.whitelist()
def get_chapter_list(course):
	chapterlist = frappe.get_all('Chapter', fields=['name'], filters = {'course': course})
        return chapterlist
