export interface ConfirmActionModalState {
	title: string;
	text: string;
	primaryButtonText: string;
	secondaryButtonText: string;
	onCancel?: () => void;
	onConfirm?: () => void;
}

export interface ConfirmActionModalActions {
	setConfirmAction: (config: {
		title: string;
		text: string;
		primaryButtonText: string;
		secondaryButtonText: string;
		onCancel?: () => void;
		onConfirm?: () => void;
	}) => void;
}
