import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
	index('routes/home.tsx'),
	route(':surveyId/edit', 'routes/$surveyId.edit.tsx'),
	route(':error', 'routes/error.tsx')
] satisfies RouteConfig
