import {
  Menu,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuShortcut,
} from "@/registry/default/ui/menu";
import { Menubar, MenubarTrigger } from "@/registry/default/ui/menubar";

export default function Particle() {
  return (
    <Menubar>
      <Menu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenuPopup align="start" sideOffset={8}>
          <MenuItem>New Tab</MenuItem>
          <MenuItem>New Window</MenuItem>
          <MenuSeparator />
          <MenuItem>Share</MenuItem>
          <MenuSeparator />
          <MenuItem variant="destructive">Close Window</MenuItem>
        </MenuPopup>
      </Menu>
      <Menu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenuPopup align="start" sideOffset={8}>
          <MenuItem>
            Undo
            <MenuShortcut>⌘Z</MenuShortcut>
          </MenuItem>
          <MenuItem>
            Redo
            <MenuShortcut>⇧⌘Z</MenuShortcut>
          </MenuItem>
          <MenuSeparator />
          <MenuItem>
            Cut
            <MenuShortcut>⌘X</MenuShortcut>
          </MenuItem>
          <MenuItem>
            Copy
            <MenuShortcut>⌘C</MenuShortcut>
          </MenuItem>
        </MenuPopup>
      </Menu>
    </Menubar>
  );
}
