import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CustomTopTabBarProps extends BottomTabBarProps {
  backgroundColorClass?: string;
  activeTabClassName?: string;
  inactiveTabClassName?: string;
  activeLabelClassName?: string;
  inactiveLabelClassName?: string;
  headerTitleClassName?: string;
  withShadow?: boolean;
  shadowColor?: string;
  withBorder?: boolean;
  borderColorClass?: string;
}

export function CustomTopTabBar({ 
  state, 
  descriptors, 
  navigation, 
  backgroundColorClass,
  activeTabClassName,
  inactiveTabClassName,
  activeLabelClassName,
  inactiveLabelClassName,
  headerTitleClassName,
  withShadow = false, // Domyślnie wyłączam cień dla czystszego looku "flat" jak na zdjęciu
  shadowColor = "#000",
  withBorder = false,
  borderColorClass
}: CustomTopTabBarProps) {
  
  // ZMIANA: Domyślne tło na ciemny brąz (z Twojego configu: orange-foreground)
  const bgColor = backgroundColorClass || 'bg-orange-foreground';
  
  const activeRoute = state.routes[state.index];
  const { options: activeOptions } = descriptors[activeRoute.key];
  const activeTitle = 
    activeOptions.tabBarLabel !== undefined
      ? activeOptions.tabBarLabel
      : activeOptions.title !== undefined
      ? activeOptions.title
      : activeRoute.name;

  // ZMIANA: Tytuł nagłówka na jasny kremowy (orange-background), aby był widoczny na ciemnym tle
  const titleStyle = headerTitleClassName || 'text-xl font-bold text-orange-background';

  const borderClass = withBorder 
    ? (borderColorClass || 'border-b border-orange-muted-foreground/20') 
    : 'border-b-0';

  const containerStyle: any = {
    zIndex: 100,
    overflow: 'visible',
  };

  if (withShadow) {
    if (Platform.OS === 'web') {
      containerStyle.boxShadow = `0px 4px 12px ${shadowColor}`; 
    } else {
      Object.assign(containerStyle, {
        shadowColor: shadowColor,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3, // Zmniejszyłem nieco opacity dla elegancji
        shadowRadius: 4.65,
        elevation: 10,
      });
    }
  }

  return (
    <Box 
      className={`absolute top-0 left-0 right-0 ${bgColor} ${borderClass} `}
      style={containerStyle}
    >
      <SafeAreaView edges={['top']}>
        {/* Zwiększyłem h-14 na h-16 dla lepszego "oddechu" */}
        <HStack className="justify-between items-center px-5 h-16">
          
          {/* Tytuł aktualnego ekranu po lewej */}
          <Text className={`${titleStyle} pl-[55px]`}>
            {activeTitle as string}
          </Text>

          {/* Kontener Tabów */}
          <HStack className="items-center gap-2 bg-orange-foreground/50 p-1 rounded-2xl"> 
            {state.routes.map((route, index) => {
              const { options } = descriptors[route.key];
              const label = options.tabBarLabel ?? options.title ?? route.name;
              const isFocused = state.index === index;

              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name, route.params);
                }
              };

              // --- STYLIZACJA TABÓW NA BAZIE ZDJĘCIA ---
              
              // Aktywny: Pomarańczowe tło (primary), zaokrąglone rogi (jak karty)
              // Nieaktywny: Przezroczysty
              const tabContainerStyle = isFocused
                ? (activeTabClassName || 'bg-orange-primary rounded-xl shadow-sm')
                : (inactiveTabClassName || 'bg-transparent rounded-xl');

              // Aktywny tekst: Ciemny (orange-foreground) dla kontrastu na pomarańczowym
              // Nieaktywny tekst: Jasny szary/kremowy (muted lub background)
              const labelStyle = isFocused
                ? (activeLabelClassName || 'text-orange-foreground font-bold')
                : (inactiveLabelClassName || 'text-orange-muted font-medium');

              return (
                <Pressable
                  key={route.key}
                  onPress={onPress}
                  // Dodano animację przycisku (active:opacity) dla lepszego UX
                  className={`py-2 px-4 active:opacity-80 ${tabContainerStyle}`}
                >
                  <Text className={`text-sm ${labelStyle}`}>
                    {label as string}
                  </Text>
                </Pressable>
              );
            })}
          </HStack>
        </HStack>
      </SafeAreaView>
    </Box>
  );
}