import type { HTMLAttributes } from 'react'
import { cn } from '~/lib/utils'
import type { Size3 } from '~/types/style'

type TitleProps = HTMLAttributes<HTMLHeadElement> & {
	h?: 'h2' | 'h3'
	size?: Size3
	mb?: boolean
	children: React.ReactNode
}

const sizeStyles: Record<NonNullable<TitleProps['size']>, string> = {
	sm: 'text-md',
	md: 'text-lg',
	lg: 'text-xl'
}

const mbStyles: Record<NonNullable<TitleProps['size']>, string> = {
	sm: 'mb-2',
	md: 'mb-4',
	lg: 'mb-8'
}

export default function Title({
	h = 'h2',
	size = 'md',
	mb = false,
	children,
	...restProps
}: TitleProps) {
	const Tag = h
	return (
		<Tag
			className={cn('font-bold', sizeStyles[size], mb && mbStyles[size])}
			{...restProps}
		>
			{children}
		</Tag>
	)
}
