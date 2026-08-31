"use client";

import { GripVerticalIcon } from "lucide-react";
import type * as React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import {
  Group,
  type GroupImperativeHandle,
  type Layout,
  Panel,
  Separator,
} from "react-resizable-panels";
import { cn } from "@/registry/default/lib/utils";

interface SnapRegistration {
  snapPoints: number[];
  snapThreshold: number;
}

type SnapContextValue = (
  id: string,
  registration: SnapRegistration | null,
) => void;

const ResizableSnapContext = createContext<SnapContextValue>(() => {});

function ResizablePanelGroup({
  orientation = "horizontal",
  className,
  groupRef: consumerGroupRef,
  onLayoutChange: consumerOnLayoutChange,
  ...props
}: React.ComponentProps<typeof Group>): React.ReactElement {
  const registrationsRef = useRef(new Map<string, SnapRegistration>());
  const groupHandleRef = useRef<GroupImperativeHandle | null>(null);
  const settledLayoutRef = useRef<Layout | null>(null);
  const latestLayoutRef = useRef<Layout | null>(null);
  const pointerGestureRef = useRef(false);

  const setGroupHandle = useCallback(
    (handle: GroupImperativeHandle | null) => {
      groupHandleRef.current = handle;
      if (typeof consumerGroupRef === "function") {
        consumerGroupRef(handle);
      } else if (consumerGroupRef) {
        consumerGroupRef.current = handle;
      }
    },
    [consumerGroupRef],
  );

  const registerSnap = useCallback<SnapContextValue>((id, registration) => {
    if (registration) {
      registrationsRef.current.set(id, registration);
    } else {
      registrationsRef.current.delete(id);
    }
  }, []);

  const applySnap = useCallback((layout: Layout) => {
    const registrations = registrationsRef.current;
    if (registrations.size === 0 || !groupHandleRef.current) {
      settledLayoutRef.current = layout;
      return;
    }

    const previous = settledLayoutRef.current;
    const adjusted: Layout = { ...layout };
    let snapped = false;

    for (const [id, { snapPoints, snapThreshold }] of registrations) {
      const size = adjusted[id];
      if (size === undefined) {
        continue;
      }

      let target: number | undefined;
      let distance = Number.POSITIVE_INFINITY;
      for (const point of snapPoints) {
        const pointDistance = Math.abs(size - point);
        if (pointDistance < distance) {
          distance = pointDistance;
          target = point;
        }
      }

      // Snap only when the size entered a snap zone it was not already in —
      // snapping unconditionally would trap keyboard resizes that step away
      // from a point.
      const previousSize = previous?.[id];
      if (target === undefined || previousSize === undefined) {
        continue;
      }
      const enteredZone =
        distance < snapThreshold &&
        distance >= 0.01 &&
        Math.abs(previousSize - target) >= snapThreshold;
      if (!enteredZone) {
        continue;
      }

      // Absorb the snap delta in the largest other panel so the layout keeps
      // summing to the same total.
      const otherIds = Object.keys(adjusted).filter((key) => key !== id);
      let flexId: string | undefined;
      for (const key of otherIds) {
        if (
          flexId === undefined ||
          (adjusted[key] ?? 0) > (adjusted[flexId] ?? 0)
        ) {
          flexId = key;
        }
      }
      if (flexId === undefined) {
        continue;
      }

      const delta = target - size;
      const flexSize = (adjusted[flexId] ?? 0) - delta;
      if (flexSize < 0) {
        continue;
      }

      adjusted[id] = target;
      adjusted[flexId] = flexSize;
      snapped = true;
    }

    if (snapped) {
      groupHandleRef.current.setLayout(adjusted);
    }
    settledLayoutRef.current = snapped ? adjusted : layout;
  }, []);

  const handleLayoutChange = useCallback<
    NonNullable<React.ComponentProps<typeof Group>["onLayoutChange"]>
  >(
    (layout) => {
      latestLayoutRef.current = layout;
      // Pointer drags snap when the gesture ends (see the pointerup handler);
      // keyboard and other single-step changes snap right away.
      if (!pointerGestureRef.current) {
        applySnap(layout);
      }
      consumerOnLayoutChange?.(layout);
    },
    [applySnap, consumerOnLayoutChange],
  );

  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    const target = event.target;
    if (
      target instanceof Element &&
      target.closest("[data-slot=resizable-handle]")
    ) {
      pointerGestureRef.current = true;
    }
  }, []);

  useEffect(() => {
    const endGesture = () => {
      if (!pointerGestureRef.current) {
        return;
      }
      pointerGestureRef.current = false;
      const layout = latestLayoutRef.current;
      if (layout) {
        applySnap(layout);
      }
    };
    window.addEventListener("pointerup", endGesture);
    window.addEventListener("pointercancel", endGesture);
    return () => {
      window.removeEventListener("pointerup", endGesture);
      window.removeEventListener("pointercancel", endGesture);
    };
  }, [applySnap]);

  return (
    <ResizableSnapContext.Provider value={registerSnap}>
      <Group
        className={cn(
          "flex size-full in-data-[orientation=vertical]:flex-col",
          className,
        )}
        data-orientation={orientation}
        data-slot="resizable-panel-group"
        groupRef={setGroupHandle}
        onLayoutChange={handleLayoutChange}
        onPointerDownCapture={handlePointerDown}
        orientation={orientation}
        {...props}
      />
    </ResizableSnapContext.Provider>
  );
}

function ResizablePanel({
  snapPoints,
  snapThreshold = 5,
  id,
  ...props
}: React.ComponentProps<typeof Panel> & {
  /**
   * Sizes (as percentages of the group, 0–100) the panel snaps to when a
   * resize gesture settles on them. Requires an `id` so the group can apply
   * the snapped layout.
   */
  snapPoints?: number[];
  /** Distance, in percentage points, within which a snap point attracts the panel. */
  snapThreshold?: number;
}): React.ReactElement {
  const registerSnap = useContext(ResizableSnapContext);

  useEffect(() => {
    if (!snapPoints || snapPoints.length === 0) {
      return;
    }
    if (id === undefined) {
      console.warn(
        "ResizablePanel: snapping requires an id so the group can identify the panel.",
      );
      return;
    }
    registerSnap(String(id), { snapPoints, snapThreshold });
    return () => registerSnap(String(id), null);
  }, [id, registerSnap, snapPoints, snapThreshold]);

  return <Panel data-slot="resizable-panel" id={id} {...props} />;
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof Separator> & {
  withHandle?: boolean;
}): React.ReactElement {
  return (
    <Separator
      className={cn(
        "relative flex in-data-[orientation=vertical]:h-px in-data-[orientation=vertical]:w-full w-px items-center justify-center bg-border outline-none after:absolute after:inset-y-0 after:left-1/2 in-data-[orientation=vertical]:after:left-0 in-data-[orientation=vertical]:after:h-1 after:w-1 in-data-[orientation=vertical]:after:w-full after:-translate-x-1/2 in-data-[orientation=vertical]:after:translate-x-0 in-data-[orientation=vertical]:after:-translate-y-1/2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
        className,
      )}
      data-slot="resizable-handle"
      {...props}
    >
      {withHandle && (
        <div className="z-10 flex h-4 w-3 items-center justify-center rounded-xs border bg-border">
          <GripVerticalIcon aria-hidden="true" className="size-2.5" />
        </div>
      )}
    </Separator>
  );
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };
