import { useColorScheme } from 'nativewind';
import React, { createContext } from 'react';
import { View } from 'react-native';

import { themes } from '@/src/constants/color-theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}
export const ThemeContext = createContext<{
  theme: 'light' | 'dark' | undefined;
}>({
  theme: 'light',
});
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { colorScheme } = useColorScheme();
  const themeStyle = colorScheme ? themes[colorScheme] : undefined;
  return (
    <ThemeContext.Provider value={{ theme: colorScheme }}>
      <View style={themeStyle} className="flex-1">
        {children}
      </View>
    </ThemeContext.Provider>
  );
};
