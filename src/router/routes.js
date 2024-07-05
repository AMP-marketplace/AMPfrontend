
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
    ]
  },
  {
    path: '/onboarding',
    component: () => import('layouts/OnboardingLayout.vue'), // Use the new layout
    children: [
      { path: '', component: () => import('pages/onboarding/OnBoarding.vue') },
      { path: '/sign-up', component: () => import('pages/onboarding/SignupPage.vue') },
      { path: '/login', component: () => import('pages/onboarding/LoginPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
