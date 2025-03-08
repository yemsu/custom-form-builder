import { create } from 'zustand'
import { ERROR_TYPE } from '~/constants/error'
import { AppError } from '~/lib/appError'
import type { SurveyData } from '~/types/survey'

interface SurveyListState {
	surveyList: SurveyData[]
	isLoading: boolean
	errorMessage: string | null
	setIsLoading: (isLoading: boolean) => void
	setError: (error: unknown) => void
	loadSurveyList: () => void
	addSurvey: (survey: SurveyData) => void
	deleteSurvey: (surveyId: string) => void
}

const FORM_STORAGE = 'MY_FORMS'

const useSurveyListStore = create<SurveyListState>()((set, get) => ({
	surveyList: [],
	isLoading: true,
	errorMessage: null,
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
			const newSurveyList = [...surveyList, survey]
			localStorage.setItem(FORM_STORAGE, JSON.stringify(newSurveyList))

			set(() => ({ surveyList: newSurveyList }))
		} catch (e) {
			throw new AppError(ERROR_TYPE.FAILED_SAVE_SURVEY)
		}
	},
	deleteSurvey: (surveyId) => {
		try {
			const surveyList = get().surveyList || []
			const targetSurvey = surveyList.find(({ id }) => id === surveyId)
			if (!targetSurvey) throw new AppError(ERROR_TYPE.CANNOT_FIND_SURVEY)

			const surveyListFiltered = surveyList.filter(({ id }) => id !== surveyId)
			localStorage.setItem(FORM_STORAGE, JSON.stringify(surveyListFiltered))

			set(() => ({ surveyList: surveyListFiltered }))
		} catch (e) {
			if (e instanceof AppError) {
				throw e
			}
			throw new AppError(ERROR_TYPE.FAILED_DELETE_SURVEY)
		}
	}
}))

export default useSurveyListStore
