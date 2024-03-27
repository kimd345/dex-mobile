import { Link } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { Button, Switch, Text, View } from 'react-native';
import { useAuth0 } from 'react-native-auth0';

export default function SecondPage() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { clearCredentials } = useAuth0();
  const onLogout = async () => {
    await clearCredentials();
  };
  console.log('colorScheme', colorScheme);

  return (
    <View className="flex-1 justify-center items-center gap-4">
      <View className="flex-row justify-center items-center">
        <Text>Toggle Theme</Text>
        <Switch value={colorScheme === 'dark'} onChange={toggleColorScheme} />
      </View>
      <Link href="/(app)">Go to the first page</Link>
      <Button onPress={onLogout} title="Log Out" />
    </View>
  );
}
