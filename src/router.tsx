import { createReactRouter } from '@tanstack/react-router'
import { routeConfig } from './routes.generated/routeConfig'
import { routeConfigClient } from './routes.generated/routeConfig.client'

export const createRouter = () => {
  const router = createReactRouter({
    routeConfig:
      typeof document !== 'undefined' ? routeConfigClient : routeConfig,
    useServerData: true,
  })
  if (typeof process === 'object' && process.env.VITE) {
    // loadMatchData from packages/router-core/src/router.ts
    router.loadMatchData = async (routeMatch) => {
      const next = router.buildNext({
        to: '.',
        search: (d: any) => ({
          ...(d ?? {}),
          __data: {
            matchId: routeMatch.matchId,
          },
        }),
      })
      const nextAstro = new URL(next.href, 'http://127.0.0.1:3000/api')
      const res = await fetch(nextAstro.href, {
        method: 'GET',
      })
      if (res.ok) {
        return res.json()
      }
      throw new Error('Failed to fetch match data')
    }
  }
  return router
}

declare module '@tanstack/react-router' {
  interface RegisterRouter {
    router: ReturnType<typeof createRouter>
  }
}
