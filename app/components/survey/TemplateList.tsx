import { useNavigate } from 'react-router'
import surveyTemplates from '~/lib/surveyTemplates'
import { cn, generateTimeBasedId, getCreatedAt } from '~/lib/utils'
import useErrorStore from '~/store/errorStore'
import useSurveyListStore from '~/store/surveyListStore'
import type { SurveyData } from '~/types/survey'

type TemplateListProps = {}

function TemplateList({}: TemplateListProps) {
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
				<li key={surveyTemplate.id}>
					<button
						className="hover:border-primary h-full w-full rounded-md border border-gray-500 p-4 text-sm"
						onClick={() => onClickCreateSurvey(surveyTemplate)}
					>
						{surveyTemplate.id === 'empty' ? '빈 양식' : surveyTemplate.title}
					</button>
				</li>
			))}
		</ul>
	)
}

export default TemplateList
