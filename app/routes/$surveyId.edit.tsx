import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Container from '~/components/common/Container'
import { loadSurvey } from '~/lib/surveyStorage'
import type { SurveyData } from '~/types/survey'
import type { Route } from './+types/$surveyId.edit'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Edit Form | Custom Form Builder' },
		{ name: 'description', content: 'Edit custom forms quickly and easily!' }
	]
}

export default function Edit() {
	const { surveyId } = useParams()
	const [survey, setSurvey] = useState<SurveyData | null>(null)
	const navigate = useNavigate()

	useEffect(() => {
		if (!surveyId) {
			alert('잘못된 접근입니다.')
			navigate('/')
			return
		}
		const savedSurvey = loadSurvey(surveyId)
		if (!savedSurvey) {
			alert('존재하지 않는 양식입니다.')
			navigate('/')
			return
		}
		setSurvey(savedSurvey)
	}, [surveyId])

	return (
		<Container>
			{survey && (
				<div>
					<input value={survey.title} />
					<input value={survey.description} />
					{survey.items?.map((item) => (
						<div key={item.id}>
							<p>{item.question}</p>
						</div>
					))}
				</div>
			)}
		</Container>
	)
}
