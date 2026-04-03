<script lang="ts">
	import { getLastMatchEvent } from '$lib/stores/game.svelte';

	const COLORS = ['#fbbf24', '#f472b6', '#60a5fa', '#34d399', '#a78bfa', '#fb923c', '#f87171', '#2dd4bf'];

	interface Particle {
		id: number;
		x: number;
		y: number;
		color: string;
		size: number;
		rotation: number;
		delay: number;
		shape: 'circle' | 'square' | 'triangle';
	}

	let particles = $state<Particle[]>([]);

	$effect(() => {
		const event = getLastMatchEvent();
		if (!event) return;

		const burst: Particle[] = Array.from({ length: 28 }, (_, i) => ({
			id: event.id + i,
			x: (Math.random() - 0.5) * 260,
			y: (Math.random() - 0.5) * 260,
			color: COLORS[Math.floor(Math.random() * COLORS.length)],
			size: Math.random() * 8 + 4,
			rotation: Math.random() * 720 - 360,
			delay: Math.random() * 0.15,
			shape: (['circle', 'square', 'triangle'] as const)[Math.floor(Math.random() * 3)]
		}));

		particles = burst;
		setTimeout(() => {
			particles = [];
		}, 1100);
	});
</script>

<div class="confetti-container">
	{#each particles as p (p.id)}
		<div
			class="confetti-particle"
			style="
				--tx: {p.x}px;
				--ty: {p.y}px;
				--rot: {p.rotation}deg;
				--delay: {p.delay}s;
				--size: {p.size}px;
				--color: {p.color};
			"
			class:confetti-circle={p.shape === 'circle'}
			class:confetti-square={p.shape === 'square'}
			class:confetti-triangle={p.shape === 'triangle'}
		></div>
	{/each}
</div>

<style>
	.confetti-container {
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.confetti-particle {
		position: absolute;
		animation: confetti-burst 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) var(--delay) forwards;
		animation-delay: var(--delay);
	}

	.confetti-circle {
		width: var(--size);
		height: var(--size);
		border-radius: 50%;
		background: var(--color);
	}

	.confetti-square {
		width: var(--size);
		height: var(--size);
		border-radius: 2px;
		background: var(--color);
	}

	.confetti-triangle {
		width: 0;
		height: 0;
		border-left: calc(var(--size) * 0.5) solid transparent;
		border-right: calc(var(--size) * 0.5) solid transparent;
		border-bottom: var(--size) solid var(--color);
	}

	@keyframes confetti-burst {
		0% {
			transform: translate(0, 0) rotate(0deg) scale(1);
			opacity: 1;
		}
		70% {
			opacity: 1;
		}
		100% {
			transform: translate(var(--tx), var(--ty)) rotate(var(--rot)) scale(0.3);
			opacity: 0;
		}
	}
</style>
