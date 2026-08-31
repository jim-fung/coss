import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPopup,
  NavigationMenuTrigger,
} from "@/registry/default/ui/navigation-menu";

const components = [
  {
    description: "Accessible overlays built on Base UI primitives.",
    href: "#",
    title: "Dialog",
  },
  {
    description: "Transient notifications with a headless manager.",
    href: "#",
    title: "Toast",
  },
  {
    description: "Searchable single- and multi-select fields.",
    href: "#",
    title: "Combobox",
  },
];

export default function Particle() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-80 gap-1">
              {components.map((component) => (
                <li key={component.title}>
                  <NavigationMenuLink
                    className="block rounded-md p-3 transition-colors hover:bg-accent"
                    href={component.href}
                  >
                    <p className="font-medium text-sm">{component.title}</p>
                    <p className="text-muted-foreground text-sm">
                      {component.description}
                    </p>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-64 gap-1">
              {[
                { href: "#", title: "Styling guide" },
                { href: "#", title: "Accessibility" },
                { href: "#", title: "Changelog" },
              ].map((resource) => (
                <li key={resource.title}>
                  <NavigationMenuLink
                    className="block rounded-md p-2 font-medium text-sm transition-colors hover:bg-accent"
                    href={resource.href}
                  >
                    {resource.title}
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className="flex h-8 items-center rounded-md px-2.5 font-medium text-base transition-colors hover:bg-accent sm:text-sm"
            href="#"
          >
            GitHub
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuPopup />
    </NavigationMenu>
  );
}
