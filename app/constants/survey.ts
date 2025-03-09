import type { FormQuestionType } from '~/types/survey'

export const SURVEY_QUESTION_TYPES: Record<FormQuestionType, string> = {
	input: '단답형',
	textarea: '장문형',
	radio: '객관식',
	checkbox: '체크박스',
	dropdown: '드롭다운'
}
