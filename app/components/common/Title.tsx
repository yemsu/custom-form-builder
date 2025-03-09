import type { HTMLAttributes } from 'react'
import { cn } from '~/lib/utils'
import type { Size3 } from '~/types/style'

type TitleProps = HTMLAttributes<HTMLHeadElement> & {
	h?: 'h2' | 'h3' | 'h4' | 'h5'
	size?: Size3
	children: React.ReactNode
}

const sizeStyles: Record<NonNullable<TitleProps['size']>, string> = {
	sm: 'text-md',
	md: 'text-lg',
	lg: 'text-xl'
}

export default function Title({
	h = 'h2',
	size = 'md',
	children,
	...restProps
}: TitleProps) {
	const Tag = h
	return (
		<Tag className={cn('font-bold', sizeStyles[size])} {...restProps}>
			{children}
		</Tag>
	)
}
