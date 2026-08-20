import AppBar from '@/src/components/AppBar/AppBar';
import OpenMenuButton from '@/src/components/AppBar/OpenMenuButton';
import ToolbarTitle from '@/src/components/AppBar/ToolbarTitle';

export default function SettingsAppBar() {
	return (
		<AppBar>
			<OpenMenuButton />
			<ToolbarTitle title="Settings" />
		</AppBar>
	);
}
