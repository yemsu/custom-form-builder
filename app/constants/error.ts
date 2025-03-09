export const ERROR_TYPE = {
	FAILED_CREATE_SURVEY: 'FAILED_CREATE_SURVEY',
	FAILED_SAVE_SURVEY: 'FAILED_SAVE_SURVEY',
	FAILED_LOAD_SURVEY_LIST: 'FAILED_LOAD_SURVEY_LIST',
	FAILED_LOAD_SURVEY: 'FAILED_LOAD_SURVEY',
	FAILED_DELETE_SURVEY: 'FAILED_DELETE_SURVEY',
	CANNOT_FIND_SURVEY: 'CANNOT_FIND_SURVEY',
	FAILED_UPDATE_OPTION: 'FAILED_UPDATE_OPTION',
	UNKNOWN_QUESTION_TYPE: 'UNKNOWN_QUESTION_TYPE',
	UNKNOWN: 'UNKNOWN'
} as const

export const ERROR_MESSAGE: Record<
	keyof typeof ERROR_TYPE,
	(...args: string[]) => string
> = {
	FAILED_CREATE_SURVEY: () => '양식 생성에 실패하였습니다.',
	FAILED_SAVE_SURVEY: () => '양식 저장에 실패하였습니다.',
	FAILED_LOAD_SURVEY_LIST: () => '양식 리스트 로드에 실패하였습니다.',
	FAILED_LOAD_SURVEY: () => '양식 로드에 실패하였습니다.',
	FAILED_DELETE_SURVEY: () => '양식 삭제에 실패하였습니다.',
	CANNOT_FIND_SURVEY: (surveyId: string) =>
		`존재하지 않는 양식입니다. (id: ${surveyId})`,
	FAILED_UPDATE_OPTION: () => '옵션을 업데이트할 수 없는 항목입니다.',
	UNKNOWN_QUESTION_TYPE: () => '알 수 없는 질문 유형입니다.',
	UNKNOWN: () => '알 수 없는 에러입니다.'
}
