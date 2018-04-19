# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# License: GNU General Public License v3. See license.txt

from __future__ import unicode_literals
# import frappe
# from _future_ import unicode_literals
import frappe
import frappe.utils
from frappe.utils.oauth import get_oauth2_authorize_url, get_oauth_keys, login_via_oauth2, login_via_oauth2_id_token, login_oauth_user as _login_oauth_user, redirect_post_login
import json
from frappe import _
from frappe.auth import LoginManager
from frappe.integrations.doctype.ldap_settings.ldap_settings import get_ldap_settings
from frappe.utils.password import get_decrypted_password
from frappe.utils.html_utils import get_icon_html


no_cache = 1
no_sitemap = 1

@frappe.whitelist(allow_guest=False)
def get_context(context):
	if frappe.session.user == "Guest":
		frappe.local.flags.redirect_location = "/desk"
		raise frappe.Redirect
	# delimeter = make_route_string(frappe.form_dict)
	ExamId=frappe.form_dict.Exam
	questions=[]
	Answers=[]
	ExamMaster = frappe.db.get_all('Exam', fields=['test_name','duration','start_date','end_date','publish_result','multiple'],filters={'name':ExamId},limit_page_length=1)
	count=len(ExamMaster)
	if count==1:
		AllowMulitple=ExamMaster[0].multiple
		isAllow=1
		if AllowMulitple=="One":
			AlreadyResult = frappe.db.get_all('Exam Result', fields=['exam_id'],filters={'exam_id':ExamId,'student_name':frappe.session.user},limit_page_length=10)
			AlreadyResultCount=len(AlreadyResult)
			if AlreadyResultCount>=1:
				isAllow=0
		if isAllow==1:
			context.Duration=ExamMaster[0].duration
			context.PublishResult=ExamMaster[0].publish_result
			context.ExamId=ExamId
			ExamChild = frappe.db.get_all('Exam Child', fields=['chapter','question_type','no_of_question','difficulty_level'],filters={'parent':ExamId},limit_page_length=50)
			for item in ExamChild:
				chapterQuestions=frappe.db.sql('select name,question,question_type,mark,chapter from `tabQuestions` where chapter="'+item.chapter+'" and question_type="'+item.question_type+'" and difficulty_level="'+item.difficulty_level+'"  ORDER BY RAND() limit '+item.no_of_question)
				# chapterQuestions=frappe.db.get_all('Questions', fields=['name','question','question_type','mark'],limit_page_length=item.no_of_question)
				for Questionitem in chapterQuestions:
					questions.append(Questionitem)
			
			# questions = frappe.db.get_all('Questions', fields=['name','question','question_type','mark'],limit_page_length=100)
			for question in questions:
				QuestionAnswers=frappe.db.get_all('Answers', fields=['options','is_correct','name','parent'],filters={'parent':question[0]},limit_page_length=100)
				for Answer in QuestionAnswers:
					Answers.append(Answer)
			context.questions = questions
			context.userlog=frappe.session.user
			context.ExamChild=ExamChild
			context.Answers=Answers
		else:
			frappe.local.flags.redirect_location = "/404.html"
			raise frappe.Redirect
	else:
		frappe.local.flags.redirect_location = "/404.html"
		raise frappe.Redirect

	
	




