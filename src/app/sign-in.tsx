import { router } from 'expo-router';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { useAuth0 } from 'react-native-auth0';

const SignIn = () => {
  const { authorize, user } = useAuth0();

  const onLogin = async () => {
    try {
      await authorize({ additionalParameters: { prompt: 'login' } }).then((credentials) => {
        if (credentials?.accessToken !== null) {
          router.replace('/(tabs)'); // Fix: Change the argument to a valid value.
        }
      });
    } catch (e) {
      console.log('Error: ', e);
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text> UNIQR Sign In </Text>
      <Text>{user?.name ?? 'null'}</Text>
      <Button onPress={onLogin} title="Log In" />
    </View>
  );
};

export default SignIn;
