import Button from '~/components/common/Button'
import BaseInput from '~/components/form/BaseInput'
import BaseOptionInput from '~/components/form/BaseOptionInput'
import BaseSelect from '~/components/form/BaseSelect'
import QuestionAnswer from '~/components/survey/question/QuestionAnswer'
import SectionBox from '~/components/survey/SectionBox'
import ALERTS from '~/constants/alerts'
import { SURVEY_QUESTION_TYPES } from '~/constants/survey'
import { useSurveyForm } from '~/contexts/SurveyFormContext'
import { typedObjectKeys } from '~/lib/utils'
import type { QuestionData } from '~/types/survey'

type QuestionProps = {
	question: QuestionData
	questionIndex: number
}

function Question({ question, questionIndex }: QuestionProps) {
	const { form, onChangeQuestionType, deleteQuestion } = useSurveyForm()
	const { register } = form

	const onClickDeleteQuestion = () => {
		const isConfirmed = confirm(
			ALERTS.CONFIRM.DELETE_QUESTION(question.question)
		)
		if (!isConfirmed) return
		deleteQuestion(question.id)
	}

	return (
		<SectionBox key={question.id} className="relative">
			<div className="flex gap-2">
				<BaseInput
					className="flex-1"
					{...register(`questions.${questionIndex}.question`)}
				/>
				<BaseSelect
					className="shrink-0"
					options={typedObjectKeys(SURVEY_QUESTION_TYPES).map((type) => ({
						id: type,
						value: SURVEY_QUESTION_TYPES[type]
					}))}
					{...register(`questions.${questionIndex}.type`, {
						onChange: () => {
							onChangeQuestionType(question, questionIndex)
						}
					})}
				/>
			</div>
			<QuestionAnswer question={question} questionIndex={questionIndex} />
			<BaseOptionInput
				type="checkbox"
				label="필수 항목"
				{...register(`questions.${questionIndex}.isRequired`)}
			/>
			<Button
				variant="ghost"
				size="sm"
				className="absolute right-2 bottom-2"
				onClick={() => onClickDeleteQuestion()}
			>
				질문 삭제
			</Button>
		</SectionBox>
	)
}

export default Question
