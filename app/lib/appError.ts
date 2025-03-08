import { ERROR_MESSAGE, ERROR_TYPE } from '~/constants/error'

export class AppError extends Error {
	type: keyof typeof ERROR_TYPE
	redirect: boolean

	constructor(
		type: keyof typeof ERROR_TYPE,
		message?: string,
		redirect?: boolean
	) {
		super(message || ERROR_MESSAGE[type]())
		this.type = type
		this.redirect = redirect ?? false
	}
}
