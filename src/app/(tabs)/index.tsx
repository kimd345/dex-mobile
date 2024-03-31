import { useQuery } from '@tanstack/react-query';
import { SafeAreaView, StatusBar, Text } from 'react-native';

import ScrollViewer from '@/src/components/scrolls/ScrollViewer';

export default function HomePage() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['scroll'],
    queryFn: async () => {
      const response = await fetch('http://localhost:8080/dex/load/p/t3g/c0f');
      return await response.json();
    },
  });

  if (isPending) return <Text>Loading...</Text>;

  if (isError) return <Text>Error: {error.message}</Text>;

  return (
    <SafeAreaView style={{ paddingTop: StatusBar.currentHeight }}>
      <ScrollViewer data={data} mode="edit" />
    </SafeAreaView>
  );
}
