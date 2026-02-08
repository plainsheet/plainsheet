import { useEffect, useMemo, useRef, useState } from "react";

type UseBottomSheetHistoryOptions = {
  isOpen: boolean;
  onClose: () => void;
  enabled?: boolean;
  hashPrefix?: string;
  id?: string;
};

type UseBottomSheetHistoryReturn = {
  id: string;
  hash: string;
  hasPushed: boolean;
  isTopmost: boolean;
};

const issuedIds = new Set<string>();
const openStack: string[] = [];
let fallbackCounter = 0;

function canUseHistory(): boolean {
  return typeof window !== "undefined" && typeof window.history !== "undefined";
}

function ensureUniqueId(rawId: string): string {
  let candidate = rawId;
  let suffix = 0;
  while (issuedIds.has(candidate)) {
    suffix += 1;
    candidate = `${rawId}-${suffix}`;
  }
  issuedIds.add(candidate);
  return candidate;
}

function generateId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  fallbackCounter += 1;
  return `${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2)}-${fallbackCounter}`;
}

function pushToStack(id: string): void {
  if (!openStack.includes(id)) {
    openStack.push(id);
  }
}

function removeFromStack(id: string): void {
  const index = openStack.indexOf(id);
  if (index !== -1) {
    openStack.splice(index, 1);
  }
}

function isTopmostId(id: string): boolean {
  return openStack.length > 0 && openStack[openStack.length - 1] === id;
}

export function useBottomSheetHistory(
  options: UseBottomSheetHistoryOptions,
): UseBottomSheetHistoryReturn {
  const { isOpen, onClose, enabled = true, hashPrefix = "pbs-", id } = options;

  const initialId = useMemo(() => {
    const base = id ?? generateId();
    return ensureUniqueId(base);
  }, []);

  const [hasPushed, setHasPushed] = useState(false);
  const ignoreNextPopRef = useRef(false);

  const hash = `#${hashPrefix}${initialId}`;

  useEffect(() => {
    if (!enabled) {
      return;
    }

    if (isOpen) {
      pushToStack(initialId);
    } else {
      removeFromStack(initialId);
    }
  }, [enabled, isOpen, initialId]);

  useEffect(() => {
    if (!enabled || !canUseHistory()) {
      return;
    }

    if (isOpen) {
      if (window.location.hash !== hash) {
        window.history.pushState({ pbsId: initialId }, "", hash);
        setHasPushed(true);
      }
      return;
    }

    if (hasPushed && window.location.hash === hash) {
      ignoreNextPopRef.current = true;
      window.history.back();
    }
  }, [enabled, isOpen, hash, hasPushed, initialId]);

  useEffect(() => {
    if (!enabled || !canUseHistory()) {
      return;
    }

    function handlePop(): void {
      if (ignoreNextPopRef.current) {
        ignoreNextPopRef.current = false;
        return;
      }

      if (!isOpen || !hasPushed) {
        return;
      }

      if (!isTopmostId(initialId)) {
        return;
      }

      if (window.location.hash !== hash) {
        onClose();
      }
    }

    window.addEventListener("popstate", handlePop);
    window.addEventListener("hashchange", handlePop);
    return () => {
      window.removeEventListener("popstate", handlePop);
      window.removeEventListener("hashchange", handlePop);
    };
  }, [enabled, isOpen, hasPushed, initialId, hash, onClose]);

  useEffect(() => {
    return () => {
      issuedIds.delete(initialId);
      removeFromStack(initialId);
    };
  }, [initialId]);

  return {
    id: initialId,
    hash,
    hasPushed,
    isTopmost: isTopmostId(initialId),
  };
}

export type { UseBottomSheetHistoryOptions, UseBottomSheetHistoryReturn };
