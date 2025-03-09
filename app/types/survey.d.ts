export type SurveyData = {
	id: string
	title: string
	description: string
	createdAt: string
	items: QuestionData[]
}

export type QuestionData = {
	id: string
	question: string
	answerType: FormQuestionType
	isRequired: boolean
}

export type FormQuestionType =
	| 'input'
	| 'textarea'
	| 'radio'
	| 'checkbox'
	| 'dropdown'
