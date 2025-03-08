import { useEffect, useState } from 'react'
import Title from '~/components/common/Title'
import SurveyListItem, {
	SurveyListItemSkeleton
} from '~/components/survey/SurveyListItem'
import { loadSurveyList } from '~/lib/surveyStorage'
import type { SurveyData } from '~/types/survey'

type SurveyListProps = {}

export default function SurveyList({}: SurveyListProps) {
	const [surveyList, setSurveyList] = useState<SurveyData[] | null>(null)

	useEffect(() => {
		const loadedSurveyList = loadSurveyList()
		setSurveyList(loadedSurveyList)
	}, [])

	return (
		<>
			<Title>내 양식{surveyList && `(${surveyList.length})`}</Title>
			{!surveyList && (
				<SurveyListSkeleton>
					<SurveyListItemSkeleton />
					<SurveyListItemSkeleton />
					<SurveyListItemSkeleton />
				</SurveyListSkeleton>
			)}
			{surveyList &&
				(surveyList.length > 0 ? (
					<ul className="grid grid-cols-5 gap-4">
						{surveyList.map((survey) => (
							<SurveyListItem
								key={survey.id}
								survey={survey}
								setSurveyList={setSurveyList}
							/>
						))}
					</ul>
				) : (
					<div className="flex h-[400px] items-center justify-center bg-white/10 p-6">
						<p className="text-gray-400">새 양식을 만들어보세요!</p>
					</div>
				))}
		</>
	)
}

export function SurveyListSkeleton({
	children
}: {
	children: React.ReactNode
}) {
	return <div className="grid grid-cols-5 gap-4">{children}</div>
}
