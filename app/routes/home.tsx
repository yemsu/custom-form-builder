import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import Container from '~/components/common/Container'
import Section from '~/components/common/Section'
import Title from '~/components/common/Title'
import SurveyList from '~/components/survey/SurveyList'
import { generateTimeBasedId, getCreatedAt } from '~/lib/utils'
import useSurveyListStore from '~/store/surveyListStore'
import type { SurveyData } from '~/types/survey'
import type { Route } from './+types/home'
import useErrorStore from '~/store/errorStore'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Custom Form Builder' },
		{ name: 'description', content: 'Create custom forms quickly and easily!' }
	]
}

export default function Home() {
	const { surveyList, addSurvey, loadSurveyList, setIsLoading, setError } =
		useSurveyListStore()
	const { handleError } = useErrorStore()
	const navigate = useNavigate()

	useEffect(() => {
		try {
			loadSurveyList()
		} catch (e) {
			setError(e)
		}
		setIsLoading(false)
	}, [])

	const onClickCreateEmptyForm = () => {
		try {
			const newSurvey = createNewSurveyData()
			addSurvey(newSurvey)
			navigate(`${newSurvey.id}/edit`)
		} catch (e) {
			handleError(e)
		}
	}

	return (
		<Container>
			<Section>
				<Title>새 양식 만들기</Title>
				<ul className="grid grid-cols-6 gap-4">
					<li>
						<button
							className="bg-primary w-full rounded-md p-4 hover:opacity-90"
							onClick={onClickCreateEmptyForm}
						>
							빈 양식 +
						</button>
					</li>
				</ul>
			</Section>
			<Section>
				<Title>내 양식{surveyList && `(${surveyList.length})`}</Title>
				<SurveyList />
			</Section>
		</Container>
	)
}

function createNewSurveyData() {
	const newId = generateTimeBasedId('F')
	const newSurvey: SurveyData = {
		id: newId,
		title: '제목 없는 설문지',
		description: '설문지 설명',
		createdAt: getCreatedAt(),
		items: [
			{
				id: generateTimeBasedId('I'),
				question: '제목 없는 질문',
				answerType: 'radio',
				isRequired: false
			}
		]
	}
	return newSurvey
}
