import { type SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router'
import Button from '~/components/common/Button'
import BaseInput from '~/components/form/BaseInput'
import Question from '~/components/survey/question/Question'
import { useSurveyForm } from '~/contexts/SurveyFormContext'
import useErrorStore from '~/store/errorStore'
import useSurveyListStore from '~/store/surveyListStore'
import type { SurveyData } from '~/types/survey'

type EditSurveyFormProps = {
	survey: SurveyData
}

export type EditSurveyFormData = Omit<SurveyData, 'id' | 'createdAt'>

export default function EditSurveyForm({ survey }: EditSurveyFormProps) {
	const { updateSurvey } = useSurveyListStore()
	const { handleError } = useErrorStore()
	const navigate = useNavigate()
	const { form } = useSurveyForm()
	const { register, handleSubmit, watch } = form
	const questions = watch('questions')

	const onSubmit: SubmitHandler<EditSurveyFormData> = (data) => {
		try {
			updateSurvey(survey.id, data)
			navigate('/')
		} catch (e) {
			handleError(e)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="flex flex-col gap-4 rounded-md border border-white/20 p-6 pt-4 not-first:mt-4">
				<BaseInput className="w-full" sizeVariant="lg" {...register('title')} />
				<BaseInput className="w-full" {...register('description')} />
			</div>
			{questions.map((question, i) => (
				<Question key={question.id} question={question} questionIndex={i} />
			))}
			<div className="mt-4 flex justify-center">
				<Button type="submit">수정 완료</Button>
			</div>
		</form>
	)
}
