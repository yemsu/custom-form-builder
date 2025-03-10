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
				'min-h-container-h mx-auto w-[1000px] max-w-full px-6 py-8',
				scrollBox && 'h-container-h sticky top-0 overflow-auto',
				className
			)}
		>
			{children}
		</div>
	)
}
