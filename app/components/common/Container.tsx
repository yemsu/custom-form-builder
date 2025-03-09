import type { HTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
	children: React.ReactNode
}

export default function Container({
	children,
	className,
	...restProps
}: ContainerProps) {
	return (
		<div
			{...restProps}
			className={cn(
				'mx-auto min-h-[100dvh] w-[1000px] max-w-full px-6 py-8',
				className
			)}
		>
			{children}
		</div>
	)
}
