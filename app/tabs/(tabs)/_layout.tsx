import { CustomTopTabBar } from '@/components/my_ui/CustomTopTabBar';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // Ukrywamy domyślny pasek na dole, bo mamy własny na górze
        tabBarStyle: { display: 'none' }, 
      }}
      
      // Definicja naszego niestandardowego paska:
      tabBar={(props) => (
        <CustomTopTabBar 
          {...props} 

          /*// WŁĄCZASZ CIEŃ TUTAJ:
          withShadow={true}
          
          // 1. Kolor tła całego paska
          backgroundColorClass="bg-my-150" // Zmieniłem na white dla testu, użyj swojego 'bg-my-10' jeśli masz go w configu

          // 2. Styl AKTYWNEJ zakładki (np. czerwona linia na dole)
          activeTabClassName="border-b-2 border-red-600"

          // 3. Styl AKTYWNEGO tekstu (czerwony, pogrubiony)
          activeLabelClassName="text-red-600 font-bold text-lg"

          // 4. Styl NIEAKTYWNEJ zakładki (brak ramki)
          inactiveTabClassName="border-b-0 border-transparent"

          // 5. Styl NIEAKTYWNEGO tekstu (szary, mniejszy)
          inactiveLabelClassName="text-gray-400 text-base"
          // Stylizacja tytułu po lewej stronie
          headerTitleClassName="text-2xl font-extrabold text-white"

          shadowColor="rgba(73, 77, 85, 1)"*/
          withBorder={true}
        />
      )}
    >
      <Tabs.Screen
        name="tab1"
        options={{
          title: 'Dashboard',
        }}
      />
      <Tabs.Screen
        name="tab3"
        options={{
          title: 'Nowa Osoba',
        }}
      />
      <Tabs.Screen
        name="tab2"
        options={{
          title: 'Ustawienia',
        }}
      />

    </Tabs>
  );
}