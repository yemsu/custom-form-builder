import Button from '~/components/common/Button'
import Title from '~/components/common/Title'
import PreviewQuestionAnswer from '~/components/survey/preview/PreviewQuestionAnswer'
import SectionBox from '~/components/survey/SectionBox'
import { useSurveyForm } from '~/contexts/SurveyFormContext'

type SurveyPreviewProps = {}

function SurveyPreview({}: SurveyPreviewProps) {
	const { form } = useSurveyForm()
	const { watch } = form
	const formData = watch()
	return (
		<div>
			<Title mb>실시간 미리보기</Title>
			<section>
				<SectionBox>
					<Title size="lg">{formData.title}</Title>
					<p>{formData.description}</p>
					{formData.questions.find((question) => question.isRequired) && (
						<p className="mt-2 text-xs text-red-400">
							* 표시는 필수 질문입니다
						</p>
					)}
				</SectionBox>
				{formData.questions.map((question) => (
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
