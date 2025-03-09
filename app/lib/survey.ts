import { generateTimeBasedId, getCreatedAt } from '~/lib/utils'
import type { QuestionData, SurveyData } from '~/types/survey'

export const createNewQuestionData: () => QuestionData = () => {
	return {
		id: generateTimeBasedId('I'),
		question: '제목 없는 질문',
		type: 'input',
		isRequired: false,
		options: null
	}
}

export const createNewSurveyData: () => SurveyData = () => {
	return {
		id: generateTimeBasedId('F'),
		title: '제목 없는 설문지',
		description: '설문지 설명',
		createdAt: getCreatedAt(),
		questions: [createNewQuestionData()]
	}
}
