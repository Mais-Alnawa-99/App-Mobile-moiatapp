// tts/TTSCollector.ts
import * as React from 'react';
import {TTSScopeContext} from './screenTextRegistry';

type Entry = {
  id: string;
  text: string;
  index: number; // index المستخدم للفرز = preIndex الثابت
};

type Scope = Map<string, Entry>;

const scopes = new Map<string, Scope>();
const listeners = new Map<string, Set<() => void>>();
const collectListeners = new Map<string, Set<() => void>>();

const collectingFlags = new Map<string, boolean>();

const preOrderCounters = new Map<string, number>();
const preOrders = new Map<string, Map<string, number>>();

let activeScopeId: string | null = null;

export function ensureScope(id: string) {
  if (!scopes.has(id)) scopes.set(id, new Map());
  if (!listeners.has(id)) listeners.set(id, new Set());
  if (!collectListeners.has(id)) collectListeners.set(id, new Set());
  if (!collectingFlags.has(id)) collectingFlags.set(id, false);
  if (!preOrderCounters.has(id)) preOrderCounters.set(id, 0);
  if (!preOrders.has(id)) preOrders.set(id, new Map());
}

export function setActiveScopeId(id: string | null) {
  activeScopeId = id;
  if (id) ensureScope(id);
}

export function getActiveScopeId() {
  return activeScopeId;
}

function getOrAssignPreIndex(scopeId: string, id: string) {
  ensureScope(scopeId);
  const map = preOrders.get(scopeId)!;
  if (map.has(id)) return map.get(id)!;
  const next = (preOrderCounters.get(scopeId) ?? 0) + 1;
  preOrderCounters.set(scopeId, next);
  map.set(id, next);
  return next;
}

function releasePreIndex(scopeId: string, id: string) {
  const map = preOrders.get(scopeId);
  if (!map) return;
  map.delete(id);
}

export function resetScope(scopeId: string) {
  ensureScope(scopeId);
  scopes.get(scopeId)!.clear();
  collectingFlags.set(scopeId, false);
  emit(scopeId);
}

export function clearScope(scopeId: string) {
  scopes.delete(scopeId);
  listeners.get(scopeId)?.forEach(cb => cb());
  listeners.delete(scopeId);
  collectListeners.delete(scopeId);
  collectingFlags.delete(scopeId);
  preOrderCounters.delete(scopeId);
  preOrders.delete(scopeId);
  if (activeScopeId === scopeId) activeScopeId = null;
}

function canWrite(scopeId: string) {
  return collectingFlags.get(scopeId) === true;
}

function registerWithIndex(
  scopeId: string,
  id: string,
  text: string,
  index: number,
) {
  if (!canWrite(scopeId)) return;
  ensureScope(scopeId);
  scopes.get(scopeId)!.set(id, {id, text: (text || '').trim(), index});
}

function update(scopeId: string, id: string, text: string) {
  if (!canWrite(scopeId)) return;
  const s = scopes.get(scopeId);
  if (!s || !s.has(id)) return;
  const e = s.get(id)!;
  s.set(id, {...e, text: (text || '').trim()});
}

export function triggerCollect(scopeId?: string) {
  const id = scopeId ?? activeScopeId ?? '';
  if (!id) return;
  ensureScope(id);

  collectingFlags.set(id, true);
  try {
    collectListeners.get(id)!.forEach(cb => {
      try {
        cb();
      } catch {}
    });
  } finally {
    collectingFlags.set(id, false);
  }

  emit(id);
}

export function getList(scopeId?: string): string[] {
  const id = scopeId ?? activeScopeId ?? '';
  const s = scopes.get(id);
  if (!s) return [];
  return Array.from(s.values())
    .filter(e => !!e.text)
    .sort((a, b) => a.index - b.index)
    .map(e => e.text);
}

export function getAll(scopeId?: string): string {
  return getList(scopeId).join('\n');
}

function emit(scopeId: string) {
  listeners.get(scopeId)?.forEach(cb => cb());
}

export function subscribe(scopeId: string, cb: () => void) {
  ensureScope(scopeId);
  listeners.get(scopeId)!.add(cb);
  return () => listeners.get(scopeId)?.delete(cb);
}

function onCollect(scopeId: string, cb: () => void) {
  ensureScope(scopeId);
  collectListeners.get(scopeId)!.add(cb);
  return () => collectListeners.get(scopeId)?.delete(cb);
}

export function useRegisterSpeakableText(
  text: string | undefined,
  enabled = true,
  scopeId?: string,
) {
  const ctxScope = React.useContext(TTSScopeContext);
  const sid = scopeId ?? ctxScope ?? getActiveScopeId();
  const idRef = React.useRef<string>();
  if (!idRef.current) idRef.current = Math.random().toString(36).slice(2);

  const preIndexRef = React.useRef<number | null>(null);
  if (sid && preIndexRef.current == null) {
    preIndexRef.current = getOrAssignPreIndex(sid, idRef.current);
  }

  React.useEffect(() => {
    if (!enabled || !sid) return;

    const unsub = onCollect(sid, () => {
      const t = (text || '').toString().trim();
      const preIdx =
        preIndexRef.current ?? getOrAssignPreIndex(sid, idRef.current!);
      const exists = scopes.get(sid)?.has(idRef.current!);
      if (exists) {
        update(sid, idRef.current!, t);
      } else {
        registerWithIndex(sid, idRef.current!, t, preIdx);
      }
    });

    return () => {
      unsub();
    };
  }, [enabled, sid, text]);
}

export function useScreenText(scopeId: string) {
  const [v, setV] = React.useState(() => getAll(scopeId));
  React.useEffect(() => {
    setV(getAll(scopeId));
    const unsub = subscribe(scopeId, () => setV(getAll(scopeId)));
    return unsub;
  }, [scopeId]);
  return v;
}
