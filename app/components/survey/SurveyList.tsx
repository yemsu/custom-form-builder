import SurveyListItem, {
	SurveyListItemSkeleton
} from '~/components/survey/SurveyListItem'
import useSurveyListStore from '~/store/surveyListStore'

type SurveyListProps = {}

export default function SurveyList({}: SurveyListProps) {
	const { surveyList, isLoading, errorMessage } = useSurveyListStore()

	if (isLoading) {
		return (
			<SurveyListSkeleton>
				<SurveyListItemSkeleton />
				<SurveyListItemSkeleton />
				<SurveyListItemSkeleton />
			</SurveyListSkeleton>
		)
	}

	if (errorMessage) {
		return (
			<div className="flex h-[400px] items-center justify-center bg-white/10 p-6">
				<p className="text-gray-400">{errorMessage}</p>
			</div>
		)
	}

	if (surveyList.length === 0) {
		return (
			<div className="flex h-[400px] items-center justify-center bg-white/10 p-6">
				<p className="text-gray-400">새 양식을 만들어보세요!</p>
			</div>
		)
	}

	return (
		<ul className="grid grid-cols-5 gap-4">
			{surveyList.map((survey) => (
				<SurveyListItem key={survey.id} survey={survey} />
			))}
		</ul>
	)
}

export function SurveyListSkeleton({
	children
}: {
	children: React.ReactNode
}) {
	return <div className="grid grid-cols-5 gap-4">{children}</div>
}
