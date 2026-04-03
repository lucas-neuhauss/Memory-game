<script lang="ts">
	import GameBoard from './GameBoard.svelte';
	import Scoreboard from './Scoreboard.svelte';
	import Confetti from './Confetti.svelte';
	import {
		getGameState,
		getCards,
		getConfig,
		getCurrentPlayerIndex,
		getPlayers,
		getStatus,
		resetGame,
		restartGame
	} from '$lib/stores/game.svelte';

	let showConfirmReset = $state(false);
	let showConfirmRestart = $state(false);
</script>

<div class="flex flex-col gap-4 items-center w-full max-w-2xl mx-auto">
	<!-- Confetti overlay -->
	<Confetti />
	<!-- Header -->
	<div class="flex gap-2 w-full justify-center flex-wrap">
		<button
			onclick={() => (showConfirmReset = true)}
			class="px-4 py-2 rounded-lg text-sm font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
		>
			← Back to Menu
		</button>
		<button
			onclick={() => (showConfirmRestart = true)}
			class="px-4 py-2 rounded-lg text-sm font-semibold bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors"
		>
			🔄 Restart
		</button>
	</div>

	<!-- Scoreboard -->
	<Scoreboard players={getPlayers()} currentPlayerIndex={getCurrentPlayerIndex()} status={getStatus()} />

	<!-- Game Board -->
	<GameBoard
		cards={getCards()}
		gridX={getConfig().gridX}
		gridY={getConfig().gridY}
		disabled={getStatus() === 'finished'}
	/>

	<!-- Game Over actions -->
	{#if getStatus() === 'finished'}
		<div class="flex gap-3 mt-2">
			<button
				onclick={() => restartGame()}
				class="px-6 py-3 rounded-xl text-lg font-bold bg-indigo-500 text-white hover:bg-indigo-600 shadow-lg transition-all active:scale-[0.98]"
			>
				🔄 Play Again
			</button>
			<button
				onclick={() => resetGame()}
				class="px-6 py-3 rounded-xl text-lg font-bold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all active:scale-[0.98]"
			>
				🏠 New Game
			</button>
		</div>
	{/if}

	<!-- Confirmation Modal: Reset -->
	{#if showConfirmReset}
		<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
			<div class="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
				<h3 class="text-lg font-bold text-gray-800 mb-2">Back to Menu?</h3>
				<p class="text-gray-600 mb-4">Your current game progress will be lost.</p>
				<div class="flex gap-3 justify-end">
					<button
						onclick={() => (showConfirmReset = false)}
						class="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
					>
						Cancel
					</button>
					<button
						onclick={() => {
							resetGame();
							showConfirmReset = false;
						}}
						class="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
					>
						Confirm
					</button>
				</div>
			</div>
		</div>
	{/if}

	<!-- Confirmation Modal: Restart -->
	{#if showConfirmRestart}
		<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
			<div class="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
				<h3 class="text-lg font-bold text-gray-800 mb-2">Restart Game?</h3>
				<p class="text-gray-600 mb-4">Scores will be reset and cards reshuffled.</p>
				<div class="flex gap-3 justify-end">
					<button
						onclick={() => (showConfirmRestart = false)}
						class="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
					>
						Cancel
					</button>
					<button
						onclick={() => {
							restartGame();
							showConfirmRestart = false;
						}}
						class="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600"
					>
						Restart
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>
