import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
} from "lucide-react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/default/ui/toggle-group";
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/registry/default/ui/toolbar";

export default function Particle() {
  return (
    <Toolbar aria-label="Text formatting">
      <ToolbarGroup>
        <ToggleGroup defaultValue={["bold"]} multiple>
          <ToolbarButton
            aria-label="Toggle bold"
            render={<ToggleGroupItem value="bold" />}
          >
            <BoldIcon />
          </ToolbarButton>
          <ToolbarButton
            aria-label="Toggle italic"
            render={<ToggleGroupItem value="italic" />}
          >
            <ItalicIcon />
          </ToolbarButton>
          <ToolbarButton
            aria-label="Toggle underline"
            render={<ToggleGroupItem value="underline" />}
          >
            <UnderlineIcon />
          </ToolbarButton>
        </ToggleGroup>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <ToggleGroup defaultValue={["left"]}>
          <ToolbarButton
            aria-label="Align left"
            render={<ToggleGroupItem value="left" />}
          >
            <AlignLeftIcon />
          </ToolbarButton>
          <ToolbarButton
            aria-label="Align center"
            render={<ToggleGroupItem value="center" />}
          >
            <AlignCenterIcon />
          </ToolbarButton>
          <ToolbarButton
            aria-label="Align right"
            render={<ToggleGroupItem value="right" />}
          >
            <AlignRightIcon />
          </ToolbarButton>
        </ToggleGroup>
      </ToolbarGroup>
    </Toolbar>
  );
}
