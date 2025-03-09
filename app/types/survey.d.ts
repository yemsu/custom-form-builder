export type SurveyData = {
	id: string
	title: string
	description: string
	createdAt: string
	questions: QuestionData[]
}

type CommonQuestionData = {
	id: string
	question: string
	isRequired: boolean
}

export type TextQuestionData = CommonQuestionData & {
	type: 'input' | 'textarea'
	options: null
}

export type SelectQuestionData = CommonQuestionData & {
	type: 'radio' | 'checkbox' | 'dropdown'
	options: { id: string; value: string }[]
}

export type QuestionData = TextQuestionData | SelectQuestionData

export type QuestionType =
	| 'input'
	| 'textarea'
	| 'radio'
	| 'checkbox'
	| 'dropdown'

export type SurveyFormData = Omit<SurveyData, 'id' | 'createdAt'>

export type SurveyTemplateData = Omit<SurveyData, 'createdAt'>
