<script lang="ts">
	import type { Theme } from '$lib/types';
	import { themeData, getThemes } from '$lib/themes';

	let { selectedThemes, onchange }: { selectedThemes: Theme[]; onchange: (themes: Theme[]) => void } = $props();

	function toggleTheme(theme: Theme) {
		if (selectedThemes.includes(theme)) {
			// Don't allow deselecting if it's the last one
			if (selectedThemes.length <= 1) return;
			onchange(selectedThemes.filter((t) => t !== theme));
		} else {
			onchange([...selectedThemes, theme]);
		}
	}
</script>

<div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6">
	<h2 class="text-lg font-bold text-gray-800 mb-3">🎨 Themes</h2>
	<p class="text-xs text-gray-500 mb-3">Select at least one theme. Cards will be mixed from selected themes.</p>

	<div class="flex gap-3 flex-wrap">
		{#each getThemes() as theme}
			{@const data = themeData[theme]}
			{@const isSelected = selectedThemes.includes(theme)}
			<button
				onclick={() => toggleTheme(theme)}
				class="flex-1 min-w-[100px] rounded-xl p-4 text-center transition-all border-2 {isSelected
					? 'border-indigo-500 bg-indigo-50 shadow-md scale-105'
					: 'border-gray-200 bg-gray-50 hover:bg-gray-100'}"
			>
				<div class="text-3xl mb-1">{data.icon}</div>
				<div class="text-sm font-semibold text-gray-800">{data.name}</div>
			</button>
		{/each}
	</div>
</div>
