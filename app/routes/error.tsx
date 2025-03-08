import { useLocation } from 'react-router'
import type { Route } from './+types/error'
import Container from '~/components/common/Container'
import Title from '~/components/common/Title'
import Button from '~/components/common/Button'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Error | Custom Form Builder' },
		{ name: 'description', content: 'Error' }
	]
}

export default function Error() {
	const location = useLocation()
	const { type, message } = location.state

	return (
		<Container>
			<div className="flex flex-col items-center gap-4 py-12 text-center">
				<Title size="lg">{type}</Title>
				<p>{message || '관리자에게 문의해주세요.'}</p>
				<Button href="/">메인으로 가기</Button>
			</div>
		</Container>
	)
}
