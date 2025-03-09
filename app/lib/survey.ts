import { generateTimeBasedId } from '~/lib/utils'
import type { QuestionData } from '~/types/survey'

export const createNewQuestionData: () => QuestionData = () => {
	return {
		id: generateTimeBasedId('I'),
		question: '제목 없는 질문',
		type: 'input',
		isRequired: false,
		options: null
	}
}
