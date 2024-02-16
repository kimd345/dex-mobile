import { Redirect, Tabs } from 'expo-router';
import { useAuth0 } from 'react-native-auth0';

export default function AppLayout() {
  const { user } = useAuth0();

  // If the user is not logged in, redirect to the sign-in page.
  if (!user) return <Redirect href={'/sign-in' as any} />;

  return <Tabs />;
}
