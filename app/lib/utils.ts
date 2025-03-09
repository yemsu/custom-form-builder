export const cn = (...classNames: (string | undefined | null)[]) => {
	return classNames.filter((className) => className).join(' ')
}

export const generateTimeBasedId = (prefix: 'F' | 'I' = 'I') => {
	const timestamp = new Date().getTime()
	return `${prefix}${timestamp}`
}

export const getCreatedAt = () => {
	return new Date().toISOString()
}
