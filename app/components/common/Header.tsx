import { Link } from 'react-router'
import SurveySearchBox from '~/components/survey/SurveySearchBox'

type HeaderProps = {}

function Header({}: HeaderProps) {
	return (
		<header className="h-header-h flex items-center border-b border-gray-800 px-6 py-4">
			<h1>
				<Link to="/" title="메인으로">
					Custom Form Builder
				</Link>
			</h1>
			<div className="absolute left-1/2 -translate-x-1/2">
				<SurveySearchBox />
			</div>
		</header>
	)
}

export default Header
