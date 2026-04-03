import type { Card, GameConfig, GameState, Player, Theme } from '$lib/types';
import { themeData } from '$lib/themes';
import { loadPersistedState, saveState } from './persistence.svelte';

function createInitialGameState(): GameState {
	return {
		config: {
			players: [{ name: 'Player 1', score: 0 }],
			gridX: 4,
			gridY: 4,
			themes: ['dinosaur']
		},
		cards: [],
		currentPlayerIndex: 0,
		status: 'setup'
	};
}

/** Fisher-Yates shuffle */
function shuffle<T>(array: T[]): T[] {
	const arr = [...array];
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

/** Generate the card grid from config */
function generateCards(config: GameConfig): Card[] {
	const totalCards = config.gridX * config.gridY;
	const totalPairs = totalCards / 2;
	const themes = config.themes;

	// Collect all available card identifiers from selected themes
	const availableCards: { theme: Theme; pairId: string }[] = [];
	for (const theme of themes) {
		for (const card of themeData[theme].cards) {
			availableCards.push({ theme, pairId: card.pairId });
		}
	}

	// Shuffle available cards and pick the needed number of pairs
	const shuffledAvailable = shuffle(availableCards);
	const selectedPairs = shuffledAvailable.slice(0, totalPairs);

	// Create card pairs (two cards per pairId)
	const cards: Card[] = [];
	for (let i = 0; i < selectedPairs.length; i++) {
		const { theme, pairId } = selectedPairs[i];
		// Card A
		cards.push({
			id: `${pairId}-a`,
			theme,
			pairId,
			flipped: false,
			matched: false
		});
		// Card B
		cards.push({
			id: `${pairId}-b`,
			theme,
			pairId,
			flipped: false,
			matched: false
		});
	}

	return shuffle(cards);
}

// ─── Game Store ───────────────────────────────────────────────────────────────

let gameState = $state<GameState>(createInitialGameState());
let flippedCardIds = $state<string[]>([]);
let locked = $state(false);
let hydrated = false;
let lastMatchEvent = $state<{ cardIds: string[]; playerIndex: number; id: number } | null>(null);

/** Hydrate from localStorage — call once from a component's $effect */
export function hydrateFromStorage(): void {
	if (hydrated) return;
	hydrated = true;
	const persisted = loadPersistedState();
	if (persisted) {
		gameState = persisted;
		flippedCardIds = persisted.cards
			.filter((c) => c.flipped && !c.matched)
			.map((c) => c.id);
	}
}

export function getGameState(): GameState {
	return gameState;
}

export function getStatus() {
	return gameState.status;
}

export function getCards(): Card[] {
	return gameState.cards;
}

export function getConfig(): GameConfig {
	return gameState.config;
}

export function getCurrentPlayerIndex(): number {
	return gameState.currentPlayerIndex;
}

export function getCurrentPlayer(): Player {
	return gameState.config.players[gameState.currentPlayerIndex];
}

export function getPlayers(): Player[] {
	return gameState.config.players;
}

export function isLocked(): boolean {
	return locked;
}

export function getLastMatchEvent() {
	return lastMatchEvent;
}

export function isGameOver(): boolean {
	if (gameState.status !== 'playing') return false;
	return gameState.cards.length > 0 && gameState.cards.every((c) => c.matched);
}

export function getWinner(): Player | null {
	if (!isGameOver()) return null;
	const players = gameState.config.players;
	const maxScore = Math.max(...players.map((p) => p.score));
	const winners = players.filter((p) => p.score === maxScore);
	if (winners.length > 1) return null; // draw
	return winners[0];
}

export function isDraw(): boolean {
	if (!isGameOver()) return false;
	const players = gameState.config.players;
	const maxScore = Math.max(...players.map((p) => p.score));
	return players.filter((p) => p.score === maxScore).length > 1;
}

export function initGame(config: GameConfig): void {
	const totalCards = config.gridX * config.gridY;
	if (totalCards % 2 !== 0) {
		throw new Error('Grid must have an even number of cells');
	}
	if (config.themes.length === 0) {
		throw new Error('At least one theme must be selected');
	}
	if (config.players.length === 0) {
		throw new Error('At least one player is required');
	}

	// Reset player scores
	const players = config.players.map((p) => ({ ...p, score: 0 }));

	const cards = generateCards({ ...config, players });

	gameState = {
		config: { ...config, players },
		cards,
		currentPlayerIndex: 0,
		status: 'playing'
	};
	flippedCardIds = [];
	locked = false;
}

export function flipCard(id: string): void {
	if (locked) return;
	if (gameState.status !== 'playing') return;

	const card = gameState.cards.find((c) => c.id === id);
	if (!card) return;
	if (card.flipped || card.matched) return;

	// Flip the card
	card.flipped = true;
	flippedCardIds = [...flippedCardIds, id];

	// Check if two cards are flipped
	if (flippedCardIds.length === 2) {
		locked = true;
		const [firstId, secondId] = flippedCardIds;
		const firstCard = gameState.cards.find((c) => c.id === firstId)!;
		const secondCard = gameState.cards.find((c) => c.id === secondId)!;

		if (firstCard.pairId === secondCard.pairId) {
			// Match!
			firstCard.matched = true;
			secondCard.matched = true;
			lastMatchEvent = {
				cardIds: [firstId, secondId],
				playerIndex: gameState.currentPlayerIndex,
				id: Date.now()
			};
			// Increment current player's score
			gameState.config.players[gameState.currentPlayerIndex].score++;
			flippedCardIds = [];
			locked = false;

			// Check game over
			if (gameState.cards.every((c) => c.matched)) {
				gameState.status = 'finished';
			}
		} else {
			// Mismatch — flip back after delay, advance turn
			const playerCount = gameState.config.players.length;
			setTimeout(() => {
				firstCard.flipped = false;
				secondCard.flipped = false;
				flippedCardIds = [];
				gameState.currentPlayerIndex = (gameState.currentPlayerIndex + 1) % playerCount;
				locked = false;
			}, 1300);
		}
	}
}

export function resetGame(): void {
	gameState = createInitialGameState();
	flippedCardIds = [];
	locked = false;
	lastMatchEvent = null;
}

export function restartGame(): void {
	if (gameState.status === 'setup') return;
	initGame(gameState.config);
}

// No $effect here — persistence is handled by the root component
