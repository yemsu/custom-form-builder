import { create } from 'zustand'
import { ERROR_TYPE } from '~/constants/error'
import { AppError } from '~/lib/appError'

interface ErrorState {
	error: {
		type: keyof typeof ERROR_TYPE
		message: string
		redirect?: boolean
	} | null
	handleError: (error: unknown) => void
	clearError: () => void
}

const useErrorStore = create<ErrorState>()((set) => ({
	error: null,
	handleError: (error) => {
		let newError: ErrorState['error'] = {
			type: ERROR_TYPE.UNKNOWN,
			message: (error as Error).message,
			redirect: false
		}
		if (error instanceof AppError) {
			newError = {
				type: error.type,
				message: error.message,
				redirect: error.redirect
			}
		}
		set(() => ({ error: newError }))
	},
	clearError: () => set({ error: null })
}))

export default useErrorStore
