<script lang="ts">
	import type { Card } from '$lib/types';
	import { getEmojiForCard, getImageForCard } from '$lib/themes';
	import { base } from '$app/paths';

	let { card, disabled, onclick }: { card: Card; disabled: boolean; onclick: () => void } = $props();

	let emoji = $derived(getEmojiForCard(card.theme, card.pairId));
	let imageSrc = $derived.by(() => {
		const path = getImageForCard(card.theme, card.pairId);
		return path ? `${base}${path}` : undefined;
	});

	// Track match transition for celebration animation
	let justMatched = $state(false);
	let prevMatched: boolean | undefined = undefined;

	$effect(() => {
		const isMatched = card.matched;
		if (isMatched && prevMatched === false) {
			justMatched = true;
			setTimeout(() => {
				justMatched = false;
			}, 900);
		}
		prevMatched = isMatched;
	});

	let cardClasses = $derived(
		[
			'relative w-full aspect-square cursor-pointer select-none',
			'transition-transform duration-300 transform-3d',
			card.flipped || card.matched ? '[transform:rotateY(180deg)]' : '',
			card.matched && !justMatched ? 'opacity-30 scale-85 pointer-events-none' : '',
			justMatched ? 'card-celebrate pointer-events-none' : '',
			disabled && !card.flipped && !card.matched ? 'pointer-events-none' : ''
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<button
	class={cardClasses}
	onclick={onclick}
	disabled={disabled && !card.flipped}
	aria-label={card.flipped || card.matched ? emoji : 'Hidden card'}
	style="perspective: 800px;"
>
	<!-- Back of card (visible when face-down) -->
	<div
		class="absolute inset-0 rounded-xl backface-hidden flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 border-2 border-indigo-400 shadow-lg hover:shadow-xl transition-shadow {card.matched ? 'hidden' : ''}"
	>
		<span class="text-2xl text-white/80 font-bold">?</span>
	</div>

	<!-- Front of card (visible when face-up) -->
	<div
		class="card-front absolute inset-0 rounded-xl backface-hidden [transform:rotateY(180deg)] flex items-center justify-center bg-white border-2 border-gray-200 shadow-lg {justMatched ? 'card-front-glow' : ''}"
	>
		{#if imageSrc}
			<img src={imageSrc} alt={emoji} class="w-full h-full object-contain p-1 sm:p-2" />
		{:else}
			<span class="text-3xl sm:text-4xl md:text-5xl">{emoji}</span>
		{/if}
		{#if justMatched}
			<span class="match-star match-star-1">✦</span>
			<span class="match-star match-star-2">✦</span>
			<span class="match-star match-star-3">✦</span>
			<span class="match-star match-star-4">✦</span>
		{/if}
	</div>
</button>

<style>
	.transform-3d {
		transform-style: preserve-3d;
	}

	.backface-hidden {
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
	}

	.card-celebrate {
		animation: celebrate 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@keyframes celebrate {
		0% {
			scale: 1;
		}
		25% {
			scale: 1.25;
		}
		50% {
			scale: 0.95;
		}
		75% {
			scale: 1.15;
		}
		100% {
			scale: 1.05;
		}
	}

	.card-front-glow {
		border-color: #fbbf24;
		box-shadow:
			0 0 15px rgba(251, 191, 36, 0.6),
			0 0 30px rgba(251, 191, 36, 0.3),
			0 0 45px rgba(251, 191, 36, 0.15);
		animation: glow-pulse 0.6s ease-out;
	}

	@keyframes glow-pulse {
		0% {
			box-shadow: 0 0 0 rgba(251, 191, 36, 0);
		}
		30% {
			box-shadow:
				0 0 20px rgba(251, 191, 36, 0.8),
				0 0 40px rgba(251, 191, 36, 0.4),
				0 0 60px rgba(251, 191, 36, 0.2);
		}
		100% {
			box-shadow:
				0 0 15px rgba(251, 191, 36, 0.6),
				0 0 30px rgba(251, 191, 36, 0.3),
				0 0 45px rgba(251, 191, 36, 0.15);
		}
	}

	.match-star {
		position: absolute;
		color: #fbbf24;
		font-size: 0.75rem;
		animation: star-burst 0.6s ease-out forwards;
		pointer-events: none;
	}

	.match-star-1 {
		top: -2px;
		left: 50%;
		animation-delay: 0s;
		--star-x: 0px;
		--star-y: -18px;
	}

	.match-star-2 {
		bottom: -2px;
		left: 50%;
		animation-delay: 0.05s;
		--star-x: 0px;
		--star-y: 18px;
	}

	.match-star-3 {
		top: 50%;
		left: -2px;
		animation-delay: 0.1s;
		--star-x: -18px;
		--star-y: 0px;
	}

	.match-star-4 {
		top: 50%;
		right: -2px;
		animation-delay: 0.15s;
		--star-x: 18px;
		--star-y: 0px;
	}

	@keyframes star-burst {
		0% {
			opacity: 1;
			transform: translate(0, 0) scale(0.5);
		}
		60% {
			opacity: 1;
			transform: translate(var(--star-x), var(--star-y)) scale(1.2);
		}
		100% {
			opacity: 0;
			transform: translate(var(--star-x), var(--star-y)) scale(0);
		}
	}
</style>
