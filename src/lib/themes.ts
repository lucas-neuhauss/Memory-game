import type { Theme } from './types';

/**
 * Each theme has 18 unique card types (enough for 6×6 grid = 36 cards = 18 pairs).
 * When multiple themes are selected, pairs are distributed evenly across them.
 */
export const themeData: Record<Theme, { name: string; icon: string; cards: { pairId: string; emoji: string }[] }> = {
	dinosaur: {
		name: 'Dinosaurs',
		icon: '🦕',
		cards: [
			{ pairId: 'dino-trex', emoji: '🦖' },
			{ pairId: 'dino-bronto', emoji: '🦕' },
			{ pairId: 'dino-egg', emoji: '🥚' },
			{ pairId: 'dino-leaf', emoji: '🌿' },
			{ pairId: 'dino-volcano', emoji: '🌋' },
			{ pairId: 'dino-bone', emoji: '🦴' },
			{ pairId: 'dino-footprint', emoji: '🦶' },
			{ pairId: 'dino-fossil', emoji: '🪨' },
			{ pairId: 'dino-fern', emoji: '☘️' },
			{ pairId: 'dino-palm', emoji: '🌴' },
			{ pairId: 'dino-lizard', emoji: '🦎' },
			{ pairId: 'dino-croc', emoji: '🐊' },
			{ pairId: 'dino-turtle', emoji: '🐢' },
			{ pairId: 'dino-snake', emoji: '🐍' },
			{ pairId: 'dino-dragon', emoji: '🐉' },
			{ pairId: 'dino-mushroom', emoji: '🍄' },
			{ pairId: 'dino-butterfly', emoji: '🦋' },
			{ pairId: 'dino-bug', emoji: '🪲' }
		]
	},
	dogs: {
		name: 'Dogs',
		icon: '🐕',
		cards: [
			{ pairId: 'dog-dog', emoji: '🐕' },
			{ pairId: 'dog-poodle', emoji: '🐩' },
			{ pairId: 'dog-service', emoji: '🐕‍🦺' },
			{ pairId: 'dog-bone', emoji: '🦴' },
			{ pairId: 'dog-ball', emoji: '⚽' },
			{ pairId: 'dog-frisbee', emoji: '🥏' },
			{ pairId: 'dog-house', emoji: '🏠' },
			{ pairId: 'dog-paw', emoji: '🐾' },
			{ pairId: 'dog-leash', emoji: '🪢' },
			{ pairId: 'dog-bath', emoji: '🛁' },
			{ pairId: 'dog-treat', emoji: '🥩' },
			{ pairId: 'dog-heart', emoji: '❤️' },
			{ pairId: 'dog-star', emoji: '⭐' },
			{ pairId: 'dog-sun', emoji: '☀️' },
			{ pairId: 'dog-moon', emoji: '🌙' },
			{ pairId: 'dog-fire', emoji: '🔥' },
			{ pairId: 'dog-rainbow', emoji: '🌈' },
			{ pairId: 'dog-crown', emoji: '👑' }
		]
	},
	superheroes: {
		name: 'Superheroes',
		icon: '🦸',
		cards: [
			{ pairId: 'hero-hero', emoji: '🦸' },
			{ pairId: 'hero-villain', emoji: '🦹' },
			{ pairId: 'hero-lightning', emoji: '⚡' },
			{ pairId: 'hero-fire', emoji: '🔥' },
			{ pairId: 'hero-shield', emoji: '🛡️' },
			{ pairId: 'hero-sword', emoji: '⚔️' },
			{ pairId: 'hero-cape', emoji: '🧣' },
			{ pairId: 'hero-mask', emoji: '🎭' },
			{ pairId: 'hero-star', emoji: '⭐' },
			{ pairId: 'hero-crystal', emoji: '💎' },
			{ pairId: 'hero-ring', emoji: '💍' },
			{ pairId: 'hero-crown', emoji: '👑' },
			{ pairId: 'hero-rocket', emoji: '🚀' },
			{ pairId: 'hero-bomb', emoji: '💣' },
			{ pairId: 'hero-web', emoji: '🕸️' },
			{ pairId: 'hero-globe', emoji: '🌍' },
			{ pairId: 'hero-alien', emoji: '👾' },
			{ pairId: 'hero-robot', emoji: '🤖' }
		]
	}
};

export function getEmojiForCard(theme: Theme, pairId: string): string {
	const cards = themeData[theme].cards;
	const card = cards.find((c) => c.pairId === pairId);
	return card?.emoji ?? '❓';
}

/** Get available themes as an array */
export function getThemes(): Theme[] {
	return ['dinosaur', 'dogs', 'superheroes'];
}
