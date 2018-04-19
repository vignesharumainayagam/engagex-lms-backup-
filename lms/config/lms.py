from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		{
			"label": _("LMS"),
			"items": [
			    {
					"type": "doctype",
					"name": "Program"
				},
				 {
					"type": "doctype",
					"name": "Course"
				},
				{
					"type": "doctype",
					"name": "Chapter"
				},
				{
					"type": "doctype",
					"name": "Section"
				}
			]
		},
		{
			"label": _("Exams"),
			"items": [
    #              {
				# 	"type": "doctype",
				# 	"name": "Assessment Plan"
				# },
				# {
				# 	"type": "doctype",
				# 	"name": "Assessment Criteria"
				# },
				# {
				# 	"type": "doctype",
				# 	"name": "Examination Criteria"
				# },
				{
					"type": "doctype",
					"name": "Questions"
				},
				{
					"type": "doctype",
					"name": "Exam"
				},
				{
					"type": "doctype",
					"name": "Exam Result"
				},
			]
		}
		# {
		# 	"label": _("Additional"),
		# 	"items": [

		# 		{
		# 			"type": "doctype",
		# 			"name": "Assignment"
		# 		},
		# 		{
		# 			"type": "doctype",
		# 			"name": "Tasks"
		# 		},
		# 		{
		# 			"type": "doctype",
		# 			"name": "Time sheet"
		# 		},
		# 		{
		# 			"type": "page",
		# 			"name": "lms",
		# 			"label": _("LMS")
		# 		}

		# 	]
		# },
		# {
		# 	"label": _("Lead Management"),
		# 	"items": [

		# 		{
		# 			"type": "doctype",
		# 			"name": "Contact"
		# 		},
		# 		{
		# 			"type": "doctype",
		# 			"name": "Campaigns"
		# 		},
		# 		{
		# 			"type": "doctype",
		# 			"name": "Call Log"
		# 		},
		# 		{
		# 			"type": "doctype",
		# 			"name": "Lead"
		# 		}

		# 	]
		# }

	]