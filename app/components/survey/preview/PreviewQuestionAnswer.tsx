import BaseInput from '~/components/form/BaseInput'
import BaseOptionInput from '~/components/form/BaseOptionInput'
import BaseSelect from '~/components/form/BaseSelect'
import BaseTextarea from '~/components/form/BaseTextarea'
import type { QuestionData } from '~/types/survey'

type PreviewQuestionAnswerProps = {
	question: QuestionData
}

function PreviewQuestionAnswer({ question }: PreviewQuestionAnswerProps) {
	switch (question.type) {
		case 'input':
			return (
				<BaseInput
					id={`preview-${question.id}`}
					placeholder="답변을 입력해주세요."
				/>
			)
		case 'textarea':
			return (
				<BaseTextarea
					id={`preview-${question.id}`}
					placeholder="답변을 입력해주세요."
				/>
			)
		case 'checkbox':
			return question.options.map((option) => (
				<BaseOptionInput
					key={option.id}
					type="checkbox"
					id={`preview-${option.id}`}
					name={`preview-${question.id}`}
					label={option.value}
				/>
			))
		case 'radio':
			return question.options.map((option) => (
				<BaseOptionInput
					key={option.id}
					type="radio"
					id={`preview-${option.id}`}
					name={`preview-${question.id}`}
					label={option.value}
				/>
			))
		case 'dropdown':
			return <BaseSelect options={question.options} />
		default:
			return
	}
}

export default PreviewQuestionAnswer
