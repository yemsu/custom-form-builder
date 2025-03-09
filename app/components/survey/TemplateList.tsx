import { useNavigate } from 'react-router'
import Button from '~/components/common/Button'
import surveyTemplates from '~/lib/surveyTemplates'
import { generateTimeBasedId, getCreatedAt } from '~/lib/utils'
import type { SetPreviewSurvey } from '~/routes/home'
import useErrorStore from '~/store/errorStore'
import useSurveyListStore from '~/store/surveyListStore'
import type { SurveyData } from '~/types/survey'

type TemplateListProps = {
	setCrrPreviewSurvey: SetPreviewSurvey
}

function TemplateList({ setCrrPreviewSurvey }: TemplateListProps) {
	const { addSurvey } = useSurveyListStore()
	const { handleError } = useErrorStore()
	const navigate = useNavigate()

	const onClickCreateSurvey = (
		surveyTemplate: Omit<SurveyData, 'createdAt'>
	) => {
		try {
			const newSurvey = {
				...surveyTemplate,
				id: generateTimeBasedId(),
				createdAt: getCreatedAt()
			}
			addSurvey(newSurvey)
			navigate(`${newSurvey.id}/edit`)
		} catch (e) {
			handleError(e)
		}
	}

	return (
		<ul className="grid grid-cols-6 gap-4">
			{surveyTemplates.map((surveyTemplate) => (
				<li key={surveyTemplate.id} className="relative h-[75px]">
					<button
						className="hover:border-primary size-full rounded-md border border-gray-500 p-4 pb-8 text-sm"
						onClick={() => onClickCreateSurvey(surveyTemplate)}
					>
						{surveyTemplate.id === 'empty' ? '빈 양식' : surveyTemplate.title}
					</button>
					<div className="absolute right-0 bottom-0 flex">
						<Button
							size="sm"
							variant="ghost"
							onClick={() => setCrrPreviewSurvey(surveyTemplate)}
							title="양식 미리보기"
						>
							미리보기
						</Button>
					</div>
				</li>
			))}
		</ul>
	)
}

export default TemplateList
