import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPopup,
  NavigationMenuTrigger,
} from "@/registry/default/ui/navigation-menu";

const groups = [
  {
    links: [
      { description: "Centered modal dialogs.", href: "#", title: "Dialog" },
      { description: "Side-panel overlays.", href: "#", title: "Sheet" },
    ],
    title: "Overlays",
  },
  {
    links: [
      { description: "Searchable selections.", href: "#", title: "Combobox" },
      { description: "Native select styling.", href: "#", title: "Select" },
    ],
    title: "Inputs",
  },
];

export default function Particle() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-96 grid-cols-2 gap-2">
              {groups.map((group) => (
                <div className="flex flex-col gap-1" key={group.title}>
                  <p className="px-2 font-medium text-muted-foreground text-xs">
                    {group.title}
                  </p>
                  {group.links.map((link) => (
                    <NavigationMenuLink
                      className="rounded-md p-2 transition-colors hover:bg-accent"
                      href={link.href}
                      key={link.title}
                    >
                      <p className="font-medium text-sm">{link.title}</p>
                      <p className="text-muted-foreground text-xs">
                        {link.description}
                      </p>
                    </NavigationMenuLink>
                  ))}
                </div>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            active
            className="flex h-8 items-center rounded-md px-2.5 font-medium text-base transition-colors hover:bg-accent sm:text-sm"
            href="#"
          >
            Docs
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuPopup />
    </NavigationMenu>
  );
}
