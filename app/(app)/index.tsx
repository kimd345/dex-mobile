import { Link } from 'expo-router';
import { Button } from 'react-native';
import { useAuth0 } from 'react-native-auth0';

export default function HomePage() {
  const { clearCredentials } = useAuth0();
  const onLogout = async () => {
    await clearCredentials();
  };

  return (
    <>
      <Link href="/two">Go to screen 2</Link>
      <Button onPress={onLogout} title="Log Out" />
    </>
  );
}
