export const draggable = (node: HTMLElement, showEditor: boolean) => {
	let moving = $state(false);
	let enabled = showEditor;

	const rect = node.getBoundingClientRect();
	const parentRect = node.offsetParent?.getBoundingClientRect() ?? { left: 0, top: 0 };

	let pos = $state({
		x: rect.left - parentRect.left,
		y: rect.top - parentRect.top
	});

	const initialStyles = {
		// position: node.style.position,
		userSelect: node.style.userSelect,
		cursor: node.style.cursor,
	};

	const onMouseDown = (): void => {
		moving = true;
	};

	const onMouseMove = (e: MouseEvent): void => {
		if (moving) {
			pos.x += e.movementX;
			pos.y += e.movementY;
			node.style.left = pos.x + 'px';
			node.style.top = pos.y + 'px';
		}
	};

	const onMouseUp = () => {
		moving = false;
	};

	const enableDrag = () => {
		node.style.position = 'absolute';
		node.style.left = pos.x + 'px';
		node.style.top = pos.y + 'px';
		node.style.userSelect = 'none';
		node.style.cursor = 'move';

		node.addEventListener('mousedown', onMouseDown);
		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('mouseup', onMouseUp);
	};

	const disableDrag = () => {
		// node.style.position = initialStyles.position;
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
