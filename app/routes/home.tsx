import { useNavigate } from 'react-router'
import Container from '~/components/common/Container'
import { createForm } from '~/lib/formStorage'
import type { Route } from './+types/home'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Custom Form Builder' },
		{ name: 'description', content: 'Create custom forms quickly and easily!' }
	]
}

export default function Home() {
	const navigate = useNavigate()

	const onClickCreateEmptyForm = () => {
		const newFormData = createForm()
		navigate(`${newFormData.id}/edit`)
	}

	return (
		<Container>
			<button
				className="bg-primary w-full p-4 hover:opacity-90"
				onClick={onClickCreateEmptyForm}
			>
				빈 양식 +
			</button>
		</Container>
	)
}
