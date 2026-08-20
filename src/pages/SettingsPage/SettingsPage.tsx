import { Box } from '@mui/material';

import AppBar from './AppBar';
import AppearanceSettingsSection from './AppearanceSettingsSection/AppearanceSettingsSection';
import SettingsSection from './SettingsSection';

import AppContainer from '@/src/components/AppContainer/AppContainer';

const SettingsPage = () => {
	return (
		<>
			<AppBar />
			<AppContainer
				sx={{ pt: '16px !important' }}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 0.5,
						mx: 'auto',
						width: '100%',
					}}
				>
					<SettingsSection title="Appearance">
						<AppearanceSettingsSection />
					</SettingsSection>
				</Box>
			</AppContainer>
		</>
	);
};

export default SettingsPage;
