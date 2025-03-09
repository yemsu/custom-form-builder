const ALERTS = {
	SUCCESS: {
		DELETE_SURVEY: '양식이 삭제되었습니다.'
	},
	CONFIRM: {
		DELETE_SURVEY: (surveyTitle: string) =>
			`"${surveyTitle}"\n해당 양식을 삭제하시겠습니까? 삭제 후에는 복구할 수 없습니다.`,
		DELETE_QUESTION: (question: string) =>
			`"${question}"\n해당 질문을 삭제하시겠습니까? 삭제 후에는 복구할 수 없습니다.`
	}
}

export default ALERTS
