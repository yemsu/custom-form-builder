import Button from '~/components/common/Button'
import Title from '~/components/common/Title'
import { deleteSurvey } from '~/lib/surveyStorage'
import { cn } from '~/lib/utils'
import type { SurveyData } from '~/types/survey'

type SurveyListItemProps = {
	survey: SurveyData
	setSurveyList: React.Dispatch<React.SetStateAction<SurveyData[] | null>>
}

const baseShapeStyle = 'rounded-md h-[80px]'

export default function SurveyListItem({
	survey,
	setSurveyList
}: SurveyListItemProps) {
	const onClickDeleteForm = (surveyId: SurveyData['id']) => {
		const newSurveyList = deleteSurvey(surveyId)
		if (!newSurveyList) return
		setSurveyList(newSurveyList)
	}

	return (
		<li className={cn('border-primary relative border', baseShapeStyle)}>
			<a
				href={`/${survey.id}/edit`}
				className="bg-primary/10 hover:bg-primary/30 block w-full p-4"
			>
				<Title h="h3" size="sm">
					{survey.title}
				</Title>
				<time dateTime={survey.createdAt} className="text-xs text-gray-300">
					{new Date(survey.createdAt).toLocaleString('ko-KR')}
				</time>
			</a>
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
