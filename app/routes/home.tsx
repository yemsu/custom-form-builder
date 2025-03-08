import { useNavigate } from 'react-router'
import Container from '~/components/common/Container'
import Title from '~/components/common/Title'
import SurveyList from '~/components/survey/SurveyList'
import { createSurvey } from '~/lib/surveyStorage'
import type { Route } from './+types/home'
import Section from '~/components/common/Section'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Custom Form Builder' },
		{ name: 'description', content: 'Create custom forms quickly and easily!' }
	]
}

export default function Home() {
	const navigate = useNavigate()

	const onClickCreateEmptyForm = () => {
		const newSurvey = createSurvey()
		navigate(`${newSurvey.id}/edit`)
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
				<SurveyList />
			</Section>
		</Container>
	)
}
