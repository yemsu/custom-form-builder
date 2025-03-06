export const cn = (...classNames: (string | undefined | null)[]) => {
	return classNames.filter((className) => className).join(' ')
}

export const generateTimeBasedId = (prefix: 'F' | 'I') => {
	const timestamp = new Date().getTime()
	const randomStr = Math.random().toString(36).substring(2, 8)
	return `${prefix}${timestamp}-${randomStr}`
}
