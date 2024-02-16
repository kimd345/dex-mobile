import { router } from 'expo-router';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { useAuth0 } from 'react-native-auth0';

const SignIn = () => {
  const { authorize, isLoading, hasValidCredentials, user } = useAuth0();
  (async () => {
    const isValidCredentials = await hasValidCredentials();
    console.log('isValidCredentials: ', isValidCredentials);
  })();
  console.log('user', user);

  const onLogin = async () => {
    try {
      await authorize({ additionalParameters: { prompt: 'login' } }).then((credentials) => {
        // Alert.alert('AccessToken: ' + credentials.accessToken);
        if (credentials?.accessToken !== null) {
          router.replace('/(app)');
        }
      });
    } catch (e) {
      console.log('Error: ', e);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-slate-400">
      <Text> UNIQR Sign In </Text>
      <Text>{user?.name || 'null'}</Text>
      <Button onPress={onLogin} title="Log In" />
    </View>
  );
};

export default SignIn;
