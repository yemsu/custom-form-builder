export type SurveyData = {
	id: string
	title: string
	description: string
	createdAt: string
	items?: FormItem[]
}

export type FormItem = {
	id: string
	question: string
	answerType: FormAnswerType
	value: string
	isRequired: boolean
}

export type FormAnswerType =
	| 'input'
	| 'textarea'
	| 'radio'
	| 'checkbox'
	| 'dropdown'
