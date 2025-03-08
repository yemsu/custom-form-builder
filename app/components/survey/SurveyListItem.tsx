import { Link } from 'react-router'
import Button from '~/components/common/Button'
import Title from '~/components/common/Title'
import ALERTS from '~/constants/alerts'
import { cn } from '~/lib/utils'
import useErrorStore from '~/store/errorStore'
import useSurveyListStore from '~/store/surveyListStore'
import type { SurveyData } from '~/types/survey'

type SurveyListItemProps = {
	survey: SurveyData
}

const baseShapeStyle = 'rounded-md h-[80px]'

export default function SurveyListItem({ survey }: SurveyListItemProps) {
	const { deleteSurvey } = useSurveyListStore()
	const { handleError } = useErrorStore()

	const onClickDeleteForm = (surveyId: SurveyData['id']) => {
		const isConfirmed = confirm(ALERTS.CONFIRM.DELETE_FORM)
		if (!isConfirmed) return
		try {
			deleteSurvey(surveyId)
			alert(ALERTS.SUCCESS.DELETE_FORM)
		} catch (e) {
			handleError(e)
		}
	}

	return (
		<li className={cn('border-primary relative border', baseShapeStyle)}>
			<Link
				to={`/${survey.id}/edit`}
				className="bg-primary/10 hover:bg-primary/30 block w-full p-4"
			>
				<Title h="h3" size="sm">
					{survey.title}
				</Title>
				<time dateTime={survey.createdAt} className="text-xs text-gray-300">
					{new Date(survey.createdAt).toLocaleString('ko-KR')}
				</time>
			</Link>
			<div className="absolute right-0 bottom-0 flex justify-end">
				<Button
					size="sm"
					variant="ghost"
					onClick={() => onClickDeleteForm(survey.id)}
				>
					삭제
				</Button>
			</div>
		</li>
	)
}

export function SurveyListItemSkeleton() {
	return <div className={cn('bg-skeleton', baseShapeStyle)}></div>
}
