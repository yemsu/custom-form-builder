import QuestionAnswerSelect from '~/components/survey/question/QuestionAnswerSelect'
import QuestionAnswerText from '~/components/survey/question/QuestionAnswerText'
import type { QuestionData } from '~/types/survey'

type QuestionAnswerProps = {
	question: QuestionData
	questionIndex: number
}

function QuestionAnswer({ question, questionIndex }: QuestionAnswerProps) {
	switch (question.type) {
		case 'input':
		case 'textarea':
			return <QuestionAnswerText question={question} />
		case 'radio':
		case 'checkbox':
		case 'dropdown':
			return (
				<QuestionAnswerSelect
					question={question}
					questionIndex={questionIndex}
				/>
			)
		default:
			return <div>알 수 없는 질문 유형입니다.</div>
	}
}

export default QuestionAnswer
