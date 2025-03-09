import type { InputHTMLAttributes, Ref } from 'react'
import { cn } from '~/lib/utils'
import type { StyleMap } from '~/types/common'
import type { Size3 } from '~/types/style'

export type BaseInputProps = InputHTMLAttributes<HTMLInputElement> & {
	ref?: Ref<HTMLInputElement>
	sizeVariant?: Size3
}

const sizeVariants: StyleMap<BaseInputProps, 'sizeVariant'> = {
	sm: 'text-sm h-8',
	md: 'text-md h-10',
	lg: 'text-[35px] h-18'
}

export default function BaseInput({
	className = '',
	sizeVariant = 'md',
	...restProps
}: BaseInputProps) {
	return (
		<input
			{...restProps}
			className={cn(
				'border-b-1 border-gray-500 p-2',
				'focus:border-primary focus:border-b-2 focus:outline-0',
				sizeVariants[sizeVariant],
				className
			)}
		/>
	)
}
