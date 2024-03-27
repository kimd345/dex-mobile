import { useQuery } from '@tanstack/react-query';
import { Link, Tabs } from 'expo-router';
import { Image, SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';

import { renderScroll } from '@/src/utils/scroll';

export default function HomePage() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['scroll'],
    queryFn: async () => {
      const response = await fetch('http://localhost:8080/dex/load/p/t3g/c0f');
      return await response.json();
    },
  });

  if (isPending) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error: {error.message}</Text>;
  }

  console.log(data.design.dex.scroll_source);
  
  return (
    <SafeAreaView style={{ paddingTop: StatusBar.currentHeight }} className="flex-1">
      <ScrollView className="mx-4 bg-stone-300">
        <View className="justify-center items-center gap-2 min-h-full bg-white">
          <Text className="text-2xl font-bold">{data.design.dex.name}</Text>
          <Text className="text-xl font-light">{data.design.dex.title}</Text>
          <Image className="w-80 h-80" src={`data:image/png;base64,${data.design.src}`} />
          <Text className="text-4xl">{data.design.dex.emoji_poem}</Text>
        </View>
        <View className="justify-center items-center gap-2 min-h-full bg-white">
          {/* <Text className="justify-center items-center">{data.design.dex.scroll_source}</Text> */}
          {renderScroll(data.design.dex.scroll_source)}
        </View>
        <Tabs />
      </ScrollView>
    </SafeAreaView>
  );
}
