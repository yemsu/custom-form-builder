import Button from '~/components/common/Button'
import Title from '~/components/common/Title'
import PreviewQuestionAnswer from '~/components/survey/preview/PreviewQuestionAnswer'
import SectionBox from '~/components/survey/SectionBox'
import type { SurveyFormData } from '~/types/survey'

type SurveyPreviewProps = {
	surveyFormData: SurveyFormData
}

function SurveyPreview({ surveyFormData }: SurveyPreviewProps) {
	const { title, description, questions } = surveyFormData
	return (
		<div>
			<Title mb>미리보기</Title>
			<section>
				<SectionBox>
					<Title size="lg">{title}</Title>
					<p>{description}</p>
					{questions.find((question) => question.isRequired) && (
						<p className="mt-2 text-xs text-red-400">
							* 표시는 필수 질문입니다
						</p>
					)}
				</SectionBox>
				{questions.map((question) => (
					<SectionBox key={question.id}>
						<Title h="h3" size="sm">
							{question.question}
							{question.isRequired && <span className="text-red-400"> * </span>}
						</Title>
						<PreviewQuestionAnswer question={question} />
					</SectionBox>
				))}
				<div className="mt-4 flex justify-center">
					<Button disabled>제출</Button>
				</div>
			</section>
		</div>
	)
}

export default SurveyPreview
