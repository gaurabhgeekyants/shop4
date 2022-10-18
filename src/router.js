import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase/app'
import 'firebase/auth'
import { authGuard } from "./auth/authService";

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior () {
        return { x: 0, y: 0 }
    },
    routes: [

        {
            // =============================================================================
            // MAIN LAYOUT ROUTES
            // =============================================================================
            path: '',
            component: () => import('./layouts/main/Main.vue'),
        children: [
    // =============================================================================
    // Theme Routes
    // =============================================================================
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/dashboard',
        name: 'dashboard-analytics',
        component: () => import('./views/DashboardAnalytics.vue'),
    meta: {
    rule: 'public'
}
}
,
// =============================================================================
// Pages Routes
// =============================================================================
{
    path: '/chat-with-member',
        name: 'chat',
    component: () => import('./views/apps/chat/Chat.vue'),
    meta: {
    rule: 'member_trainer'
}
},
{
    path: '/profile',
        name: 'profile',
        beforeEnter: authGuard,
    component: () => import('@/views/pages/Profile.vue'),
    meta: {
    pageTitle: 'Profile',
        rule: 'public'
},
},
{
    path: '/member-profile',
        name: 'memberProfile',
    component: () => import('@/views/pages/memberProfile.vue'),
    meta: {
    pageTitle: 'Profile',
        rule: 'member'
},
},
{
    path: '/measurement',
        name: 'measurement',
    component: () => import('@/views/pages/member/addMeasurement.vue'),
    meta: {
    pageTitle: 'Measurement',
        rule: 'member'
},
},
{
    path: '/member-stat',
        name: 'memberStat',
    component: () => import('@/views/pages/member/memberStat.vue'),
    meta: {
    pageTitle: 'My Stat',
        rule: 'member'
},
},

// {
//     path: '/sales',
//         name: 'page-sale',
//     component: () => import('@/views/pages/sale/index.vue'),
//     meta: {
//     breadcrumb: [
//         { title: 'Home', url: '/' },
//         { title: 'Pages' },
//         { title: 'Sale', active: true },
//     ],
//         pageTitle: 'Sales team',
//         rule: 'admin',
//     // permission: 'user'
// },
// },
        //   {
        //     path: '/lead',
        //     name: 'page-lead',
        //     component: () => import('@/views/pages/lead/adminLead.vue'),
        //     meta: {
        //       breadcrumb: [
        //         { title: 'Home', url: '/' },
        //         { title: 'Pages' },
        //         { title: 'Lead', active: true },
        //       ],
        //       pageTitle: 'Leads',
        //       rule: 'admin',
        //       // permission: 'user'
        //     },
        //   },
// {
//     path: '/leads',
//         name: 'page-leads',
//     component: () => import('@/views/pages/lead/index.vue'),
//     meta: {
//     breadcrumb: [
//         { title: 'Home', url: '/' },
//         { title: 'Pages' },
//         { title: 'Lead', active: true },
//     ],
//         pageTitle: 'Leads',
//         rule: 'sale',
//     // permission: 'user'
// },
// },
// {
//     path:'/leads/create',
//         name:'page-lead-create',
//     component:()=>import('@/views/pages/lead/create.vue'),
//     meta:{
//     breadcrumb:[
//         { title:'Home',url:'/'},
//         {title:'Pages'},
//         {title:'Add Lead',active:true},
//     ],
//         pageTitle:'Add Lead',
//         rule:'admin_sale',
// },
// },
// {
//     path: '/lead/edit/:docID',
//         name: 'lead-edit',
//     component: () => import('@/views/pages/lead/edit.vue'),
//     meta: {
//     pageTitle: 'Edit Lead',
//         rule: 'admin_sale',
// },
// },
{
    path: '/trainer-category',
        name: 'page-trainer-category',
    component: () => import('@/views/pages/trainer-category/index.vue'),
    meta: {
    breadcrumb: [
        { title: 'Home', url: '/' },
        { title: 'Pages' },
        { title: 'Lead', active: true },
    ],
        pageTitle: 'Trainer Category',
        rule: 'admin',
    // permission: 'user' lead-status food-kinds
},
},
// {
//     path: '/program-opted',
//         name: 'page-program-opted',
//     component: () => import('@/views/pages/program-opted/index.vue'),
//     meta: {
//     breadcrumb: [
//         { title: 'Home', url: '/' },
//         { title: 'Pages' },
//         { title: 'Lead', active: true },
//     ],
//         pageTitle: 'Program Opted',
//         rule: 'admin',
//     // permission: 'user' lead-status
// },
// },
{
    path: '/food-kinds',
        name: 'page-food-kinds',
    component: () => import('@/views/pages/food-kind/index.vue'),
    meta: {
    breadcrumb: [
        { title: 'Home', url: '/' },
        { title: 'Pages' },
        { title: 'Lead', active: true },
    ],
        pageTitle: 'Food Kinds',
        rule: 'admin',
    // permission: 'user' lead-status
},
},
// {
//     path: '/package',
//         name: 'page-package',
//     component: () => import('@/views/pages/package/index.vue'),
//     meta: {
//     breadcrumb: [
//         { title: 'Home', url: '/' },
//         { title: 'Pages' },
//         { title: 'Package', active: true },
//     ],
//         pageTitle: 'Package',
//         rule: 'admin',
//     // permission: 'user' lead-status
// },
// },
// {
//     path: '/lead-status',
//         name: 'page-lead-status',
//     component: () => import('@/views/pages/lead-status/index.vue'),
//     meta: {
//     breadcrumb: [
//         { title: 'Home', url: '/' },
//         { title: 'Pages' },
//         { title: 'Lead', active: true },
//     ],
//         pageTitle: 'Lead Status',
//         rule: 'admin',
//     // permission: 'user' lead-status
// },
// },
// {
//     path: '/lead-source',
//         name: 'page-lead-source',
//     component: () => import('@/views/pages/lead-source/index.vue'),
//     meta: {
//     breadcrumb: [
//         { title: 'Home', url: '/' },
//         { title: 'Pages' },
//         { title: 'Lead', active: true },
//     ],
//         pageTitle: 'Lead Source',
//         rule: 'admin',
//     // permission: 'user' lead-status
// },
// },
{
    path: '/trainers',
        name: 'page-trainer',
    component: () => import('@/views/pages/trainer/trainerList.vue'),
    meta: {
    breadcrumb: [
        { title: 'Home', url: '/' },
        { title: 'Pages' },
        { title: 'Trainer', active: true },
    ],
        pageTitle: 'Trainers',
        rule: 'admin',
    // permission: 'user'
},
},

{
    path: '/members',
        name: 'member',
    component: () => import('@/views/pages/member/index.vue'),
    meta: {
    breadcrumb: [
        { title: 'Home', url: '/' },
        { title: 'Pages' },
        { title: 'member', active: true },
    ],
        pageTitle: 'Members',
        rule: 'admin',
},
},

{
    path: '/members/view-member-stats/:uid',
        name: 'view-member-stats',
    component: () => import('@/views/pages/member/memberStatsForAdminAndTrainer.vue'),
    meta: {
    // pageTitle: 'Member Stats',
        rule: 'editor',
},
},
{
    path: '/members/edit/:uid',
        name: 'member-edit',
    component: () => import('@/views/pages/member/edit.vue'),
    meta: {
    pageTitle: 'View Member',
        rule: 'admin',
},
},
{
    path: '/members/create',
        name: 'member-create',
    component: () => import('@/views/pages/member/add.vue'),
    meta: {
    pageTitle: 'Add New Member',
        rule: 'admin',
},
},
{
    path: '/view-members',
        name: 'view-members',
        component:() =>
    import('@/views/pages/view-members/index.vue'),
        meta:
    {
        pageTitle: 'View Members',
            rule:
        'trainer',
    },
},
{
    path:'member/meal-plan',
        name:'meal-plan',
    component:()=>import('@/views/pages/meal-plan/index.vue'),
    meta:{
        rule:'member',
}
},
          {
            path: '/complete-profile/:uid',
            name: 'complete-profile',
            component: () => import('@/views/pages/profileComplete.vue'),
            meta: {
              rule: 'member'
            }
          },
{
    path: '/members/profile/:uid',
        name: 'view-members-profile',
    component: () => import('@/views/pages/view-members/profile.vue'),
    meta: {
    pageTitle: 'Members Profile',
        rule: 'trainer',
},
},
{
    path: '/members/mealplan/:uid/:mealplan_no',
        name: 'view-members-mealplan',
    component: () => import('@/views/pages/view-members/view-members-mealplan.vue'),
    meta: {
    pageTitle: "Member's Meal Plan",
        rule: 'trainer',
},
},
{
    path: '/trainer/profile',
        name: 'view-trainer-profile',
    component: () => import('@/views/pages/view-trainer/profile.vue'),
    meta: {
    pageTitle: 'Trainer Profile',
        rule: 'member',
},
},
          {
            path: '/notification',
            name: 'notification',
            component: () => import('@/views/pages/notification.vue'),
            meta: {
              pageTitle: 'Notification',
              rule: 'member_trainer_admin_sale',
            },
          },
{
    path: '/components/navbar',
        name: 'component-navbar',
    component: () => import('@/views/components/vuesax/navbar/Navbar.vue'),
    meta: {
    breadcrumb: [
        { title: 'Home', url: '/' },
        { title: 'Components' },
        { title: 'Navbar', active: true },
    ],
        pageTitle: 'Navbar',
        rule: 'editor'
},
},
],
},
{
    path: '/verify-email/:uid',
        name: 'verify-email',
    component: () => import('@/views/pages/verifyEmail.vue'),
    meta: {
    rule: 'editor'
}
},
      {
        path: '/profile-complete/:uid',
        name: 'profile-complete',
        component: () => import('@/views/pages/profileComplete.vue'),
        meta: {
          rule: 'editor'
        }
      },
{
    path: '',
        component: () => import('@/layouts/full-page/FullPage.vue'),
    children: [
    {
        path: '/login',
        name: 'page-login',
        component: () => import('@/views/pages/Login.vue'),
    meta: {
    rule: 'editor'
}
},
    {
        path: '/register',
            name: 'page-register',
        component: () => import('@/views/pages/Register.vue'),
        meta: {
        rule: 'public'
    }
    },
    {
        // path: '/reset-password',
        path: '/forgot-password',
            name: 'page-reset-password',
        component: () => import('@/views/pages/ResetPassword.vue'),
        meta: {
        rule: 'editor'
    }
    },
    {
        path: '/comingsoon',
            name: 'page-coming-soon',
        component: () => import('@/views/pages/ComingSoon.vue'),
        meta: {
        rule: 'editor'
    }
    },
    {
        path: '/error-404',
            name: 'page-error-404',
        component: () => import('@/views/pages/Error404.vue'),
        meta: {
        rule: 'editor'
    }
    },
    {
        path: '/error-500',
            name: 'page-error-500',
        component: () => import('@/views/pages/Error500.vue'),
        meta: {
        rule: 'editor'
    }
    },
    {
        path: '/not-authorized',
            name: 'page-not-authorized',
        component: () => import('@/views/pages/NotAuthorized.vue'),
        meta: {
        rule: 'editor'
    }
    }
]
},
// Redirect to 404 page, if no match found
{
    path: '*',
        redirect: '/error-404'
}
],
})

router.afterEach(() => {
    // Remove initial loading
    const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
})

router.beforeEach((to, from, next) => {
    firebase.auth().onAuthStateChanged(() => {

    // get firebase current user
    // const firebaseCurrentUser = firebase.auth().currentUser;

if (
    to.path === "/login" ||
    to.path === "/forgot-password" ||
    to.path === "/error-404" ||
    to.path === "/error-500" ||
    to.path === "/register" ||
    // to.path === "/callback" ||
    to.path === "/comingsoon" ||
    to.name === "verify-email" ||
    to.name === "profile-complete" ||
    // (auth.isAuthenticated() || firebaseCurrentUser)
    (localStorage.getItem('uid'))
) {
    return next();
}else {


router.push({ path: '/login'})
}


//, query: { to: to.path }
// Specify the current path as the customState parameter, meaning it
// will be returned to the application after auth
// auth.login({ target: to.path });

});

});

export default router
