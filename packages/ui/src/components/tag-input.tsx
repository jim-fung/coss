"use client";

import { cn } from "@coss/ui/lib/utils";
import { XIcon } from "lucide-react";
import * as React from "react";
import { createContext, useContext } from "react";

type TagInputContextValue = {
  addTag: (raw: string) => void;
  disabled: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  removeTag: (tag: string) => void;
  tags: string[];
};

const TagInputContext = createContext<TagInputContextValue | undefined>(
  undefined,
);

const useTagInput = () => {
  const context = useContext(TagInputContext);
  if (!context) {
    throw new Error("useTagInput must be used within a TagInput");
  }
  return context;
};

interface TagInputProps extends React.ComponentProps<"div"> {
  defaultValue?: string[];
  disabled?: boolean;
  onValueChange?: (tags: string[]) => void;
  value?: string[];
}

function TagInput({
  defaultValue = [],
  disabled = false,
  onValueChange,
  value,
  className,
  ...props
}: TagInputProps): React.ReactElement {
  const [internalTags, setInternalTags] =
    React.useState<string[]>(defaultValue);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const setTags = React.useCallback(
    (tags: string[]) => {
      if (value === undefined) {
        setInternalTags(tags);
      }
      onValueChange?.(tags);
    },
    [value, onValueChange],
  );

  const currentTags = value ?? internalTags;

  const addTag = React.useCallback(
    (raw: string) => {
      const tag = raw.trim();
      if (!tag || currentTags.includes(tag)) return;
      setTags([...currentTags, tag]);
    },
    [currentTags, setTags],
  );

  const removeTag = React.useCallback(
    (tag: string) => {
      setTags(currentTags.filter((item) => item !== tag));
    },
    [currentTags, setTags],
  );

  return (
    <TagInputContext.Provider
      value={{ addTag, disabled, inputRef, removeTag, tags: currentTags }}
    >
      <div
        className={cn(
          "flex w-full flex-wrap items-center gap-1.5 rounded-lg border border-input bg-background not-dark:bg-clip-padding p-[calc(--spacing(1.5)-1px)] text-base shadow-xs/5 transition-shadow has-focus-visible:border-ring has-data-[disabled]:opacity-64 has-focus-visible:ring-[3px] has-focus-visible:ring-ring/24 sm:text-sm dark:bg-input/32",
          className,
        )}
        data-disabled={disabled || undefined}
        data-slot="tag-input"
        onMouseDown={(event) => {
          if (event.target !== event.currentTarget) return;
          event.preventDefault();
          event.currentTarget.querySelector("input")?.focus();
        }}
        role="group"
        {...props}
      />
    </TagInputContext.Provider>
  );
}

interface TagInputItemProps extends React.ComponentProps<"span"> {
  tag: string;
}

function TagInputItem({
  tag,
  children,
  className,
  ...props
}: TagInputItemProps): React.ReactElement {
  const { disabled } = useTagInput();

  return (
    <span
      className={cn(
        "flex items-center rounded-[calc(var(--radius-md)-1px)] bg-accent ps-2 font-medium text-accent-foreground text-sm outline-none sm:text-xs/(--text-xs--line-height)",
        className,
      )}
      data-disabled={disabled || undefined}
      data-slot="tag-input-item"
      {...props}
    >
      {children ?? tag}
      <TagInputItemRemove tag={tag} />
    </span>
  );
}

interface TagInputItemRemoveProps extends React.ComponentProps<"button"> {
  tag: string;
}

function TagInputItemRemove({
  tag,
  className,
  ...props
}: TagInputItemRemoveProps): React.ReactElement {
  const { disabled, removeTag } = useTagInput();

  return (
    <button
      aria-label={`Remove ${tag}`}
      className={cn(
        "h-full shrink-0 cursor-pointer px-1.5 opacity-80 hover:opacity-100 disabled:pointer-events-none disabled:opacity-64 [&_svg:not([class*='size-'])]:size-4 sm:[&_svg:not([class*='size-'])]:size-3.5",
        className,
      )}
      data-slot="tag-input-item-remove"
      disabled={disabled}
      onClick={() => removeTag(tag)}
      type="button"
      {...props}
    >
      <XIcon aria-hidden="true" />
    </button>
  );
}

interface TagInputInputProps
  extends Omit<
    React.ComponentProps<"input">,
    "defaultValue" | "onChange" | "value"
  > {
  placeholder?: string;
}

function TagInputInput({
  placeholder,
  className,
  ...props
}: TagInputInputProps): React.ReactElement {
  const { addTag, disabled, inputRef, removeTag, tags } = useTagInput();
  const [draft, setDraft] = React.useState("");

  return (
    <input
      className={cn(
        "min-w-24 flex-1 bg-transparent px-1.5 py-0.5 text-foreground outline-none placeholder:text-muted-foreground/72 disabled:cursor-not-allowed",
        className,
      )}
      data-slot="tag-input-input"
      disabled={disabled}
      onKeyDown={(event) => {
        if (event.key === "Enter" && !event.nativeEvent.isComposing) {
          event.preventDefault();
          addTag(draft);
          setDraft("");
        }
        if (event.key === "Backspace" && draft === "") {
          const lastTag = tags[tags.length - 1];
          if (lastTag !== undefined) {
            event.preventDefault();
            removeTag(lastTag);
          }
        }
      }}
      onChange={(event) => setDraft(event.target.value)}
      placeholder={placeholder}
      ref={(node) => {
        inputRef.current = node;
      }}
      type="text"
      value={draft}
      {...props}
    />
  );
}

export { TagInput, TagInputInput, TagInputItem, TagInputItemRemove };
