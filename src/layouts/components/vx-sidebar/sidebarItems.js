/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [
  {
    url: '/dashboard',
    name: "Dashboard",
    // tag: "2",
    // tagColor: "warning",
    icon: "HomeIcon",
    i18n: "Dashboard",
    role: "public",
  },
  // {
  //   header: "Apps",
  //   i18n: "Apps",
  // },
  {
    url: "/trainers",
    name: "Trainer",
    slug: "trainer",
    icon: "UserIcon",
    i18n: "Trainer",
    role: "admin",

  },
  {
    url: "/members",
    name: "Members",
    slug: "members",
    icon: "UserIcon",
    i18n: "Members",
    role: "admin",

  },
  {
      url: "/view-members",
      name: "View Members",
      slug: "members",
      icon: "UsersIcon",
      i18n: "View Members",
      role: "trainer",
  },

  {
    url: "/member/meal-plan",
    name: "meal-plan",
    slug: "meal plan",
    icon: "ListIcon",
    i18n: "Meal Plan",
    role: "member",
  },
  {
    url: "/member-stat",
    name: "My Stat",
    slug: "My Stat",
    icon: "PieChartIcon",
    i18n: "My Stat",
    role: "member",
  },
  {
    url: "/trainer/profile",
    name: "view-trainer-profile",
    slug: "trainer profile",
    icon: "UserIcon",
    i18n: "View Trainer Profile",
    role: "member",
  },
  // {
  //   url: "/leads",
  //   name: "page-leads",
  //   slug: "page-leads",
  //   icon: "UserIcon",
  //   i18n: "Leads",
  //   role: "admin",

  // },

  {
      url: "/chat-with-member",
      name: "chat",
      slug: "chat-with-member",
      icon: "MessageSquareIcon",
      i18n: "Chat",
      role: "member_trainer",

  },

  // {
  //   url: '/trainer-category',
  //   name: "Sale",
  //   // tag: "new",
  //   tagColor: "primary",
  //   icon: "UserIcon",
  //   i18n: "Sale",
  //   role: "admin",
  //   submenu: [
  //  /*   {
  //       url: '/trainer-category',
  //       name: "Trainer Category",
  //       slug: "trainer-category",
  //       i18n: "Trainer Category",
  //     },*/
  //     {
  //       url: "/sales",
  //       name: "page-sale",
  //       slug: "page-sales",
  //       icon: "UserIcon",
  //       i18n: "" +
  //         "Sales Person",
  //       role: "admin",

  //     },
  //     {
  //       url: '/lead',
  //       name: "Thumb View",
  //       slug: "lead",
  //       i18n: "Lead",
  //     },
  //   ]
  // },
  {
    url: '/trainer-category',
    name: "Settings",
    // tag: "new",
    tagColor: "primary",
    icon: "GridIcon",
    i18n: "Setting",
    role: "admin",
    submenu: [
      {
        url: '/trainer-category',
        name: "Trainer Category",
        slug: "trainer-category",
        i18n: "Trainer Category",
      },
      // {
      //   url: '/lead-source',
      //   name: "Thumb View",
      //   slug: "lead source",
      //   i18n: "Lead Source",
      // },
      // {
      //   url: '/lead-status',
      //   name: "Thumb View",
      //   slug: "lead-status",
      //   i18n: "Lead Status",
      // },
      // {
      //   url: '/program-opted',
      //   name: "Program Opted ",
      //   slug: "program-opted",
      //   i18n: "Program Opted",
      // },
      {
        url: '/food-kinds',
        name: "Kinds Of Foods",
        slug: "food-kinds",
        i18n: "Kinds of food",
      },
      // {
      //   url: '/package',
      //   name: "Package",
      //   slug: "package",
      //   i18n: "Package",
      // },
    ]
  },
  {
    url: "/apps/email",
    name: "Email",
    slug: "email",
    icon: "MailIcon",
    i18n: "Email",
  }
]
