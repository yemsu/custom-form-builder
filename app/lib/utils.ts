export const cn = (...classNames: (string | undefined | null | boolean)[]) => {
	return classNames.filter((className) => className).join(' ')
}

export const generateTimeBasedId = (prefix: 'F' | 'I' = 'I') => {
	const timestamp = new Date().getTime()
	return `${prefix}${timestamp}`
}

export const getCreatedAt = () => {
	return new Date().toISOString()
}

export const typedObjectKeys = <T extends object>(obj: T): Array<keyof T> => {
	return Object.keys(obj) as Array<keyof T>
}
