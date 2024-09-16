import { MainNavItem, SidebarNavItem } from "@/types/nav"

export interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/",
    },
  ],
  sidebarNav: [
    {
      title: "Floating Components",
      items: [
        {
          title: "Floating Label Input",
          href: "/examples/floating-label-input",
          items: [],
        },
        {
          title: "Floating Label Combobox",
          href: "/examples/floating-label-combobox",
          items: [],
        },
        {
          title: "Floating Label Multi Combobox",
          href: "/examples/floating-label-multi-combobox",
          items: [],
        },
      ],
    },
  ],
}
