const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
        name: "home",
      },
      {
        path: "/donate",
        component: () => import("pages/Donate/DonatePage.vue"),
        name: "donate",
      },
      {
        path: "/biomedical-near-us",
        component: () => import("pages/Biomedical/BioMedicalPage.vue"),
        name: "biomedical.near.us",
      },
      {
        path: "/biomedical-listing/detail",
        component: () => import("pages/Biomedical/BiomedicalDetailsPage.vue"),
        name: "biomedical.detail",
      },
      {
        path: "/donate-details",
        component: () => import("pages/Donate/DonateDetailsPage.vue"),
        name: "donate.details",
      },
      {
        path: "/stores",
        component: () => import("pages/StoresPage.vue"),
        name: "stores",
      },
      {
        path: "/store/detail",
        component: () => import("pages/StoreDetail.vue"),
        name: "store.detail",
      },
      {
        path: "/plans",
        component: () => import("pages/PlansPage.vue"),
        name: "plans.page",
      },
      {
        path: "/frequently-asked-questions",
        component: () => import("pages/FaqPage.vue"),
        name: "faq",
      },

      {
        path: "/explore",
        component: () => import("pages/ExplorePage.vue"),
        name: "explore",
      },
      {
        path: "/merchant/create-store",
        component: () => import("pages/Dashboard/CreateStorePage.vue"),
        name: "create.store",
      },
      {
        path: "/cart",
        component: () => import("pages/Checkout/CartPage.vue"),
        name: "cart",
      },
      {
        path: "/subscription-payment/success",
        component: () => import("src/pages/SubscriptionSuccessPage.vue"),
        name: "subscription.success.page",
      },
      {
        path: "/order-payment/success",
        component: () => import("pages/Checkout/PaymentSuccess.vue"),
        name: "payment.success",
      },
      {
        path: "/order-payment/success/stripe",
        component: () => import("pages/Checkout/PaymentSuccessStripe.vue"),
        name: "payment.success.stripe",
      },

      {
        path: "/checkout",
        component: () => import("pages/Checkout/CheckoutDetails.vue"),
        name: "checkout",
      },
      // {
      //   path: "/order-tracking",
      //   component: () => import("pages/Checkout/OrderTracking.vue"),
      //   name: "order.tracking",
      // },
      {
        path: "/order-tracking",
        component: () => import("pages/Checkout/OrderTrackingNew.vue"),
        name: "order.tracking.new",
      },
      {
        path: "/product-detail",
        component: () => import("pages/Dashboard/ProductDetail.vue"),
        name: "product.detail",
      },
      {
        path: "/user/product-detail",
        component: () => import("pages/Dashboard/UserProductDetail.vue"),
        name: "user.product.detail",
      },
      {
        path: "/store",
        component: () => import("pages/Dashboard/StoreLayout.vue"),
        name: "store.layout",
        children: [
          {
            path: "/merchant/account/dashboard",
            component: () => import("pages/Dashboard/AccountDashboard.vue"),
            name: "account.dashboard",
          },

          {
            path: "/merchant/customer/orders",
            component: () => import("pages/Dashboard/CustomerOrders.vue"),
            name: "customer.orders",
          },
          {
            path: "/merchant/payment/escrow",
            component: () => import("pages/Dashboard/PaymentEscrow.vue"),
            name: "payment.escrow",
          },
          {
            path: "/merchant/dispatch-riders",
            component: () => import("pages/Dashboard/DispatchRiders.vue"),
            name: "dispatch.riders",
          },
          {
            path: "/merchant/account-information",
            component: () => import("pages/Dashboard/AccountInformation.vue"),
            name: "account.info",
          },
          {
            path: "/merchant/messages",
            component: () => import("pages/Dashboard/MessagesPage.vue"),
            name: "merchant.messages",
          },
          {
            path: "/merchant/order-history",
            component: () => import("pages/Dashboard/HistoryPage.vue"),
            name: "history",
          },
          {
            path: "/merchant/analytics",
            component: () => import("pages/Dashboard/AnalyticsPage.vue"),
            name: "merchant.analytics",
          },
          // {
          //   path: "/merchant/track-order",
          //   component: () =>
          //     import("pages/checkout/OrderTrackingNewMerchant.vue"),
          //   name: "merchant.track.order",
          // },
        ],
      },
    ],
  },
  // {
  //   path: "/mainadmin",
  //   component: () => import("layouts/AdminLayout.vue"),
  //   children: [
  //     {
  //       path: "/admin/merchants",
  //       component: () => import("pages/admin/ListMerchants.vue"),
  //       name: "admin.list.merchants",
  //     },
  //     {
  //       path: "/admin/kycs",
  //       component: () => import("pages/admin/VerifyKyc.vue"),
  //       name: "admin.list.kyc",
  //     },
  //     {
  //       path: "/admin/orders",
  //       component: () => import("pages/admin/ListOrders.vue"),
  //       name: "admin.list.orders",
  //     },
  //     {
  //       path: "/admin/fees",
  //       component: () => import("pages/admin/ListFees.vue"),
  //       name: "admin.list.fees",
  //     },
  //   ],
  // },
  {
    path: "/dashboard",
    component: () => import("layouts/DashboardLayout.vue"),
    children: [
      {
        path: "/user/dashboard",
        component: () => import("pages/Dashboard/DashboardPage.vue"),
        name: "dashboard",
      },
      {
        path: "/user/orders",
        component: () => import("pages/Dashboard/UserOrders.vue"),
        name: "user.orders",
      },
      {
        path: "/user/payment-list",
        component: () => import("pages/Dashboard/CustomerPaymentList.vue"),
        name: "user.payment.list",
      },
      {
        path: "/user/messages",
        component: () => import("pages/Dashboard/UsersMessagesPage.vue"),
        name: "user.messages",
      },
    ],
  },
  {
    path: "/auth",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      {
        path: "/register",
        component: () => import("pages/auth/merchant/RegisterPage.vue"),
        name: "merchant.register",
      },
      {
        path: "/reset/password",
        component: () => import("pages/auth/ResetPassword.vue"),
        name: "reset.password",
      },
      {
        path: "/forgot-password",
        component: () => import("pages/auth/ForgotPassword.vue"),
        name: "forgot.password",
      },
      {
        path: "/individual/register",
        component: () => import("pages/auth/merchant/IndividualRegister.vue"),
        name: "individual.register",
      },
      {
        path: "/biomedic/register",
        component: () => import("pages/auth/BiomedicalRegiser.vue"),
        name: "biomedic.register",
      },
      {
        path: "/biomedic/login",
        component: () => import("pages/auth/BiomedicalLogin.vue"),
        name: "biomedic.login",
      },
      {
        path: "/set",
        component: () => import("pages/AllSetPage.vue"),
        name: "all.set",
      },
      {
        path: "/kyc",
        component: () => import("pages/KycPage.vue"),
        name: "kyc",
      },
      {
        path: "/user/stores",
        component: () => import("pages/VisitStores.vue"),
        name: "user.stores",
      },
      {
        path: "/verify/email",
        component: () => import("pages/auth/VerifyEmail.vue"),
        name: "verify.email",
      },
      {
        path: "/email-verified/success",
        component: () => import("pages/auth/EmailVerificationSuccess.vue"),
        name: "email.verified",
      },
      {
        path: "/merchant/register",
        component: () => import("pages/auth/merchant/BusinessRegister.vue"),
        name: "business.register",
      },
      {
        path: "/merchant/login",
        component: () => import("pages/auth/LoginPage.vue"),
        name: "merchant.login",
      },
      {
        path: "/customer/login",
        component: () => import("pages/auth/CustomerLoginPage.vue"),
        name: "customer.login",
      },
      {
        path: "/user/logout",
        component: () => import("pages/auth/LoginPage.vue"),
        name: "logout",
      },
    ],
  },

  // {
  //   path: "/admin/login",
  //   component: () => import("pages/admin/LoginPage.vue"),
  //   name: "admin.login",
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;

// const routes = [
//   {
//     path: '/',
//     component: () => import('layouts/MainLayout.vue'),
//     children: [
//       { path: '', component: () => import('pages/IndexPage.vue') },
//       { path: '/pricing', component: () => import('pages/PricingPage.vue') },
//     ]
//   },
//   {
//     path: '/onboarding',
//     component: () => import('layouts/OnboardingLayout.vue'), // Use the new layout
//     children: [
//       { path: '', component: () => import('pages/onboarding/OnBoarding.vue') },
//       { path: '/sign-up', component: () => import('pages/onboarding/SignupPage.vue') },
//       { path: '/login', component: () => import('pages/onboarding/LoginPage.vue') }
//     ]
//   },

//   // Always leave this as last one,
//   // but you can also remove it
//   {
//     path: '/:catchAll(.*)*',
//     component: () => import('pages/ErrorNotFound.vue')
//   }
// ]

// export default routes
