import ALERTS from '~/constants/alerts'
import { generateTimeBasedId } from '~/lib/utils'
import type { FormData } from '~/types/survey'

const FORM_STORAGE = 'MY_FORMS'

export const createForm = () => {
	const newFormData = createNewFormData()
	const savedData = loadSurveyList() || []
	localStorage.setItem(
		FORM_STORAGE,
		JSON.stringify([...savedData, newFormData])
	)
	return newFormData
}

export const saveForm = (formData: FormData) => {
	localStorage.setItem(FORM_STORAGE, JSON.stringify(formData))
	alert(ALERTS.SUCCESS.SAVE_FORM)
}

export const loadSurveyList = () => {
	const savedStrData = localStorage.getItem(FORM_STORAGE)
	return savedStrData ? (JSON.parse(savedStrData) as FormData[]) : null
}

export const loadForm = (surveyId: FormData['id']) => {
	const savedSurveyList = loadSurveyList()
	if (!savedSurveyList) {
		alert(ALERTS.ERROR.NO_SAVED_FORM_LIST_DATA)
		return
	}
	const resultForm = savedSurveyList.find(({ id }) => id === surveyId)
	if (!resultForm) {
		alert(ALERTS.ERROR.CANNOT_FIND_ID_FORM)
	}
	return resultForm
}

export const deleteForm = (surveyId: FormData['id']) => {
	const isConfirmed = confirm(ALERTS.CONFIRM.DELETE_FORM)
	if (!isConfirmed) return

	const savedSurveyList = loadSurveyList()
	if (!savedSurveyList) {
		alert(ALERTS.ERROR.NO_SAVED_FORM_LIST_DATA)
		return
	}
	const SurveyListResult = savedSurveyList.filter(({ id }) => id !== surveyId)
	localStorage.setItem(FORM_STORAGE, JSON.stringify(SurveyListResult))
	alert(ALERTS.SUCCESS.DELETE_FORM)
	return SurveyListResult
}

function createNewFormData() {
	const newId = generateTimeBasedId('F')
	const newFormData: FormData = {
		id: newId,
		title: '제목 없는 설문지',
		description: '설문지 설명',
		createdAt: new Date().toISOString(),
		items: [
			{
				id: generateTimeBasedId('I'),
				question: '제목 없는 질문',
				answerType: 'radio',
				value: '',
				isRequired: false
			}
		]
	}
	return newFormData
}
