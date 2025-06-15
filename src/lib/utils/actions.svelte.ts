export const draggable = (node: HTMLElement, showEditor: boolean) => {
	let moving = $state(false);
	let enabled = showEditor;

	let pos = $state({ x: 0, y: 0 });

	const initialStyles = {
		userSelect: node.style.userSelect,
		cursor: node.style.cursor,
		transform: node.style.transform
	};

	const onMouseDown = (): void => {
		moving = true;
	};

	const onMouseMove = (e: MouseEvent): void => {
		if (moving) {
			pos.x += e.movementX;
			pos.y += e.movementY;
			node.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
		}
	};

	const onMouseUp = () => {
		moving = false;
	};

	const enableDrag = () => {
		node.style.userSelect = 'none';
		node.style.cursor = 'move';

		node.addEventListener('mousedown', onMouseDown);
		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('mouseup', onMouseUp);
	};

	const disableDrag = () => {
		node.style.userSelect = initialStyles.userSelect;
		node.style.cursor = initialStyles.cursor;

		node.removeEventListener('mousedown', onMouseDown);
		window.removeEventListener('mousemove', onMouseMove);
		window.removeEventListener('mouseup', onMouseUp);
	};

	// Init
	if (enabled) enableDrag();

	return {
		update(newShowEditor: boolean) {
			if (newShowEditor !== enabled) {
				enabled = newShowEditor;
				if (enabled) {
					enableDrag();
				} else {
					disableDrag();
				}
			}
		},
		destroy() {
			disableDrag();
		}
	};
};
