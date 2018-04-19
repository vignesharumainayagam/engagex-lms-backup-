# -*- coding: utf-8 -*-
# Copyright (c) 2015, Frappe Technologies and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
import json
from frappe import _
from frappe.model.mapper import get_mapped_doc
from frappe.utils import flt, cstr
from frappe.email.doctype.email_group.email_group import add_subscribers

def get_course(program):
	'''Return list of courses for a particular program
	:param program: Program
	'''
	courses = frappe.db.sql('''select course, course_name from `tabProgram Course` where parent=%s''',
			(program), as_dict=1)
	return courses


@frappe.whitelist()
def enroll_student(source_name):
	"""Creates a Student Record and returns a Program Enrollment.

	:param source_name: Student Applicant.
	"""
	frappe.publish_realtime('enroll_student_progress', {"progress": [1, 4]}, user=frappe.session.user)
	student = get_mapped_doc("Student Applicant", source_name,
		{"Student Applicant": {
			"doctype": "Student",
			"field_map": {
				"name": "student_applicant"
			}
		}}, ignore_permissions=True)
	student.save()
	program_enrollment = frappe.new_doc("Program Enrollment")
	program_enrollment.student = student.name
	program_enrollment.student_name = student.title
	program_enrollment.program = frappe.db.get_value("Student Applicant", source_name, "program")
	frappe.publish_realtime('enroll_student_progress', {"progress": [4, 4]}, user=frappe.session.user)	
	return program_enrollment

@frappe.whitelist()
def get_list_of_studentdetails(student):
	datas=frappe.db.sql("""SELECT pay_enrollment.student, pay_enrollment.name, pay_enrollment.program, pay_enrollment.academic_year, pay_enrollment.academic_term, pay_enrollment.student_batch_name, pay_enrollment.student_category FROM `tabStudent` as student INNER JOIN `tabProgram Enrollment` AS pay_enrollment ON student.name=pay_enrollment.student WHERE student.name=%s""",(student))
	# datas=frappe.get_list("Student Attendance", filters={"course_schedule": course_schedule})
	return datas
			
@frappe.whitelist()
def get_random_questions(ExamId):
	# questions = frappe.db.get_all('Questions', fields=['name','question','question_type','mark'],limit_page_length=100)
	# for item in questions:
	# 		item.options = frappe.db.get_all('Answers', fields=['options','is_correct','name'],filters={'parent':item.name},limit_page_length=100)
	# return questions
	questions=[]
	Answers=[]
	QuestionAnswers=[]
	WithAnswers=[]
	ExamMaster = frappe.db.get_all('Exam', fields=['test_name','duration','start_date','end_date','publish_result','multiple'],filters={'name':ExamId},limit_page_length=1)
	count=len(ExamMaster)
	if count==1:
		AllowMulitple=ExamMaster[0].multiple
		isAllow=1
		# if AllowMulitple=="Many":
		# 	AlreadyResult = frappe.db.get_all('Exam Result', fields=['exam_id'],filters={'exam_id':ExamId,'user':user},limit_page_length=10)
		# 	AlreadyResultCount=len(AlreadyResult)
		# 	if AlreadyResultCount>=1:
		# 		isAllow=0
 
		if isAllow==1:
			Duration=ExamMaster[0].duration
			PublishResult=ExamMaster[0].publish_result
			ExamId=ExamId
			ExamChild = frappe.db.get_all('Exam Child', fields=['chapter','question_type','no_of_question','difficulty_level'],filters={'parent':ExamId},limit_page_length=50)
			for item in ExamChild:
				# chapterQuestions=frappe.db.sql('select name,question,question_type,mark,chapter from `tabQuestions` where chapter="'+item.chapter+'" and question_type="'+item.question_type+'" and difficulty_level="'+item.difficulty_level+'"  ORDER BY RAND() limit '+item.no_of_question)
				# chapterQuestions=frappe.db.get_all('Questions', fields=['name','question','question_type','mark'],limit_page_length=item.no_of_question)
				chapterQuestions=frappe.db.get_all('Questions', filters={'chapter':item.chapter, 'question_type':item.question_type, 'difficulty_level':item.difficulty_level}, fields=['name','question','question_type','mark','negative_mark'],limit_page_length=item.no_of_question)
			
				for Questionitem in chapterQuestions:
                     
					Questionitem.QuestionAnswers=frappe.db.get_all('Answers', fields=['options','is_correct','name','parent'],filters={'parent':Questionitem.name})	
					questions.append(Questionitem)
			

			# foreach(chapterQuestions in Questionitem):
			# QuestionAnswers=frappe.db.get_all('Answers', fields=['options','is_correct','name','parent'],filters={'parent':Questionitem.parent})	
					
			
			# for question in questions:
			# 	QuestionAnswers=frappe.db.get_all('Answers', fields=['options','is_correct','name','parent'],filters={'parent':question[0]},limit_page_length=100)
			# 	for Answer in QuestionAnswers:
			# 		Answers.append(Answer)
			return questions
