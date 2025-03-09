import { Link } from 'react-router'
import Button from '~/components/common/Button'
import Title from '~/components/common/Title'
import ALERTS from '~/constants/alerts'
import { cn } from '~/lib/utils'
import type { PreviewSurveyData, SetPreviewSurvey } from '~/routes/home'
import useErrorStore from '~/store/errorStore'
import useSurveyListStore from '~/store/surveyListStore'
import type { SurveyData } from '~/types/survey'

type SurveyListItemProps = {
	survey: SurveyData
	crrPreviewSurvey: PreviewSurveyData
	setCrrPreviewSurvey: SetPreviewSurvey
}

const baseShapeStyle = 'rounded-md h-[100px]'

export default function SurveyListItem({
	survey,
	crrPreviewSurvey,
	setCrrPreviewSurvey
}: SurveyListItemProps) {
	const { deleteSurvey } = useSurveyListStore()
	const { handleError } = useErrorStore()

	const onClickDeleteSurvey = () => {
		const isConfirmed = confirm(ALERTS.CONFIRM.DELETE_SURVEY(survey.title))
		if (!isConfirmed) return
		try {
			deleteSurvey(survey.id)
			alert(ALERTS.SUCCESS.DELETE_SURVEY)
			if (crrPreviewSurvey?.id === survey.id) {
				setCrrPreviewSurvey(null)
			}
		} catch (e) {
			handleError(e)
		}
	}

	return (
		<li className={cn('relative')}>
			<Link
				to={`/${survey.id}/edit`}
				className={cn(
					'bg-primary/10 hover:bg-primary/20 hover:border-primary border-primary/50 block size-full border p-4',
					baseShapeStyle
				)}
				title={survey.title}
			>
				<Title h="h3" size="sm" className="line-clamp-1">
					{survey.title}
				</Title>
				<time
					dateTime={survey.createdAt}
					className="mt-2 line-clamp-1 text-xs text-gray-300"
				>
					{new Date(survey.createdAt).toLocaleString('ko-KR')}
				</time>
			</Link>
			<div className="absolute right-0 bottom-0 flex">
				<Button
					size="sm"
					variant="ghost"
					onClick={() => setCrrPreviewSurvey(survey)}
					title="양식 미리보기"
				>
					미리보기
				</Button>
				<Button
					size="sm"
					variant="ghost"
					onClick={() => onClickDeleteSurvey()}
					title="양식 삭제"
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
