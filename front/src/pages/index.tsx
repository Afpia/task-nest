import { createRoutesView } from 'atomic-router-react'

import { AccountCustomizationRoute, AccountPasswordRoute, AccountPersonalRoute, AccountRoute } from './account'
import { AnalyticsRoute } from './analytics'
import { ForgotPasswordRoute } from './forgot-password'
import { HomeRoute } from './home'
import { LoginRoute } from './login'
import { NotFound } from './not-found'
import { ProfileRoute } from './profile'
import { ProjectRoute } from './project'
import { ResetPasswordRoute } from './reset-password'
import { SearchRoute } from './search'
import { SignupRoute } from './signup'
import { WorkspacesRoute } from './workspaces'

export * from './loading'

export const Pages = createRoutesView({
	routes: [
		LoginRoute,
		SignupRoute,
		ForgotPasswordRoute,
		ResetPasswordRoute,
		WorkspacesRoute,
		HomeRoute,
		ProfileRoute,
		ProjectRoute,
		AccountRoute,
		AccountPersonalRoute,
		AccountPasswordRoute,
		SearchRoute,
		AccountCustomizationRoute,
		AnalyticsRoute
	],
	otherwise() {
		return <NotFound />
	}
})
