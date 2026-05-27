"use client";

import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { IoCopyOutline, IoCheckmarkOutline } from "react-icons/io5";

interface EmailCardProps {
  email: string;
}

export function EmailCard({ email }: EmailCardProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <a
      href={`mailto:${email}`}
      className="flex items-center gap-4 p-4 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:border-[rgba(255,255,255,0.1)] hover:bg-[#161616] transition-colors duration-200 group"
    >
      <MdEmail
        className="text-[var(--text-muted)] group-hover:text-white transition-colors duration-200 shrink-0"
        size={18}
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white">Email</p>
        <p className="text-xs text-[var(--text-muted)] mt-0.5 truncate">{email}</p>
      </div>
      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-[var(--text-muted)] hover:text-white hover:bg-[rgba(255,255,255,0.07)] transition-colors duration-150 shrink-0"
        aria-label="Copiar email"
      >
        {copied ? (
          <>
            <IoCheckmarkOutline size={13} className="text-green-400" />
            <span className="text-green-400">Copiado</span>
          </>
        ) : (
          <>
            <IoCopyOutline size={13} />
            <span>Copiar</span>
          </>
        )}
      </button>
    </a>
  );
}
