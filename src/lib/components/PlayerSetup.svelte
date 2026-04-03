<script lang="ts">
	import type { Player } from '$lib/types';

	let { players, onchange }: { players: Player[]; onchange: (players: Player[]) => void } = $props();

	let count = $state(1);

	function handleCountChange(e: Event) {
		const target = e.target as HTMLInputElement;
		const newCount = Math.max(1, Math.min(4, Number(target.value) || 1));
		count = newCount;
		updatePlayers();
	}

	// Sync count when players prop changes
	$effect(() => {
		count = players.length;
	});

	function handleNameChange(index: number, e: Event) {
		const target = e.target as HTMLInputElement;
		const updated = [...players];
		updated[index] = { ...updated[index], name: target.value || `Player ${index + 1}` };
		onchange(updated);
	}

	function updatePlayers() {
		const updated: Player[] = [];
		for (let i = 0; i < count; i++) {
			if (i < players.length) {
				updated.push({ ...players[i] });
			} else {
				updated.push({ name: `Player ${i + 1}`, score: 0 });
			}
		}
		onchange(updated);
	}
</script>

<div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6">
	<h2 class="text-lg font-bold text-gray-800 mb-3">👥 Players</h2>

	<div class="mb-3">
		<label for="player-count" class="block text-sm font-medium text-gray-600 mb-1">Number of players</label>
		<input
			id="player-count"
			type="number"
			min="1"
			max="4"
			value={count}
			onchange={handleCountChange}
			class="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
		/>
	</div>

	<div class="space-y-2">
		{#each players as player, i}
			<div>
				<label for="player-{i}-name" class="block text-xs font-medium text-gray-500 mb-1"
					>Player {i + 1}</label
				>
				<input
					id="player-{i}-name"
					type="text"
					value={player.name}
					onchange={(e) => handleNameChange(i, e)}
					placeholder="Player {i + 1}"
					class="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
				/>
			</div>
		{/each}
	</div>
</div>
