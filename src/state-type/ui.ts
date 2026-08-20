export interface UIState {
	drawerMode: 'temporary' | 'persistent';
	drawerOpen: boolean;
}

export interface UIActions {
	setDrawerOpen: (open: boolean) => void;
	setDrawerMode: (mode: 'temporary' | 'persistent') => void;
}
