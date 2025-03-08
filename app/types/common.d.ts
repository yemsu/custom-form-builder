export type StyleMap<T, K extends keyof T, V = string> = Record<
	NonNullable<T[K]>,
	V
>
