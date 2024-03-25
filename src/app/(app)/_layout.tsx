import { Redirect, Tabs } from 'expo-router';
import { View } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AppLayout() {
  const { user, isLoading } = useAuth0();
  const insets = useSafeAreaInsets();

  // If the user is still loading, return null.
  if (isLoading) return <></>;

  // If the user is not logged in, redirect to the sign-in page.
  if (!user) return <Redirect href={'/sign-in' as any} />;

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <Tabs screenOptions={{ headerShown: false }} />
    </View>
  );
}
