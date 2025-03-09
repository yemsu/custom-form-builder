import { Link } from 'react-router'

type HeaderProps = {}

function Header({}: HeaderProps) {
	return (
		<header className="border-b border-gray-800 px-6 py-4">
			<h1>
				<Link to="/" title="메인으로">
					Custom Form Builder
				</Link>
			</h1>
		</header>
	)
}

export default Header
