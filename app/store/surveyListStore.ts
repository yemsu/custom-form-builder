import { create } from 'zustand'
import { ERROR_MESSAGE, ERROR_TYPE } from '~/constants/error'
import { AppError } from '~/lib/appError'
import { getCreatedAt } from '~/lib/utils'
import type { SurveyFormData, SurveyData } from '~/types/survey'

interface SurveyListState {
	surveyList: SurveyData[]
	surveyListSearched: SurveyData[] | null
	isLoading: boolean
	errorMessage: string | null
	setSurveyListSearched: (surveyListSearched: SurveyData[] | null) => void
	setIsLoading: (isLoading: boolean) => void
	setError: (error: unknown) => void
	loadSurveyList: () => void
	addSurvey: (survey: SurveyData) => void
	updateSurvey: (surveyId: string, surveyFormData: SurveyFormData) => void
	deleteSurvey: (surveyId: string) => void
}

const FORM_STORAGE = 'MY_FORMS'

const useSurveyListStore = create<SurveyListState>()((set, get) => ({
	surveyList: [],
	surveyListSearched: null,
	isLoading: true,
	errorMessage: null,
	setSurveyListSearched: (surveyListSearched) => {
		set(() => ({ surveyListSearched }))
	},
	setIsLoading: (isLoading) => {
		set(() => ({ isLoading }))
	},
	setError: (error) => {
		set(() => ({ errorMessage: (error as Error).message }))
	},
	loadSurveyList: () => {
		try {
			const savedStrData = localStorage.getItem(FORM_STORAGE)
			const surveyList = savedStrData
				? (JSON.parse(savedStrData) as SurveyData[])
				: []

			set(() => ({ surveyList }))
		} catch (e) {
			throw new AppError(ERROR_TYPE.FAILED_LOAD_SURVEY_LIST)
		}
	},
	addSurvey: (survey) => {
		try {
			const surveyList = get().surveyList
			const newSurveyList = [...surveyList]
			newSurveyList.unshift(survey)

			localStorage.setItem(FORM_STORAGE, JSON.stringify(newSurveyList))

			set(() => ({ surveyList: newSurveyList }))
		} catch (e) {
			throw new AppError(ERROR_TYPE.FAILED_CREATE_SURVEY)
		}
	},
	updateSurvey: (surveyId, surveyFormData) => {
		const surveyList = get().surveyList || []
		const targetSurvey = surveyList.find(({ id }) => id === surveyId)
		if (!targetSurvey) {
			throw new AppError(
				ERROR_TYPE.CANNOT_FIND_SURVEY,
				ERROR_MESSAGE.CANNOT_FIND_SURVEY(surveyId)
			)
		}

		try {
			const newSurveyList = get().surveyList.map((survey) =>
				survey.id === surveyId
					? {
							...survey,
							...surveyFormData,
							createdAt: getCreatedAt()
						}
					: survey
			)
			localStorage.setItem(FORM_STORAGE, JSON.stringify(newSurveyList))
			set(() => ({ surveyList: newSurveyList }))
		} catch (e) {
			throw new AppError(ERROR_TYPE.FAILED_SAVE_SURVEY)
		}
	},
	deleteSurvey: (surveyId) => {
		const surveyList = get().surveyList || []
		const targetSurvey = surveyList.find(({ id }) => id === surveyId)
		if (!targetSurvey) {
			throw new AppError(
				ERROR_TYPE.CANNOT_FIND_SURVEY,
				ERROR_MESSAGE.CANNOT_FIND_SURVEY(surveyId)
			)
		}

		try {
			const surveyListFiltered = surveyList.filter(({ id }) => id !== surveyId)
			localStorage.setItem(FORM_STORAGE, JSON.stringify(surveyListFiltered))

			set(() => ({ surveyList: surveyListFiltered }))
		} catch (e) {
			throw new AppError(ERROR_TYPE.FAILED_DELETE_SURVEY)
		}
	}
}))

export default useSurveyListStore
