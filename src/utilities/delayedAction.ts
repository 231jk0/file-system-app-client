export const delayedAction = (action: () => void, delay: number = 200) => {
	setTimeout(() => {
		action();
	}, delay);
};