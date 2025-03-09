import type { SelectHTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

type BaseTextareaProps = SelectHTMLAttributes<HTMLTextAreaElement> & {
	ref?: React.Ref<HTMLTextAreaElement>
	placeholder?: string
}

export default function BaseTextarea({
	className,
	placeholder,
	...restProps
}: BaseTextareaProps) {
	return (
		<textarea
			{...restProps}
			className={cn('h-40 resize-none bg-gray-800 p-2', className)}
			placeholder={placeholder}
		/>
	)
}
