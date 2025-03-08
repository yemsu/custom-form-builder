import { cn } from '~/lib/utils'
import type { StyleMap } from '~/types/common'
import type { Size3 } from '~/types/style'

type SectionProps = {
	size?: Size3
	children: React.ReactNode
}

const sizeStyle: StyleMap<SectionProps, 'size'> = {
	sm: 'py-4',
	md: 'py-8',
	lg: 'py-12'
}

export default function Section({ size = 'md', children }: SectionProps) {
	return <section className={cn(sizeStyle[size])}>{children}</section>
}
