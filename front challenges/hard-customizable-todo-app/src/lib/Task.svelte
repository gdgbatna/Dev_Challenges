<script lang="ts">
	import type { Task } from './types';
	export let task: Task;
	const startEditing = () => {
		task.state = 'editing';
		setTimeout(() => {
			inputField.focus();
		}, 10);
	};
	const endEditing = () => {
		task.state = 'static';
	};
	let inputField: HTMLInputElement;
	setTimeout(() => {
		if (task.state == 'editing') startEditing();
	}, 10);
</script>

<div>
	{#if task.state !== 'editing'}
		<p on:dblclick={startEditing}>
			{task.task}
		</p>
		<button on:click={startEditing}>e</button>
		<button>x</button>
	{:else}
		<input
			type="text"
			bind:value={task.task}
			on:focusout={() => {
				task.state = 'static';
			}}
			bind:this={inputField}
		/>
		&nbsp;
		<button on:click={endEditing}>c</button>
	{/if}
</div>

<style>
	div {
		color: #444;
		background-color: #fff;
		margin-bottom: 10px;
		padding: 10px;
		border-radius: 15px;
		border: solid 1px #999;
		display: grid;
		grid-template-columns: 1fr auto auto;
		gap: 5px;
	}
	p {
		margin: 0;
		outline: none;
	}
	input {
		outline: none !important;
		border: none;
		font-family: inherit;
		font-size: inherit;
		color: black;
		padding: 0;
	}
	button {
		width: 25px;
		height: 25px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 10px;
		border: solid 1px #999;
		background-color: white;
		cursor: pointer;
	}
	button:hover {
		background-color: #f0f0f0;
	}
</style>
