import Container from '~/components/common/Container'
import type { Route } from './+types/$surveyId.edit'
import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { loadForm } from '~/lib/formStorage'
import type { FormData } from '~/types/survey'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Edit Form | Custom Form Builder' },
		{ name: 'description', content: 'Edit custom forms quickly and easily!' }
	]
}

export default function Edit() {
	const { surveyId } = useParams()
	const [formData, setFormData] = useState<FormData | null>(null)
	const navigate = useNavigate()

	useEffect(() => {
		if (!surveyId) {
			alert('잘못된 접근입니다.')
			navigate('/')
			return
		}
		const savedFormData = loadForm(surveyId)
		if (!savedFormData) {
			alert('존재하지 않는 양식입니다.')
			navigate('/')
			return
		}
		setFormData(savedFormData)
	}, [surveyId])

	return (
		<Container>
			{formData && (
				<div>
					<input value={formData.title} />
					<input value={formData.description} />
					{formData.items?.map((item) => (
						<div key={item.id}>
							<p>{item.question}</p>
						</div>
					))}
				</div>
			)}
		</Container>
	)
}
