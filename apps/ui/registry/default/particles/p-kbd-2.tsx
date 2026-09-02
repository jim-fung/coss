import { Kbd, KbdGroup } from "@/registry/default/ui/kbd";

export default function Particle() {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <p className="flex items-center gap-1.5">
        Press
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
        to open the command menu
      </p>
      <p className="flex items-center gap-1.5 text-muted-foreground">
        Or
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>⇧</Kbd>
          <Kbd>P</Kbd>
        </KbdGroup>
        to run any command
      </p>
    </div>
  );
}
