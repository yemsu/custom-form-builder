import type { SelectHTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

type BaseSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
	ref?: React.Ref<HTMLSelectElement>
	options: { id: string; value: string }[]
}

export default function BaseSelect({
	options,
	className,
	...restProps
}: BaseSelectProps) {
	return (
		<select
			className={cn('h-input-h-md min-w-45 px-2', className)}
			{...restProps}
		>
			{options.map((option) => (
				<option key={option.id} value={option.id}>
					{option.value}
				</option>
			))}
		</select>
	)
}
