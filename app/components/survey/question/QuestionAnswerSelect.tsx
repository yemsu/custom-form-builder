import Button from '~/components/common/Button'
import BaseInput from '~/components/form/BaseInput'
import { useSurveyForm } from '~/contexts/SurveyFormContext'
import { cn } from '~/lib/utils'
import type { SelectQuestionData } from '~/types/survey'

type QuestionAnswerSelectProps = {
	question: SelectQuestionData
	questionIndex: number
}

function QuestionAnswerSelect({
	question,
	questionIndex
}: QuestionAnswerSelectProps) {
	const { form, addQuestionOption, deleteQuestionOption } = useSurveyForm()
	const { register } = form

	return (
		<div>
			{question.options.map((option, i) => (
				<div key={option.id}>
					<label className="flex items-center gap-2">
						<OptionBullet type={question.type} i={i} />
						<BaseInput
							{...register(`questions.${questionIndex}.options.${i}.value`)}
						/>
						<Button
							size="sm"
							variant="ghost"
							onClick={() => deleteQuestionOption(questionIndex, option.id)}
						>
							삭제
						</Button>
					</label>
				</div>
			))}
			<div className="mt-2">
				<Button size="sm" onClick={() => addQuestionOption(questionIndex)}>
					옵션 추가
				</Button>
			</div>
		</div>
	)
}

function OptionBullet({
	type,
	i
}: {
	type: SelectQuestionData['type']
	i: number
}) {
	return (
		<span
			className={cn(
				'h-5 w-5 text-center',
				type !== 'dropdown' && 'border border-gray-500',
				type === 'radio' && 'rounded-full'
			)}
		>
			{type === 'dropdown' && i + 1}
		</span>
	)
}

export default QuestionAnswerSelect
