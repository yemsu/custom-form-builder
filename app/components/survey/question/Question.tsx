import BaseCheckBox from '~/components/form/BaseCheckBox'
import BaseInput from '~/components/form/BaseInput'
import BaseSelect from '~/components/form/BaseSelect'
import QuestionAnswer from '~/components/survey/question/QuestionAnswer'
import { SURVEY_QUESTION_TYPES } from '~/constants/survey'
import { useSurveyForm } from '~/contexts/SurveyFormContext'
import type { QuestionData } from '~/types/survey'

type QuestionProps = {
	question: QuestionData
	questionIndex: number
}

function Question({ question, questionIndex }: QuestionProps) {
	const { form, onChangeQuestionType } = useSurveyForm()
	const { register } = form

	return (
		<div
			key={question.id}
			className="flex flex-col gap-4 rounded-md border border-white/20 p-6 pt-4 not-first:mt-4"
		>
			<div className="flex gap-2">
				<BaseInput
					className="flex-1"
					{...register(`questions.${questionIndex}.question`)}
				/>
				<BaseSelect
					className="shrink-0"
					dataMap={SURVEY_QUESTION_TYPES}
					{...register(`questions.${questionIndex}.type`, {
						onChange: () => {
							onChangeQuestionType(question, questionIndex)
						}
					})}
				/>
			</div>
			<QuestionAnswer question={question} questionIndex={questionIndex} />
			<BaseCheckBox
				label="필수 항목"
				{...register(`questions.${questionIndex}.isRequired`)}
			/>
		</div>
	)
}

export default Question
