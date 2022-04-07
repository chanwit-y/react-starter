export type Menu = {
  name: string;
  text: string;
  icon?: string;
  path: string;
  breadcrumbs: string[];
  breadcrumbLinks: string[];
  active: boolean;
};

export type MenuGroup = {
  groupName: string;
  menus: Menu[];
};
