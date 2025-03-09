import { cn } from '~/lib/utils'
import type { StyleMap } from '~/types/common'
import type { Size3 } from '~/types/style'

type SectionProps = {
	size?: Size3
	children: React.ReactNode
}

const sizeStyle: StyleMap<SectionProps['size']> = {
	sm: 'my-4',
	md: 'my-8',
	lg: 'my-12'
}

export default function Section({ size = 'md', children }: SectionProps) {
	return (
		<section className={cn('first:mt-0', sizeStyle[size])}>{children}</section>
	)
}
