import { useEffect } from 'react'
import Container from '~/components/common/Container'
import Section from '~/components/common/Section'
import Title from '~/components/common/Title'
import SurveyList from '~/components/survey/SurveyList'
import useSurveyListStore from '~/store/surveyListStore'
import type { Route } from './+types/home'
import TemplateList from '~/components/survey/TemplateList'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Custom Form Builder' },
		{ name: 'description', content: 'Create custom forms quickly and easily!' }
	]
}

export default function Home() {
	const { surveyList, loadSurveyList, setIsLoading, setError } =
		useSurveyListStore()

	useEffect(() => {
		try {
			loadSurveyList()
		} catch (e) {
			setError(e)
		}
		setIsLoading(false)
	}, [])

	return (
		<Container>
			<Section>
				<Title>새 양식 만들기</Title>
				<TemplateList />
			</Section>
			<Section>
				<Title>내 양식{surveyList && `(${surveyList.length})`}</Title>
				<SurveyList />
			</Section>
		</Container>
	)
}
