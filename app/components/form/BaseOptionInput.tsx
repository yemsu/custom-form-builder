import type { InputHTMLAttributes, Ref } from 'react'

export type BaseOptionInputProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'type'
> & {
	ref?: Ref<HTMLInputElement>
	type: 'radio' | 'checkbox'
	label: string
}

export default function BaseOptionInput({
	type,
	label,
	className = '',
	...restProps
}: BaseOptionInputProps) {
	return (
		<label className="flex gap-2">
			<input {...restProps} type={type} />
			<span>{label}</span>
		</label>
	)
}
