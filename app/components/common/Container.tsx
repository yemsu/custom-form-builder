type ContainerProps = {
	children: React.ReactNode
}

export default function Container({ children }: ContainerProps) {
	return (
		<div className="mx-auto min-h-[100dvh] w-[1100px] max-w-full px-6">
			{children}
		</div>
	)
}
