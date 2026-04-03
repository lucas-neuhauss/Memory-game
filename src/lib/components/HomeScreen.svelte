<script lang="ts">
	import type { Player, Theme } from '$lib/types';
	import PlayerSetup from './PlayerSetup.svelte';
	import GridSetup from './GridSetup.svelte';
	import ThemePicker from './ThemePicker.svelte';
	import { initGame, getStatus } from '$lib/stores/game.svelte';

	let players = $state<Player[]>([{ name: 'Player 1', score: 0 }]);
	let gridX = $state(4);
	let gridY = $state(4);
	let themes = $state<Theme[]>(['dinosaur']);

	let totalCards = $derived(gridX * gridY);
	let isValid = $derived(totalCards % 2 === 0 && themes.length > 0 && players.length > 0);
	let hasPersistedGame = $derived(getStatus() === 'playing' || getStatus() === 'finished');

	function handleStart() {
		if (!isValid) return;
		initGame({ players: players.map((p) => ({ ...p, score: 0 })), gridX, gridY, themes });
	}
</script>

<div class="flex flex-col gap-4 max-w-lg mx-auto">
	<h1 class="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-2">
		🧠 Memory Game
	</h1>
	<p class="text-center text-gray-500 mb-4">Match pairs of cards to win!</p>

	{#if hasPersistedGame}
		<div class="bg-amber-50 border border-amber-300 rounded-xl p-3 text-center text-amber-800 text-sm">
			You have a game in progress.
		</div>
	{/if}

	<PlayerSetup {players} onchange={(p) => (players = p)} />
	<GridSetup {gridX} {gridY} onchange={(x, y) => { gridX = x; gridY = y; }} />
	<ThemePicker selectedThemes={themes} onchange={(t) => (themes = t)} />

	<button
		onclick={handleStart}
		disabled={!isValid}
		class="w-full py-3 rounded-xl text-lg font-bold text-white transition-all {isValid
			? 'bg-indigo-500 hover:bg-indigo-600 shadow-lg hover:shadow-xl active:scale-[0.98]'
			: 'bg-gray-300 cursor-not-allowed'}"
	>
		🎮 Start Game
	</button>
</div>
