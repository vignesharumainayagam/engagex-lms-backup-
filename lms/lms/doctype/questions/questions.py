# -*- coding: utf-8 -*-
# Copyright (c) 2017, Valiant Systems and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.utils import (validate_email_add)
from frappe.desk.reportview import get_match_cond, get_filters_cond
class Questions(Document):
	pass

@frappe.whitelist()
def get_chapter_list(course):
	chapterlist = frappe.get_all('Chapter', fields=['name'], filters = {'course': course})
	return chapterlist

@frappe.whitelist()
def get_section_list(chapter):
	sectionlist = frappe.get_all('Section', fields=['name'], filters = {'chapter': chapter})
	return sectionlist


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

@frappe.whitelist()
def get_items():
	array = []


	program = frappe.get_list("Program", 
										# filters={"docstatus": 0}, 
										fields=["program_name","program_code","name"], 
										limit_page_length= 200)



	course = frappe.get_list("Course", 
										# filters={"status": "Present", "docstatus": 1, "attendance_date": currentdate}, 
										fields=["course_name", "program","course_code","name"], 
										limit_page_length= 200)

	chapter = frappe.get_list("Chapter", 
										# filters={"status": "Absent", "docstatus": 1, "attendance_date": currentdate}, 
										fields=["chapter_name", "program", "course"], 
										limit_page_length= 200)

	section = frappe.get_list("Section", 
										# filters={"status": "On Leave", "docstatus": 1, "attendance_date": currentdate}, 
										fields=["section_name", "program", "course", "chapter"], 
										limit_page_length= 200)

	questions = frappe.get_list("Questions", 
										# filters={"docstatus": 0}, 
										fields=["name", "program", "course", "chapter", "section"], 
										limit_page_length= 200)



	array.append({"program": program, 
				 "course": course,"chapter": chapter,
				 "section": section, "questions": questions 
				 })

	return array



