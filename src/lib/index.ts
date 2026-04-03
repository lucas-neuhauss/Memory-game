// Re-export types
export type { Theme, Card, Player, GameConfig, GameState, GameStatus } from './types';

// Re-export stores
export {
	getGameState,
	getStatus,
	getCards,
	getConfig,
	getCurrentPlayerIndex,
	getCurrentPlayer,
	getPlayers,
	isLocked,
	isGameOver,
	getWinner,
	isDraw,
	initGame,
	flipCard,
	resetGame,
	restartGame
} from './stores/game.svelte';

// Re-export theme utilities
export { themeData, getEmojiForCard, getThemes } from './themes';
