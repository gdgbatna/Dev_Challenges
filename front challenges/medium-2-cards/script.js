const cards = Array.from(document.getElementsByClassName('card'));
const content_boxes = [];
for (let card of cards) {
	content_boxes.push(card.getElementsByClassName('content')[0]);
}
const content = content_boxes.map((element) => element.innerText);
const content_states = content_boxes.map((element) => ({
	index: 0,
	state: false,
	max: element.innerText.split(' ').length,
}));

const increment_listener = (index) => {
	return () => {
		content_states[index].state = true;
	};
};
const decrement_listener = (index) => {
	return () => {
		content_states[index].state = false;
	};
};

for (let index in cards) {
	cards[index].addEventListener('mouseenter', increment_listener(index));
	cards[index].addEventListener('mouseleave', decrement_listener(index));
}

setInterval(() => {
	content_boxes.forEach((box, index) => {
		content_states[index].index += content_states[index].state ? 0.5 : -1;
		content_states[index].index = Math.max(
			10,
			Math.min(content_states[index].index, content_states[index].max)
		);
		const innerText = content[index]
			.split(' ')
			.slice(0, content_states[index].index)
			.join(' ');
		// this is so you can select from paragraph
		if (box.innerText != innerText) box.innerText = innerText;
		if (content_states[index].index < content_states[index].max)
			box.innerText += '...';
	});
}, 20);
