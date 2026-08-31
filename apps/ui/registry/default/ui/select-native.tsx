import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDownIcon } from "lucide-react";
import type * as React from "react";
import { cn } from "@/registry/default/lib/utils";

export const selectNativeVariants = cva(
  "relative inline-flex min-h-9 w-full min-w-36 select-none appearance-none items-center rounded-lg border border-input bg-background not-dark:bg-clip-padding px-[calc(--spacing(3)-1px)] text-left text-base text-foreground shadow-xs/5 outline-none ring-ring/24 transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] not-data-disabled:not-focus-visible:not-aria-invalid:before:shadow-[0_1px_--theme(--color-black/4%)] focus-visible:border-ring focus-visible:ring-[3px] aria-invalid:border-destructive/36 aria-invalid:ring-destructive/16 data-disabled:pointer-events-none data-disabled:opacity-64 sm:min-h-8 sm:text-sm dark:bg-input/32 dark:aria-invalid:ring-destructive/24 dark:not-data-disabled:not-aria-invalid:before:shadow-[0_-1px_--theme(--color-white/6%)] [[data-disabled],:focus-visible,[aria-invalid]]:shadow-none",
  {
    defaultVariants: {
      size: "default",
    },
    variants: {
      size: {
        default: "",
        lg: "min-h-10 sm:min-h-9",
        sm: "min-h-8 px-[calc(--spacing(2.5)-1px)] sm:min-h-7",
      },
    },
  },
);

function SelectNative({
  className,
  children,
  size,
  ...props
}: Omit<React.ComponentProps<"select">, "size"> &
  VariantProps<typeof selectNativeVariants>): React.ReactElement {
  return (
    <div className="relative flex w-full" data-slot="select-native-wrapper">
      <select
        className={cn(
          selectNativeVariants({ size }),
          "peer",
          props.multiple
            ? "py-1 *:px-3 *:py-1 [&_option:checked]:bg-accent"
            : "pe-8",
          className,
        )}
        data-slot="select-native"
        {...props}
      >
        {children}
      </select>
      {!props.multiple && (
        <span className="pointer-events-none absolute inset-y-0 end-0 flex w-9 items-center justify-center text-muted-foreground/80 peer-aria-invalid:text-destructive/80 peer-data-disabled:opacity-64">
          <ChevronDownIcon aria-hidden="true" className="size-4 opacity-80" />
        </span>
      )}
    </div>
  );
}

export { SelectNative };
