<script lang="ts">
	import type { TaskList } from '$lib/types';
	import TaskElement from '$lib/Task.svelte';
	export let list: TaskList;

	const startRename = () => {
		list.state = 'rename';
		setTimeout(() => {
			nameElement.focus();
			let range = document.createRange();
			let selection = window.getSelection();
			range.selectNodeContents(nameElement);
			range.collapse(false);
			selection?.removeAllRanges();
			selection?.addRange(range);
		}, 10);
	};
	const endRename = () => {
		list.state = 'static';
	};
	let nameElement: HTMLElement;
</script>

<div class="col">
	<h2
		contenteditable={list.state == 'rename'}
		on:dblclick={startRename}
		on:focusout={endRename}
		bind:this={nameElement}
		style={list.state == 'delete' ? 'background: red' : ''}
	>
		{list.name}
	</h2>
	<div class="content">
		{#each list.tasks as task}
			<TaskElement {task} />
		{/each}
	</div>
	<div class="buttons">
		<button
			on:click={() => {
				list.state = 'delete';
			}}>-</button
		>
		<button
			on:click={() => {
				list.tasks = [...list.tasks, { task: '', state: 'editing' }];
			}}>+</button
		>
	</div>
</div>

<style>
	.col {
		width: 300px;
		height: 400px;
		background-color: #f7f7f7;
		border: solid 1px #999;
		border-radius: 30px;
		overflow: hidden;
		display: grid;
		grid-template-rows: auto 1fr;
		position: relative;
		/* resize: both; */
		overflow: hidden;
	}
	.col > h2 {
		margin: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		flex-direction: column;
		background-color: #4fc26c;
		color: white;
		font-weight: 400;
		border-bottom: solid 1px #999;
		outline: none;
		min-height: 40px;
		padding: 10px;
	}
	.col > h2:hover,
	.col > h2:focus {
		text-decoration: underline dotted 5px;
	}
	.content {
		overflow-y: auto;
		overflow-x: hidden;
		scrollbar-width: thin;
		padding: 10px 10px 40px 10px;
	}
	.buttons {
		position: absolute;
		bottom: 13px;
		right: 15px;
		display: flex;
		gap: 8px;
	}
	button {
		width: 30px;
		height: 30px;
		font-size: 18px;
		background-color: white;
		border-radius: 13px;
		border: solid 1px #999;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
	button:hover {
		background-color: #f0f0f0;
	}
</style>
