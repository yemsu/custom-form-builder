import type { HTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

type SurveySectionProps = HTMLAttributes<HTMLDivElement> & {
	children: React.ReactNode
}

function SectionBox({ children, className, ...restProps }: SurveySectionProps) {
	return (
		<div
			{...restProps}
			className={cn(
				'flex flex-col gap-4 rounded-md border border-white/20 p-6 pt-4 not-first:mt-4',
				className
			)}
		>
			{children}
		</div>
	)
}

export default SectionBox
