import { createContext, useContext, type ReactNode } from 'react'
import { useForm, type UseFormReturn } from 'react-hook-form'
import { ERROR_TYPE } from '~/constants/error'
import { createNewQuestionData } from '~/lib/survey'
import { generateTimeBasedId } from '~/lib/utils'
import useErrorStore from '~/store/errorStore'
import type { SurveyFormData, QuestionData, SurveyData } from '~/types/survey'

type SurveyFormContextType = {
	form: UseFormReturn<SurveyFormData>
	onChangeQuestionType: (question: QuestionData, index: number) => void
	addQuestionOption: (questionIndex: number) => void
	deleteQuestionOption: (questionIndex: number, optionId: string) => void
	addQuestion: () => void
	deleteQuestion: (questionId: string) => void
}

const SurveyFormContext = createContext<SurveyFormContextType | null>(null)

export function SurveyFormProvider({
	survey,
	children
}: {
	survey: SurveyData
	children: ReactNode
}) {
	const { id, createdAt, ...defaultValues } = survey
	const form = useForm<SurveyFormData>({
		defaultValues
	})
	const { handleError } = useErrorStore()
	const { setValue, getValues } = form

	const onChangeQuestionType = (question: QuestionData, index: number) => {
		const prevOptions = getValues(`questions.${index}.options`)
		switch (question.type) {
			case 'radio':
			case 'checkbox':
			case 'dropdown':
				setValue(
					`questions.${index}.options`,
					prevOptions || [{ id: generateTimeBasedId(), value: '옵션 1' }]
				)
				break
			default:
				prevOptions && setValue(`questions.${index}.options`, null)
		}
	}

	const addQuestion = () => {
		const newQuestionFormData = createNewQuestionData()
		const prevOptions = getValues(`questions`)
		setValue(`questions`, [...prevOptions, newQuestionFormData])
	}

	const deleteQuestion = (questionId: string) => {
		const prevOptions = getValues(`questions`)
		const questionsDeleted = prevOptions.filter(({ id }) => id !== questionId)
		setValue(`questions`, questionsDeleted)
	}

	const addQuestionOption = (questionIndex: number) => {
		const prevOptions = getValues(`questions.${questionIndex}.options`)
		if (prevOptions === null) {
			handleError(new Error(ERROR_TYPE.FAILED_UPDATE_OPTION))
			return
		}
		setValue(`questions.${questionIndex}.options`, [
			...prevOptions,
			{ id: generateTimeBasedId(), value: `옵션 ${prevOptions.length + 1}` }
		])
	}

	const deleteQuestionOption = (questionIndex: number, optionId: string) => {
		const prevOptions = getValues(`questions.${questionIndex}.options`)
		if (prevOptions === null) {
			handleError(new Error(ERROR_TYPE.FAILED_UPDATE_OPTION))
			return
		}
		const optionsDeleted = prevOptions.filter(({ id }) => id !== optionId)
		setValue(`questions.${questionIndex}.options`, optionsDeleted)
	}

	return (
		<SurveyFormContext.Provider
			value={{
				form,
				onChangeQuestionType,
				addQuestionOption,
				deleteQuestionOption,
				addQuestion,
				deleteQuestion
			}}
		>
			{children}
		</SurveyFormContext.Provider>
	)
}

export function useSurveyForm() {
	const context = useContext(SurveyFormContext)
	if (!context) {
		throw new Error(
			'useSurveyForm 은 SurveyFormProvider 내부에서만 사용가능합니다.'
		)
	}
	return context
}
