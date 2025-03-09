import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Container from '~/components/common/Container'
import Section from '~/components/common/Section'
import Title from '~/components/common/Title'
import EditSurveyForm from '~/components/survey/EditSurveyForm'
import { ERROR_MESSAGE, ERROR_TYPE } from '~/constants/error'
import { SurveyFormProvider } from '~/contexts/SurveyFormContext'
import { AppError } from '~/lib/appError'
import useErrorStore from '~/store/errorStore'
import useSurveyListStore from '~/store/surveyListStore'
import type { SurveyData } from '~/types/survey'
import type { Route } from './+types/$surveyId.edit'
import SurveyPreview from '~/components/survey/preview/SurveyPreview'
import Button from '~/components/common/Button'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Edit Form | Custom Form Builder' },
		{ name: 'description', content: 'Edit custom forms quickly and easily!' }
	]
}

export default function Edit() {
	const { surveyList, isLoading, setIsLoading, loadSurveyList } =
		useSurveyListStore()
	const { handleError } = useErrorStore()
	const [survey, setSurvey] = useState<SurveyData | null>(null)
	const [isOnPreview, setIsOnPreview] = useState(true)
	const { surveyId = '' } = useParams()

	const onClickTogglePreview = () => {
		setIsOnPreview(!isOnPreview)
	}

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

	return (
		<>
			{survey && (
				<SurveyFormProvider survey={survey}>
					<div className="flex">
						<Container>
							<div className="mb-4 flex items-center justify-between">
								<Title>양식 수정</Title>
								<Button size="sm" onClick={onClickTogglePreview}>
									👀 실시간 미리보기 {isOnPreview ? '닫기' : '열기'}
								</Button>
							</div>
							<EditSurveyForm survey={survey} />
						</Container>
						{isOnPreview && (
							<Container className="bg-white/5">
								<SurveyPreview />
							</Container>
						)}
					</div>
				</SurveyFormProvider>
			)}
		</>
	)
}
