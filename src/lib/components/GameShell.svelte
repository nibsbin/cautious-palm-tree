<script lang="ts">
	import { onMount } from 'svelte';

	import { content } from '$lib/content';
	import { LOVE, loveBand } from '$lib/game/economy';
	import { pet } from '$lib/game/pet';
	import { love, money } from '$lib/game/state';
	import { startTickLoop } from '$lib/game/tick';

	const { strings, shop } = content;

	let disposeTick: (() => void) | undefined;

	onMount(() => {
		disposeTick = startTickLoop();
		return () => disposeTick?.();
	});

	function formatMoney(n: number): string {
		return strings.hud.moneyFormat.replace('{value}', n.toFixed(2));
	}

	function moodLine(loveValue: number): string {
		const band = loveBand(loveValue);
		return strings.mood[band];
	}

	function lovePercent(loveValue: number): number {
		return (loveValue / LOVE.MAX) * 100;
	}

	function handlePet(): void {
		pet();
	}

	function handlePetKey(e: KeyboardEvent): void {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			pet();
		}
	}
</script>

<div
	class="mx-auto flex min-h-screen min-w-[960px] max-w-6xl flex-col gap-6 p-6 md:flex-row md:gap-10"
>
	<!-- Main stage -->
	<section class="card preset-tonal-surface flex flex-1 flex-col items-center justify-center gap-6 p-8">
		<p class="text-surface-600-400 text-sm">{strings.stage.petHint}</p>
		<button
			type="button"
			class="cursor-pointer rounded-2xl border-4 border-transparent bg-transparent p-0 transition hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
			onclick={handlePet}
			onkeydown={handlePetKey}
			aria-label={strings.stage.petHint}
		>
			<img
				src="/puppy.svg"
				alt=""
				width="280"
				height="280"
				class="pointer-events-none select-none drop-shadow-md"
				draggable="false"
			/>
		</button>
	</section>

	<!-- Right pane -->
	<aside class="flex w-full flex-col gap-4 md:w-96 md:shrink-0">
		<div class="card preset-tonal-surface p-5">
			<h2 class="h2 mb-4 font-semibold">{strings.hud.loveLabel}</h2>
			<div
				class="bg-surface-200-800 relative h-4 w-full overflow-hidden rounded-full"
				role="meter"
				aria-valuemin={LOVE.MIN}
				aria-valuemax={LOVE.MAX}
				aria-valuenow={$love}
				aria-label={strings.hud.loveLabel}
			>
				<div
					class="bg-primary-500 h-full rounded-full transition-[width] duration-300 ease-out"
					style="width: {lovePercent($love)}%"
				></div>
			</div>
			<p class="text-surface-600-400 mt-2 text-sm tabular-nums">
				{Math.round($love)} / {LOVE.MAX}
			</p>
		</div>

		<div class="card preset-tonal-surface p-5">
			<h2 class="h2 mb-1 font-semibold">{strings.hud.moneyLabel}</h2>
			<p class="text-3xl font-bold tabular-nums">{formatMoney($money)}</p>
		</div>

		<div class="card preset-tonal-surface p-5">
			<p class="text-surface-600-400 text-sm leading-relaxed">{moodLine($love)}</p>
		</div>

		<div class="card preset-tonal-surface p-5">
			<h2 class="h2 mb-3 font-semibold">{strings.shop.title}</h2>
			<p class="text-surface-600-400 mb-4 text-sm">{strings.shop.disabledHint}</p>
			<ul class="flex flex-col gap-3">
				{#each shop.items as item (item.id)}
					<li class="preset-tonal-primary flex flex-col gap-1 rounded-lg p-3 text-sm">
						<div class="flex items-start justify-between gap-2">
							<span class="font-medium">{item.label}</span>
							<span class="shrink-0 tabular-nums">{item.price} ¢</span>
						</div>
						<p class="text-surface-600-400 text-xs leading-snug">{item.description}</p>
						<div class="mt-2 flex items-center justify-between gap-2">
							<span class="text-surface-500-500 text-xs uppercase tracking-wide"
								>{item.effectType}</span
							>
							<button type="button" class="btn btn-sm preset-filled-surface-200-800" disabled>
								{strings.shop.buyLabel}
							</button>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</aside>
</div>
