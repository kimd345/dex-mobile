import { Redirect, Tabs } from 'expo-router';
import { useAuth0 } from 'react-native-auth0';

export default function AppLayout() {
  const { user, getCredentials } = useAuth0();
  console.log('user', user);
  (async () => {
    const credentials = await getCredentials();
    console.log('credentials: ', credentials);
  })();

  if (!user) return <Redirect href={'/sign-in' as any} />;

  return <Tabs />;
}
