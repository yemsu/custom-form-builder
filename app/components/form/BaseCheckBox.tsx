import type { InputHTMLAttributes, Ref } from 'react'

export type BaseCheckBoxProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'type'
> & {
	ref?: Ref<HTMLInputElement>
	label: string
}

export default function BaseCheckBox({
	label,
	className = '',
	...restProps
}: BaseCheckBoxProps) {
	return (
		<label className="flex gap-2">
			<input {...restProps} type="checkbox" />
			<span>{label}</span>
		</label>
	)
}
