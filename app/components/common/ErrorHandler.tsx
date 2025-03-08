import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import Button from '~/components/common/Button'
import useErrorStore from '~/store/errorStore'

export default function ErrorHandler() {
	const { error, clearError } = useErrorStore()
	const navigate = useNavigate()

	const onClickClose = () => {
		clearError()
	}

	useEffect(() => {
		if (error && error.redirect) {
			navigate('/error', {
				state: {
					type: error.type,
					message: error.message
				},
				replace: false
			})
			clearError()
		}
	}, [error])

	if (!error || error.redirect) return

	return (
		<div className="absolute right-6 bottom-6 z-50 flex items-center gap-4 rounded-md border border-gray-500 bg-gray-900 p-6">
			<p>❗ {error.message}</p>
			<Button size="sm" onClick={onClickClose}>
				닫기
			</Button>
		</div>
	)
}
