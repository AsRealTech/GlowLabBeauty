// Menu configuration for default layout

const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'Navigation',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'collapse',
          icon: 'material-icons-two-tone',
          iconname: 'home',
          children: [
            {
              id: 'Dashboard',
              title: 'Dashboard',
              type: 'item',
              url: '/user/dashboard'
            }
          ]
        }
      ]
    },
    // {
    //   id: 'ui-element',
    //   title: 'ELEMENTS',
    //   subtitle: 'UI Components',
    //   type: 'group',
    //   icon: 'icon-ui',
    //   children: [
    //     {
    //       id: 'typography',
    //       title: 'Typography',
    //       type: 'item',
    //       icon: 'material-icons-two-tone',
    //       iconname: 'text_fields',
    //       url: '/typography'
    //     },
    //     {
    //       id: 'color',
    //       title: 'Color',
    //       type: 'item',
    //       icon: 'material-icons-two-tone',
    //       iconname: 'color_lens',
    //       url: '/color'
    //     },
    //     {
    //       id: 'icons',
    //       title: 'Icons',
    //       type: 'collapse',
    //       icon: 'material-icons-two-tone',
    //       iconname: 'history_edu',
    //       children: [
    //         {
    //           id: 'feather',
    //           title: 'Feather',
    //           type: 'item',
    //           url: '/icons/Feather'
    //         },
    //         {
    //           id: 'font-awesome-5',
    //           title: 'Font Awesome',
    //           type: 'item',
    //           url: '/icons/font-awesome-5'
    //         },
    //         {
    //           id: 'material',
    //           title: 'Material',
    //           type: 'item',
    //           url: '/icons/material'
    //         }
    //       ]
    //     }
    //   ]
    // },
    {
      id: 'pages',
      title: 'Pages',
      type: 'group',
      icon: 'icon-pages',
      children: [
        {
          id: 'Products',
          title: 'Products',
          type: 'item',
          icon: 'material-icons-two-tone',
          iconname: 'verified_user',
          url: '/user/products',
          target: true
        },
        {
          id: 'Ingredients',
          title: 'Ingredients',
          type: 'item',
          icon: 'material-icons-two-tone',
          iconname: 'storefront',
          url: '/user/ingredients',
          target: true
        },
        {
          id: 'Tips',
          title: 'Tips',
          type: 'item',
          icon: 'material-icons-two-tone',
          iconname: 'list_alt',
          url: '/user/Tips',
          target: true
        }
      ]
    },
    {
      id: 'support',
      title: 'OTHER',
      type: 'group',
      icon: 'icon-support',
      children: [

        // {
        //   id: 'menu-level',
        //   title: 'Menu Levels',
        //   type: 'collapse',
        //   icon: 'material-icons-two-tone',
        //   iconname: 'list_alt',
        //   children: [
        //     {
        //       id: 'menu-level-1.1',
        //       title: 'Level 1.1',
        //       type: 'item',
        //       url: '#'
        //     },
        //     {
        //       id: 'menu-level-1.2',
        //       title: 'Level 2.2',
        //       type: 'collapse',
        //       children: [
        //         {
        //           id: 'menu-level-2.1',
        //           title: 'Level 2.1',
        //           type: 'item',
        //           url: '#'
        //         },
        //         {
        //           id: 'menu-level-2.2',
        //           title: 'Level 2.2',
        //           type: 'collapse',
        //           children: [
        //             {
        //               id: 'menu-level-3.1',
        //               title: 'Level 3.1',
        //               type: 'item',
        //               url: '#'
        //             },
        //             {
        //               id: 'menu-level-3.2',
        //               title: 'Level 3.2',
        //               type: 'item',
        //               url: '#'
        //             }
        //           ]
        //         }
        //       ]
        //     }
        //   ]
        // },
        {
          id: 'Settings',
          title: 'Settings',
          type: 'item',
          url: '/user/Settings',
          classes: 'nav-item disabled',
          icon: 'material-icons-two-tone',
          iconname: 'settings'
        },
        {
          id: 'Hide-menu',
          title: 'Hide Menu',
          type: 'item',
          url: '#',
          classes: 'nav-item disabled',
          icon: 'material-icons-two-tone',
          iconname: 'power_off'
        },
        {
          id: 'Logout',
          title: 'Logout',
          type: 'item',
          url: '#',
          classes: 'nav-item',
          icon: 'material-icons-two-tone',
          iconname: 'Lock'
        },
        {
          id: 'Back to Main Site',
          title: 'Back to Main Site',
          type: 'item',
          url: '/',
          classes: 'nav-item',
          icon: 'material-icons-two-tone',
          iconname: 'home'
        }
      ]
    }
  ]
};

export default menuItems;
