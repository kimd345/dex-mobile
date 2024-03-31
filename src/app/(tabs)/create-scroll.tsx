import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

// import { renderScroll } from '@/src/utils/scroll';
import { renderScroll } from '@/src/utils/dex-common.js';

export default function HomePage() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['scroll'],
    queryFn: async () => {
      const response = await fetch('http://localhost:8080/dex/load/p/t3g/c0f');
      return await response.json();
    },
  });
  const [webViewHeight, setWebViewHeight] = React.useState(0);

  const onMessage = (event: { nativeEvent: { data: any } }) => {
    setWebViewHeight(Number(event.nativeEvent.data));
  };

  if (isPending) return <Text>Loading...</Text>;

  if (isError) return <Text>Error: {error.message}</Text>;

  return (
    <SafeAreaView style={{ paddingTop: StatusBar.currentHeight }}>
      <ScrollView className="mx-4 bg-stone-300 grow">
        <View className="justify-center items-center gap-2 min-h-[88vh] bg-white row-cols">
          <Text className="text-2xl font-bold">{data.design.dex.name}</Text>
          <Text className="text-xl font-light">{data.design.dex.title}</Text>
          <Image className="w-80 h-80" src={`data:image/png;base64,${data.design.src}`} />
          <Text className="text-4xl">{data.design.dex.emoji_poem}</Text>
        </View>
        <WebView
          style={{ height: webViewHeight }}
          originWhitelist={['*']}
          source={{
            html: renderScroll(data.design.dex.scroll_source),
          }}
          scrollEnabled={false}
          onMessage={onMessage}
          injectedJavaScript={`
            (function() {
              window.ReactNativeWebView.postMessage(Math.max(document.body.offsetHeight, document.body.scrollHeight));
            })();            
          `}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
