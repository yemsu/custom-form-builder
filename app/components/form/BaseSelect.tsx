import type { SelectHTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

type BaseSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
	ref?: React.Ref<HTMLSelectElement>
	dataMap: Record<string, string>
}

export default function BaseSelect({
	dataMap,
	className,
	...restProps
}: BaseSelectProps) {
	return (
		<select className={cn('min-w-45 p-2', className)} {...restProps}>
			{Object.keys(dataMap).map((type) => (
				<option key={type} value={type}>
					{dataMap[type as string]}
				</option>
			))}
		</select>
	)
}
