import { useEffect } from 'react'
import useErrorStore from '~/store/errorStore'
import useSurveyListStore from '~/store/surveyListStore'

function useLoadSurveyList() {
	const { surveyList, isLoading, setIsLoading, loadSurveyList } =
		useSurveyListStore()
	const { handleError } = useErrorStore()

	useEffect(() => {
		if (isLoading) {
			try {
				loadSurveyList()
			} catch (e) {
				handleError(e)
			}
		}
		setIsLoading(false)
	}, [])

	return [surveyList]
}

export default useLoadSurveyList
