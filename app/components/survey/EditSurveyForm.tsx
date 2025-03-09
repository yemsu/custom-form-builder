import { useEffect } from 'react'
import { type SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router'
import Button from '~/components/common/Button'
import BaseInput from '~/components/form/BaseInput'
import Question from '~/components/survey/question/Question'
import SectionBox from '~/components/survey/SectionBox'
import { useSurveyForm } from '~/contexts/SurveyFormContext'
import useErrorStore from '~/store/errorStore'
import useSurveyListStore from '~/store/surveyListStore'
import type { SurveyData, SurveyFormData } from '~/types/survey'

type EditSurveyFormProps = {
	survey: SurveyData
}

export default function EditSurveyForm({ survey }: EditSurveyFormProps) {
	const { updateSurvey } = useSurveyListStore()
	const { handleError } = useErrorStore()
	const navigate = useNavigate()
	const { form, addQuestion } = useSurveyForm()
	const { register, handleSubmit, watch, formState } = form
	const questions = watch('questions')

	const onSubmit: SubmitHandler<SurveyFormData> = (data) => {
		try {
			updateSurvey(survey.id, data)
			navigate('/')
		} catch (e) {
			handleError(e)
		}
	}

	const handleBeforeUnload = (e: BeforeUnloadEvent) => {
		if (formState.isDirty) {
			e.preventDefault()
			return true
		}
	}

	useEffect(() => {
		window.addEventListener('beforeunload', handleBeforeUnload)
		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload)
		}
	}, [formState.isDirty])

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<SectionBox>
				<BaseInput className="w-full" sizeVariant="lg" {...register('title')} />
				<BaseInput className="w-full" {...register('description')} />
			</SectionBox>
			{questions.map((question, i) => (
				<Question key={question.id} question={question} questionIndex={i} />
			))}
			<button
				type="button"
				className="mt-4 h-14 w-full rounded-md border border-white/20 hover:border-white/50"
				onClick={addQuestion}
			>
				+ 질문 추가
			</button>
			<div className="mt-4 flex justify-center">
				<Button type="submit">수정 완료</Button>
			</div>
		</form>
	)
}
