# -*- coding: utf-8 -*-
# Copyright (c) 2017, Valiant Systems and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.desk.reportview import get_match_cond, get_filters_cond

class Exam(Document):
	pass


@frappe.whitelist()
def get_chapter_list(course):
	chapterlist = frappe.get_all('Chapter', fields=['name'], filters = {'course': course})
        return chapterlist

@frappe.whitelist()
def get_course_list(program):
	courselist = frappe.get_all('Program Course', fields=['course',' course_name'], filters = {'parent': program})
        return courselist

@frappe.whitelist()
def get_program_courses(doctype, txt, searchfield, start, page_len, filters):
	if filters.get('program'):
		return frappe.db.sql("""select course, course_name from `tabProgram Course`
			where  parent = %(program)s and course like %(txt)s {match_cond}
			order by
				if(locate(%(_txt)s, course), locate(%(_txt)s, course), 99999),
				idx desc,
				`tabProgram Course`.course asc
			limit {start}, {page_len}""".format(
				match_cond=get_match_cond(doctype),
				start=start,
				page_len=page_len), {
					"txt": "%{0}%".format(txt),
					"_txt": txt.replace('%', ''),
					"program": filters['program']
				})

