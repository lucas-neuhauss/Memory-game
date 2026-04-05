<script lang="ts">
	import type { Card } from '$lib/types';
	import CardComponent from './Card.svelte';
	import { flipCard, isLocked } from '$lib/stores/game.svelte';

	let { cards, gridX, gridY, disabled }: { cards: Card[]; gridX: number; gridY: number; disabled: boolean } = $props();

	let boardLocked = $derived(disabled || isLocked());
</script>

<div
	class="game-board grid gap-2 sm:gap-3 w-full max-w-2xl mx-auto"
	style="grid-template-columns: repeat({gridX}, 1fr);"
>
	{#each cards as card (card.id)}
		<CardComponent {card} disabled={boardLocked} onclick={() => flipCard(card.id)} />
	{/each}
</div>
