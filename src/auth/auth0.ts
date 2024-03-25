import Auth0 from 'react-native-auth0';

import config from './auth0-configuration';
const auth0 = new Auth0(config);

export default auth0;
