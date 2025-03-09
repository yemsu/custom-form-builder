import { cn } from '~/lib/utils'
import type { StyleMap } from '~/types/common'
import type { TextQuestionData } from '~/types/survey'

type QuestionAnswerTextProps = {
	question: TextQuestionData
}

const textType: StyleMap<TextQuestionData['type']> = {
	input: '단답형',
	textarea: '장문형'
}

function QuestionAnswerText({ question }: QuestionAnswerTextProps) {
	return (
		<div
			className={cn(
				'h-input-h-md leading-input-h-md px-2 text-sm text-gray-500',
				'border-b border-dashed border-gray-500',
				question.type === 'input' && 'w-1/2'
			)}
		>
			{textType[question.type]} 텍스트
		</div>
	)
}

export default QuestionAnswerText
