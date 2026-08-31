import {
  Menu,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuSub,
  MenuSubPopup,
  MenuSubTrigger,
} from "@/registry/default/ui/menu";
import { Menubar, MenubarTrigger } from "@/registry/default/ui/menubar";

export default function Particle() {
  return (
    <Menubar>
      <Menu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenuPopup align="start" sideOffset={8}>
          <MenuItem>New File</MenuItem>
          <MenuSub>
            <MenuSubTrigger>Export As</MenuSubTrigger>
            <MenuSubPopup>
              <MenuItem>PDF</MenuItem>
              <MenuItem>PNG</MenuItem>
              <MenuItem>SVG</MenuItem>
            </MenuSubPopup>
          </MenuSub>
          <MenuSeparator />
          <MenuItem variant="destructive">Close Window</MenuItem>
        </MenuPopup>
      </Menu>
      <Menu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenuPopup align="start" sideOffset={8}>
          <MenuItem>Undo</MenuItem>
          <MenuItem>Redo</MenuItem>
        </MenuPopup>
      </Menu>
    </Menubar>
  );
}
