"use client";

import { useId, useState } from "react";
import FrameworkCard from "@/components/FrameworkCard";
import { checklist as checklistCopy, type Pillar } from "@/lib/content";

/**
 * One pillar of the worksheet: the full question and explanation, plus a
 * checkbox and a notes field. State is intentionally local and unpersisted —
 * this is a thinking tool, not an account feature.
 */
export default function ChecklistItem({ pillar }: { pillar: Pillar }) {
  const checkboxId = useId();
  const notesId = useId();

  const [checked, setChecked] = useState(false);
  const [notes, setNotes] = useState("");

  return (
    <FrameworkCard {...pillar} showExplanation>
      <div className="mt-5 flex flex-col gap-4 border-t border-white/[0.06] pt-4">
        {/* 44px tall so the whole row is a comfortable tap target on mobile. */}
        <div className="flex min-h-[2.75rem] items-center">
          <input
            id={checkboxId}
            type="checkbox"
            checked={checked}
            onChange={(event) => setChecked(event.target.checked)}
            className="peer sr-only"
          />
          <label
            htmlFor={checkboxId}
            className={`flex flex-1 cursor-pointer items-center gap-3 rounded-lg py-2 text-sm transition-colors peer-focus-visible:ring-1 peer-focus-visible:ring-accent ${
              checked ? "text-bone-50" : "text-mute-400"
            }`}
          >
            <span
              aria-hidden="true"
              className={`inline-flex h-5 w-5 flex-none items-center justify-center rounded-md border text-[0.7rem] font-bold transition ${
                checked
                  ? "border-accent bg-accent text-ink-950"
                  : "border-white/20 bg-ink-900/80 text-transparent"
              }`}
            >
              ✓
            </span>
            {checklistCopy.checkboxLabel}
          </label>
        </div>

        <div>
          <label
            htmlFor={notesId}
            className="block text-[0.6875rem] font-semibold tracking-[0.16em] text-mute-500 uppercase"
          >
            {checklistCopy.notesLabel}
          </label>
          <input
            id={notesId}
            type="text"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder={checklistCopy.notesPlaceholder}
            className="mt-2 h-11 w-full min-w-0 rounded-xl border border-white/10 bg-ink-900/80 px-3 text-sm text-bone-50 transition placeholder:text-mute-500 hover:border-white/20 focus:outline-none focus-visible:border-accent focus-visible:outline-none"
          />
        </div>
      </div>
    </FrameworkCard>
  );
}
