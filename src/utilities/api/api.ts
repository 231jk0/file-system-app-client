import { FetchWrapper } from './fetchWrapper';

import config from '@/src/config/config';

export const api = new FetchWrapper(config.serverIpAddress);