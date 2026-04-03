import type { GameState } from '$lib/types';

const STORAGE_KEY = 'memory-game-state';

export function loadPersistedState(): GameState | null {
	if (typeof window === 'undefined') return null;
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw) as GameState;

		// Basic schema validation
		if (
			!parsed ||
			typeof parsed !== 'object' ||
			!parsed.config ||
			!parsed.cards ||
			typeof parsed.status !== 'string' ||
			typeof parsed.currentPlayerIndex !== 'number'
		) {
			return null;
		}

		return parsed;
	} catch {
		return null;
	}
}

export function saveState(state: GameState): void {
	if (typeof window === 'undefined') return;
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	} catch {
		// localStorage might be full or unavailable
	}
}

export function clearPersistedState(): void {
	if (typeof window === 'undefined') return;
	try {
		localStorage.removeItem(STORAGE_KEY);
	} catch {
		// ignore
	}
}
