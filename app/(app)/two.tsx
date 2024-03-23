import { useQuery } from '@tanstack/react-query';
import { Link, Tabs } from 'expo-router';

import { Text, View } from '@/components/Themed';

export default function SecondPage() {
  const query = useQuery({
    queryKey: ['scroll'],
    queryFn: async () => {
      const response = await fetch('http://localhost:8080/dex/load/t3g/c0f');
      return response.json();
    },
  });

  console.log(query.failureReason);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>{query.data}</Text>
      <Link href="/(app)">Go to the first page</Link>
      <Tabs />
    </View>
  );
}
