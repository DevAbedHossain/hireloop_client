"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export const CopyTransactionId = ({ id }: { id: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(id);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard unavailable (permissions/insecure context) — nothing to do.
        }
    };

    return (
        <div className="flex items-center gap-2">
            <code className="truncate font-mono text-sm text-white">{id}</code>
            <button
                type="button"
                onClick={handleCopy}
                aria-label={copied ? "Copied" : `Copy transaction ID ${id}`}
                className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-[#131316] text-[#a1a4aa] transition-colors hover:text-white"
            >
                {copied
                    ? <Check className="size-4 text-emerald-500" aria-hidden="true" />
                    : <Copy className="size-4" aria-hidden="true" />}
            </button>
        </div>
    );
};
