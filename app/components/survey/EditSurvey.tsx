import { useForm, type SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router'
import Button from '~/components/common/Button'
import BaseCheckBox from '~/components/form/BaseCheckBox'
import BaseInput from '~/components/form/BaseInput'
import BaseSelect from '~/components/form/BaseSelect'
import { SURVEY_QUESTION_TYPES } from '~/constants/survey'
import useErrorStore from '~/store/errorStore'
import useSurveyListStore from '~/store/surveyListStore'
import type { SurveyData } from '~/types/survey'

type EditSurveyProps = {
	survey: SurveyData
}

export type EditSurveyFormData = Omit<SurveyData, 'id' | 'createdAt'>

export default function EditSurvey({ survey }: EditSurveyProps) {
	const { updateSurvey } = useSurveyListStore()
	const { handleError } = useErrorStore()
	const navigate = useNavigate()
	const { id, createdAt, ...defaultValues } = survey

	const form = useForm<EditSurveyFormData>({
		defaultValues
	})
	const { register, handleSubmit } = form

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
			{survey.items?.map((item, i) => (
				<div
					key={item.id}
					className="flex flex-col gap-4 rounded-md border border-white/20 p-6 pt-4 not-first:mt-4"
				>
					<div className="flex gap-2">
						<BaseInput
							className="flex-1"
							{...register(`items.${i}.question`)}
						/>
						<BaseSelect
							className="shrink-0"
							dataMap={SURVEY_QUESTION_TYPES}
							{...register(`items.${i}.answerType`)}
						/>
					</div>
					<BaseCheckBox
						label="필수 항목"
						{...register(`items.${i}.isRequired`)}
					/>
				</div>
			))}
			<div className="mt-4 flex justify-center">
				<Button type="submit">수정 완료</Button>
			</div>
		</form>
	)
}
