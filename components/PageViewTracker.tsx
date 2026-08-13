"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Fires a single `page_view` per mounted route. */
export default function PageViewTracker() {
  useEffect(() => {
    track("page_view");
  }, []);

  return null;
}
