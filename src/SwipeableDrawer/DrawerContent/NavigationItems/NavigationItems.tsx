import FolderIcon from '@mui/icons-material/Folder';
import SettingsIcon from '@mui/icons-material/Settings';
import { List } from '@mui/material';
import { memo } from 'react';

import NavigationItem from './NavigationItem';

import { FILE_BROWSER_BASE_PATH } from '@/src/utilities/folderPathNavigation';

const menuItems = [
	{
		text: 'File Browser',
		icon: <FolderIcon />,
		path: FILE_BROWSER_BASE_PATH,
	},
	{
		text: 'Settings',
		icon: <SettingsIcon />,
		path: '/settings',
	},
];

const NavigationItems = () => {
	return (
		<List>
			{menuItems.map(item => (
				<NavigationItem
					key={item.text}
					{...item}
				/>
			))}
		</List>
	);
};

export default memo(NavigationItems);
