<script lang="ts">
	import { writable, type Writable } from 'svelte/store';
	import type { TaskList } from '$lib/types';
	import Column from '$lib/Column.svelte';

	const state: Writable<TaskList[]> = writable([
		{
			name: 'to-do',
			tasks: [
				{ task: 'clean dishes', state: 'static' },
				{ task: 'eat food', state: 'static' },
				{ task: 'make food', state: 'static' },
			],
			state: 'static',
		},
	]);
</script>

<main>
	{#each $state as list}
		<Column {list} />
	{/each}
	<div class="buttons">
		<button on:click={() => console.log($state)}>L</button>
		<button
			on:click={() =>
				state.update((state) => [
					...state,
					{
						name: 'to-do',
						tasks: [{ task: '', state: 'editing' }],
						state: 'static',
					},
				])}>+</button
		>
	</div>
</main>

<style>
	main {
		min-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 30px;
		position: relative;
	}
	.buttons {
		position: absolute;
		bottom: 30px;
		right: 35px;
		display: flex;
		gap: 10px;
	}
	button {
		width: 40px;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;
		font-weight: 100;
		border-radius: 18px;
		border: solid 1px #999;
		cursor: pointer;
		background: white;
	}
	button:hover {
		background-color: #f0f0f0;
	}
</style>
