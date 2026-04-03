<script lang="ts">
	let { gridX, gridY, onchange }: { gridX: number; gridY: number; onchange: (x: number, y: number) => void } = $props();

	let total = $derived(gridX * gridY);
	let isOdd = $derived(total % 2 !== 0);

	const sizes = [2, 3, 4, 5, 6];
</script>

<div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6">
	<h2 class="text-lg font-bold text-gray-800 mb-3">📐 Grid Size</h2>

	<div class="flex gap-6 flex-wrap">
		<div class="flex-1 min-w-[120px]">
			<span class="block text-sm font-medium text-gray-600 mb-2">Columns</span>
			<div class="flex gap-1">
				{#each sizes as s}
					<button
						onclick={() => onchange(s, gridY)}
						class="w-10 h-10 rounded-lg text-sm font-bold transition-all {gridX === s
							? 'bg-indigo-500 text-white shadow-md'
							: 'bg-gray-100 text-gray-600 hover:bg-gray-200'}"
					>
						{s}
					</button>
				{/each}
			</div>
		</div>

		<div class="flex-1 min-w-[120px]">
			<span class="block text-sm font-medium text-gray-600 mb-2">Rows</span>
			<div class="flex gap-1">
				{#each sizes as s}
					<button
						onclick={() => onchange(gridX, s)}
						class="w-10 h-10 rounded-lg text-sm font-bold transition-all {gridY === s
							? 'bg-indigo-500 text-white shadow-md'
							: 'bg-gray-100 text-gray-600 hover:bg-gray-200'}"
					>
						{s}
					</button>
				{/each}
			</div>
		</div>
	</div>

	<div class="mt-3 text-center">
		<span class="text-2xl font-bold text-gray-800">{total}</span>
		<span class="text-sm text-gray-500 ml-1">cards</span>
		{#if isOdd}
			<div class="text-red-500 text-sm mt-1">⚠️ Total must be even for pairs!</div>
		{/if}
	</div>
</div>
