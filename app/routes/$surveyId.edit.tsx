import { useState } from 'react'
import Button from '~/components/common/Button'
import Container from '~/components/common/Container'
import Title from '~/components/common/Title'
import EditSurveyForm from '~/components/survey/EditSurveyForm'
import LiveSurveyPreview from '~/components/survey/LiveSurveyPreview'
import { SurveyFormProvider } from '~/contexts/SurveyFormContext'
import useLoadSurvey from '~/hooks/useLoadSurvey'

export function meta() {
	return [
		{ title: 'Edit Form | Custom Form Builder' },
		{ name: 'description', content: 'Edit custom forms quickly and easily!' }
	]
}

export default function Edit() {
	const [isOnPreview, setIsOnPreview] = useState(true)
	const [survey] = useLoadSurvey()

	const onClickTogglePreview = () => {
		setIsOnPreview(!isOnPreview)
	}

	return (
		<>
			{survey && (
				<SurveyFormProvider survey={survey}>
					<div className="flex">
						<Container>
							<div className="mb-4 flex items-center justify-between">
								<Title>양식 수정</Title>
								<Button size="sm" onClick={onClickTogglePreview}>
									👀 실시간 미리보기 {isOnPreview ? '닫기' : '열기'}
								</Button>
							</div>
							<EditSurveyForm survey={survey} />
						</Container>
						{isOnPreview && (
							<Container className="bg-white/5" scrollBox>
								<LiveSurveyPreview />
							</Container>
						)}
					</div>
				</SurveyFormProvider>
			)}
		</>
	)
}
