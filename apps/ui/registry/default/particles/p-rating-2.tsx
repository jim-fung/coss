"use client";

import { useState } from "react";
import { Rating } from "@/registry/default/ui/rating";

export default function Particle() {
  const [rating, setRating] = useState<number | undefined>(3);

  return (
    <div className="flex items-center gap-3">
      <Rating allowClear onValueChange={setRating} value={rating} />
      <span className="text-muted-foreground text-sm tabular-nums">
        {rating ?? 0} / 5
      </span>
    </div>
  );
}
