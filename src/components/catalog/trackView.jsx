"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/actions/analytics.actions";

export default function TrackView({ dressId }) {
   const hasTracked = useRef(false);

   useEffect(() => {
      if (!dressId) return;
      if (hasTracked.current) return;
      hasTracked.current = true;
      
      trackEvent(dressId, "VIEW");
   }, [dressId]);

   return null;
}
