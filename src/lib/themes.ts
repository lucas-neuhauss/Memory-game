import type { Theme } from "./types";

/**
 * Each theme has 18 unique card types (enough for 6×6 grid = 36 cards = 18 pairs).
 * When multiple themes are selected, pairs are distributed evenly across them.
 */
export const themeData: Record<
  Theme,
  {
    name: string;
    icon: string;
    cards: { pairId: string; emoji: string; image?: string }[];
  }
> = {
  dinosaur: {
    name: "Dinosaurs",
    icon: "🦕",
    cards: [
      {
        pairId: "dino-trex",
        emoji: "🦖",
        image: "/images/dinosaur/dino-trex.png",
      },
      {
        pairId: "dino-bronto",
        emoji: "🦕",
        image: "/images/dinosaur/dino-bronto.png",
      },
      {
        pairId: "dino-egg",
        emoji: "🥚",
        image: "/images/dinosaur/dino-egg.png",
      },
      {
        pairId: "dino-leaf",
        emoji: "🌿",
        image: "/images/dinosaur/dino-leaf.png",
      },
      {
        pairId: "dino-volcano",
        emoji: "🌋",
        image: "/images/dinosaur/dino-volcano.png",
      },
      {
        pairId: "dino-bone",
        emoji: "🦴",
        image: "/images/dinosaur/dino-bone.png",
      },
      {
        pairId: "dino-footprint",
        emoji: "🦶",
        image: "/images/dinosaur/dino-footprint.png",
      },
      {
        pairId: "dino-fossil",
        emoji: "🪨",
        image: "/images/dinosaur/dino-fossil.png",
      },
      {
        pairId: "dino-fern",
        emoji: "☘️",
        image: "/images/dinosaur/dino-fern.png",
      },
      {
        pairId: "dino-palm",
        emoji: "🌴",
        image: "/images/dinosaur/dino-palm.png",
      },
      {
        pairId: "dino-lizard",
        emoji: "🦎",
        image: "/images/dinosaur/dino-lizard.png",
      },
      {
        pairId: "dino-croc",
        emoji: "🐊",
        image: "/images/dinosaur/dino-croc.png",
      },
      {
        pairId: "dino-turtle",
        emoji: "🐢",
        image: "/images/dinosaur/dino-turtle.png",
      },
      {
        pairId: "dino-snake",
        emoji: "🐍",
        image: "/images/dinosaur/dino-snake.png",
      },
      {
        pairId: "dino-dragon",
        emoji: "🐉",
        image: "/images/dinosaur/dino-dragon.png",
      },
      {
        pairId: "dino-mushroom",
        emoji: "🍄",
        image: "/images/dinosaur/dino-mushroom.png",
      },
      {
        pairId: "dino-butterfly",
        emoji: "🦋",
        image: "/images/dinosaur/dino-butterfly.png",
      },
      {
        pairId: "dino-bug",
        emoji: "🪲",
        image: "/images/dinosaur/dino-bug.png",
      },
    ],
  },
  dogs: {
    name: "Dogs",
    icon: "🐕",
    cards: [
      { pairId: "dog-dog", emoji: "🐕" },
      { pairId: "dog-poodle", emoji: "🐩" },
      { pairId: "dog-service", emoji: "🐕‍🦺" },
      { pairId: "dog-bone", emoji: "🦴" },
      { pairId: "dog-ball", emoji: "⚽" },
      { pairId: "dog-frisbee", emoji: "🥏" },
      { pairId: "dog-house", emoji: "🏠" },
      { pairId: "dog-paw", emoji: "🐾" },
      { pairId: "dog-leash", emoji: "🪢" },
      { pairId: "dog-bath", emoji: "🛁" },
      { pairId: "dog-treat", emoji: "🥩" },
      { pairId: "dog-heart", emoji: "❤️" },
      { pairId: "dog-star", emoji: "⭐" },
      { pairId: "dog-sun", emoji: "☀️" },
      { pairId: "dog-moon", emoji: "🌙" },
      { pairId: "dog-fire", emoji: "🔥" },
      { pairId: "dog-rainbow", emoji: "🌈" },
      { pairId: "dog-crown", emoji: "👑" },
    ],
  },
  superheroes: {
    name: "Superheroes",
    icon: "🦸",
    cards: [
      { pairId: "hero-hero", emoji: "🦸" },
      { pairId: "hero-villain", emoji: "🦹" },
      { pairId: "hero-lightning", emoji: "⚡" },
      { pairId: "hero-fire", emoji: "🔥" },
      { pairId: "hero-shield", emoji: "🛡️" },
      { pairId: "hero-sword", emoji: "⚔️" },
      { pairId: "hero-cape", emoji: "🧣" },
      { pairId: "hero-mask", emoji: "🎭" },
      { pairId: "hero-star", emoji: "⭐" },
      { pairId: "hero-crystal", emoji: "💎" },
      { pairId: "hero-ring", emoji: "💍" },
      { pairId: "hero-crown", emoji: "👑" },
      { pairId: "hero-rocket", emoji: "🚀" },
      { pairId: "hero-bomb", emoji: "💣" },
      { pairId: "hero-web", emoji: "🕸️" },
      { pairId: "hero-globe", emoji: "🌍" },
      { pairId: "hero-alien", emoji: "👾" },
      { pairId: "hero-robot", emoji: "🤖" },
    ],
  },
};

export function getEmojiForCard(theme: Theme, pairId: string): string {
  const cards = themeData[theme].cards;
  const card = cards.find((c) => c.pairId === pairId);
  return card?.emoji ?? "❓";
}

export function getImageForCard(
  theme: Theme,
  pairId: string,
): string | undefined {
  const cards = themeData[theme].cards;
  const card = cards.find((c) => c.pairId === pairId);
  return card?.image;
}

/** Get available themes as an array */
export function getThemes(): Theme[] {
  return ["dinosaur", "dogs", "superheroes"];
}
