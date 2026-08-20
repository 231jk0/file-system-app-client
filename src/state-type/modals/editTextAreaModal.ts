export interface EditTextAreaModalState {
	title: string;
	initialValue: string;
	onConfirm?: (value: string) => void;
	onCleanup?: (value: string) => void;
}

export interface EditTextAreaModalActions {
	setEditTextAreaModal: (config: { title: string; initialValue: string; onConfirm: (value: string) => void; onCleanup: (value: string) => void }) => void;
}