import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { ERROR_MESSAGE, ERROR_TYPE } from '~/constants/error'
import useLoadSurveyList from '~/hooks/useLoadSurveyList'
import { AppError } from '~/lib/appError'
import useErrorStore from '~/store/errorStore'
import useSurveyListStore from '~/store/surveyListStore'
import type { SurveyData } from '~/types/survey'

function useLoadSurvey() {
	const { surveyId = '' } = useParams()
	const { isLoading } = useSurveyListStore()
	const [surveyList] = useLoadSurveyList()
	const { handleError } = useErrorStore()
	const [survey, setSurvey] = useState<SurveyData | null>(null)

	useEffect(() => {
		if (isLoading) return
		const savedSurvey = surveyList.find(({ id }) => id === surveyId)
		if (!savedSurvey) {
			handleError(
				new AppError(
					ERROR_TYPE.CANNOT_FIND_SURVEY,
					ERROR_MESSAGE[ERROR_TYPE.CANNOT_FIND_SURVEY](surveyId),
					true
				)
			)
			return
		}
		setSurvey(savedSurvey)
	}, [surveyId, surveyList])

	return [survey]
}

export default useLoadSurvey
