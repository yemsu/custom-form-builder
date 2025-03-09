type SurveySectionProps = { children: React.ReactNode }

function SectionBox({ children }: SurveySectionProps) {
	return (
		<div className="flex flex-col gap-4 rounded-md border border-white/20 p-6 pt-4 not-first:mt-4">
			{children}
		</div>
	)
}

export default SectionBox
