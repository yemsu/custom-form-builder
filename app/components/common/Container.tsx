import type { HTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
	children: React.ReactNode
	scrollBox?: boolean
}

export default function Container({
	children,
	scrollBox,
	className,
	...restProps
}: ContainerProps) {
	return (
		<div
			{...restProps}
			className={cn(
				'mx-auto min-h-[100dvh] w-[1000px] max-w-full px-6 py-8',
				scrollBox && 'sticky top-0 max-h-[100dvh] overflow-auto',
				className
			)}
		>
			{children}
		</div>
	)
}
