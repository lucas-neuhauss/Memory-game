<script lang="ts">
	import HomeScreen from '$lib/components/HomeScreen.svelte';
	import GameScreen from '$lib/components/GameScreen.svelte';
	import { getStatus, hydrateFromStorage, getGameState } from '$lib/stores/game.svelte';
	import { saveState } from '$lib/stores/persistence.svelte';

	let status = $derived(getStatus());

	// Hydrate from localStorage once on mount
	$effect(() => {
		hydrateFromStorage();
	});

	// Persist state changes reactively
	$effect(() => {
		const state = getGameState();
		saveState(state);
	});
</script>

<main class="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4 sm:p-6 md:p-8">
	{#if status === 'setup'}
		<HomeScreen />
	{:else}
		<GameScreen />
	{/if}
</main>
