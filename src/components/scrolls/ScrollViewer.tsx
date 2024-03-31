import clsx from 'clsx';
import React from 'react';
import { Image, Dimensions, ScrollView, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

import { renderScroll } from '@/src/utils/dex-common.js';

interface ScrollViewerProps {
  data: any;
  mode: 'view' | 'edit';
}

const ScrollViewer: React.FC<ScrollViewerProps> = ({ data, mode }) => {
  const [webViewHeight, setWebViewHeight] = React.useState(0);

  const onMessage = (event: { nativeEvent: { data: any } }) => {
    setWebViewHeight(Number(event.nativeEvent.data));
  };

  return (
    <ScrollView
      className={clsx('px-4 bg-stone-300', {
        // 'py-4': mode === 'view',
        // [`min-h-[${Dimensions.get('window').height / 2}px]`]: mode === 'edit',
      })}>
      <View
        className="justify-center items-center gap-2 bg-white row-cols"
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height - 80, // TODO: Status bar height
        }}>
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
  );
};

export default ScrollViewer;
