import { useState } from 'react'
import Container from '~/components/common/Container'
import Section from '~/components/common/Section'
import Title from '~/components/common/Title'
import SurveyPreview from '~/components/survey/preview/SurveyPreview'
import SurveyList from '~/components/survey/SurveyList'
import TemplateList from '~/components/survey/TemplateList'
import useLoadSurveyList from '~/hooks/useLoadSurveyList'
import type {
	SurveyData,
	SurveyFormData,
	SurveyTemplateData
} from '~/types/survey'
import type { Route } from './+types/home'
import Button from '~/components/common/Button'
import SurveyListItem from '~/components/survey/SurveyListItem'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Custom Form Builder' },
		{ name: 'description', content: 'Create custom forms quickly and easily!' }
	]
}

export type PreviewSurveyData = SurveyData | SurveyTemplateData | null
export type SetPreviewSurvey = React.Dispatch<
	React.SetStateAction<PreviewSurveyData>
>

export default function Home() {
	const [surveyList] = useLoadSurveyList()
	const [crrPreviewSurvey, setCrrPreviewSurvey] =
		useState<PreviewSurveyData>(null)

	return (
		<div className="flex">
			<Container className="relative">
				<Section>
					<Title>새 양식 만들기</Title>
					<TemplateList setCrrPreviewSurvey={setCrrPreviewSurvey} />
				</Section>
				<Section>
					<Title>내 양식 {surveyList && `(${surveyList.length})`}</Title>
					<SurveyList>
						{(survey) => (
							<SurveyListItem
								key={survey.id}
								survey={survey}
								crrPreviewSurvey={survey}
								setCrrPreviewSurvey={setCrrPreviewSurvey}
							/>
						)}
					</SurveyList>
				</Section>
				{crrPreviewSurvey && (
					<Button
						size="sm"
						className="absolute top-8 right-6"
						onClick={() => setCrrPreviewSurvey(null)}
					>
						미리보기 닫기
					</Button>
				)}
			</Container>
			{crrPreviewSurvey && (
				<Container className="relative bg-white/5" scrollBox>
					<SurveyPreview surveyFormData={crrPreviewSurvey} />
				</Container>
			)}
		</div>
	)
}
