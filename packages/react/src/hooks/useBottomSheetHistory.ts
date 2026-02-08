import {
  canUseHistory,
  canUseSessionStorage,
  isString,
} from "@plainsheet/utility";
import { useEffect, useMemo, useRef, useState } from "react";

type UseBottomSheetHistoryOptions = {
  isOpen: boolean;
  onClose: () => void;
  hashPrefix?: string;
};

type UseBottomSheetHistoryReturn = {
  id: string;
  hash: string;
  hasPushed: boolean;
  isTopmost: boolean;
};

const issuedIds = new Set<string>();
const openStack: string[] = [];
const SESSION_INDEX_KEY = "plainsheet-hash-index";
let fallbackIndexCounter = 0;

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

function getNextSessionIndex(): number {
  if (canUseSessionStorage()) {
    try {
      const raw = window.sessionStorage.getItem(SESSION_INDEX_KEY);
      const parsed = isString(raw) ? Number.parseInt(raw, 10) : 0;
      const next = Number.isFinite(parsed) ? parsed + 1 : 0;
      window.sessionStorage.setItem(SESSION_INDEX_KEY, String(next));
      return next;
    } catch (error) {
      // Fall through to in-memory counter.
    }
  }

  fallbackIndexCounter += 1;
  return fallbackIndexCounter;
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
  const { isOpen, onClose, hashPrefix = "" } = options;

  const { initialId, sessionIndex } = useMemo(() => {
    const index = getNextSessionIndex();
    return {
      initialId: ensureUniqueId(String(index)),
      sessionIndex: index,
    };
  }, []);

  const [hasPushed, setHasPushed] = useState(false);
  const ignoreNextPopRef = useRef(false);

  const hash =
    hashPrefix.length > 0
      ? `#bottom-sheet-${hashPrefix}-${sessionIndex}`
      : `#bottom-sheet-${sessionIndex}`;

  useEffect(() => {
    if (isOpen) {
      pushToStack(initialId);
    } else {
      removeFromStack(initialId);
    }
  }, [isOpen, initialId]);

  useEffect(() => {
    if (!canUseHistory()) {
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
  }, [isOpen, hash, hasPushed, initialId]);

  useEffect(() => {
    if (!canUseHistory()) {
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
  }, [isOpen, hasPushed, initialId, hash, onClose]);

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
