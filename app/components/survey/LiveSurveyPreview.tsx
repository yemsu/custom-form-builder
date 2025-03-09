import SurveyPreview from '~/components/survey/preview/SurveyPreview'
import { useSurveyForm } from '~/contexts/SurveyFormContext'

function LiveSurveyPreview() {
	const { form } = useSurveyForm()
	const { watch } = form
	const surveyFormData = watch()
	return <SurveyPreview surveyFormData={surveyFormData} />
}

export default LiveSurveyPreview
