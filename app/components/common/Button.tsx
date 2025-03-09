import type {
	AnchorHTMLAttributes,
	ButtonHTMLAttributes,
	ReactNode
} from 'react'
import { Link } from 'react-router'
import { cn } from '~/lib/utils'
import type { StyleMap } from '~/types/common'
import type { Size3 } from '~/types/style'

type CommonProps = {
	size?: Size3
	variant?: 'primary' | 'ghost'
	children: ReactNode
	className?: string
}

type LinkTagProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
	onClick?: never
	type?: never
} & CommonProps

type ButtonTagProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	href?: never
	target?: never
} & CommonProps

type ButtonProps = LinkTagProps | ButtonTagProps

const sizeStyles: StyleMap<ButtonProps['size']> = {
	sm: 'px-2 h-input-h-sm text-xs rounded-sm',
	md: 'px-4 h-input-h-md rounded-md ',
	lg: 'h-input-h-lg'
}

const variantStyles: StyleMap<ButtonProps['variant']> = {
	primary: 'bg-primary hover:opacity-90',
	ghost: 'text-gray-400 hover:bg-white/10'
}

export default function Button({
	href,
	target,
	type = 'button',
	onClick,
	title,
	children,
	size = 'md',
	variant = 'primary',
	className = ''
}: ButtonProps) {
	const baseClasses = cn(
		'transition-colors',
		sizeStyles[size],
		variantStyles[variant],
		className
	)

	if (href) {
		return target === '_blank' ? (
			<a href={href} className={baseClasses}>
				{children}
			</a>
		) : (
			<Link to={href} className={baseClasses}>
				{children}
			</Link>
		)
	}

	return (
		<button type={type} onClick={onClick} title={title} className={baseClasses}>
			{children}
		</button>
	)
}
