<script lang="ts">
	import type { Player } from '$lib/types';
	import { getWinner, isDraw, getLastMatchEvent } from '$lib/stores/game.svelte';

	let { players, currentPlayerIndex, status }: { players: Player[]; currentPlayerIndex: number; status: string } = $props();

	let winner = $derived(getWinner());
	let draw = $derived(isDraw());
	let gameOver = $derived(status === 'finished');

	let scoringPlayer = $state<number | null>(null);
	let showPlusOne = $state<number | null>(null);

	$effect(() => {
		const event = getLastMatchEvent();
		if (!event) return;
		scoringPlayer = event.playerIndex;
		showPlusOne = event.playerIndex;
		setTimeout(() => {
			scoringPlayer = null;
		}, 600);
		setTimeout(() => {
			showPlusOne = null;
		}, 900);
	});
</script>

<div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 w-full max-w-2xl mx-auto">
	<h2 class="text-lg font-bold text-gray-800 mb-3 text-center">
		{#if gameOver}
			{#if draw}
				🤝 It's a Draw!
			{:else if winner}
				🏆 {winner.name} Wins!
			{/if}
		{:else}
			Scoreboard
		{/if}
	</h2>

	<div class="flex flex-wrap justify-center gap-3">
		{#each players as player, i}
			<div
				class="player-card relative flex-1 min-w-[120px] max-w-[200px] rounded-xl p-3 text-center transition-all duration-300 {i === currentPlayerIndex && !gameOver
					? 'bg-indigo-100 border-2 border-indigo-400 shadow-md'
					: 'bg-gray-50 border-2 border-transparent'} {scoringPlayer === i ? 'player-scored' : ''}"
			>
				{#if i === currentPlayerIndex && !gameOver}
					<div class="text-xs text-indigo-600 font-semibold mb-1 animate-pulse">◀ Your turn</div>
				{/if}
				<div class="font-semibold text-gray-800 truncate">{player.name}</div>
				<div class="score-number text-2xl font-bold text-indigo-600 {scoringPlayer === i ? 'score-bump' : ''}">
					{player.score}
				</div>
				<div class="text-xs text-gray-500">pairs</div>

				{#if showPlusOne === i}
					<div class="plus-one">+1 ✨</div>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	.player-scored {
		animation: card-flash 0.5s ease-out;
	}

	@keyframes card-flash {
		0% {
			box-shadow: 0 0 0 rgba(251, 191, 36, 0);
			border-color: transparent;
		}
		30% {
			box-shadow:
				0 0 20px rgba(251, 191, 36, 0.6),
				0 0 40px rgba(251, 191, 36, 0.3);
			border-color: #fbbf24;
		}
		100% {
			box-shadow: 0 0 0 rgba(251, 191, 36, 0);
			border-color: transparent;
		}
	}

	.score-bump {
		animation: bump 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@keyframes bump {
		0% {
			transform: scale(1);
		}
		40% {
			transform: scale(1.5);
			color: #f59e0b;
		}
		100% {
			transform: scale(1);
		}
	}

	.plus-one {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		font-size: 1.1rem;
		font-weight: 800;
		color: #f59e0b;
		animation: float-up 0.8s ease-out forwards;
		pointer-events: none;
		white-space: nowrap;
	}

	@keyframes float-up {
		0% {
			opacity: 1;
			transform: translateX(-50%) translateY(0) scale(0.5);
		}
		20% {
			opacity: 1;
			transform: translateX(-50%) translateY(-5px) scale(1.2);
		}
		100% {
			opacity: 0;
			transform: translateX(-50%) translateY(-35px) scale(1);
		}
	}
</style>
