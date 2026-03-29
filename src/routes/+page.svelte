<script lang="ts">
	import GameShell from '$lib/components/GameShell.svelte';
	import { strings } from '$lib/content';
</script>

<svelte:head>
	<title>{strings.meta.title}</title>
</svelte:head>

<GameShell />
