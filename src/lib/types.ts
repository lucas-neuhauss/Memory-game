export type Theme = 'dinosaur' | 'dogs' | 'superheroes';

export interface Card {
	id: string;
	theme: Theme;
	pairId: string;
	flipped: boolean;
	matched: boolean;
}

export interface Player {
	name: string;
	score: number;
}

export interface GameConfig {
	players: Player[];
	gridX: number;
	gridY: number;
	themes: Theme[];
}

export type GameStatus = 'setup' | 'playing' | 'finished';

export interface GameState {
	config: GameConfig;
	cards: Card[];
	currentPlayerIndex: number;
	status: GameStatus;
}
