import AddNewPersonTile from '@/components/my_ui/AddNewPersonTile';
import BrowsePeopleTile from '@/components/my_ui/BrowsePeopleTile';
import SettingsTile from '@/components/my_ui/SettingsTile';
import UserCounter from '@/components/my_ui/UserCounter';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// Możesz potrzebować ScrollView, jeśli kafelki nie zmieszczą się na jednym ekranie
import { router } from 'expo-router';
import { ScrollView } from 'react-native';

export default function Tab2() {
  const insets = useSafeAreaInsets();
  const topPadding = insets.top + 64 + 24;

  const handleAaddPerson = async () => {
    router.replace("/tabs/(tabs)/tab3");
  }

  return (
    // Zmieniłem Box na ScrollView, żebyś mógł przewijać na małych telefonach
    <ScrollView 
      className="flex-1 bg-orange-foreground"
      contentContainerStyle={{ alignItems: 'center', paddingTop: topPadding, paddingBottom: 40 }}
    >
      
      {/* WSPÓLNY KONTENER */}
      <Box className="w-full max-w-[1200px] px-4">
        
        {/* NAGŁÓWEK */}
        <Box className="mb-6 w-full md:ml-1"> 
          <Heading size="xl" className="font-bold text-white mb-1 text-center md:text-left">
            PersonifyKeeper Dashboard
          </Heading>
          <Text className="text-gray-400 text-sm text-center md:text-left">
            Manage your contacts with ease
          </Text>
        </Box>

        {/* KONTENER KAFELKÓW - TUTAJ JEST ZMIANA */}
        <Box className="flex-row flex-wrap gap-3 justify-center md:justify-start">
           {/* ^ ZMIANA:
              justify-center     -> Domyślnie (telefon) kafelki są na środku.
              md:justify-start   -> Na większych ekranach (tablet/PC) wracają do lewej.
           */}
          
          <UserCounter minimwh="min-w-[280px] min-h-[180px]" />
          <AddNewPersonTile onPress={handleAaddPerson} minimwh="min-w-[280px] min-h-[180px]" />
          <BrowsePeopleTile minimwh="min-w-[280px] min-h-[180px]" />      
          <SettingsTile minimwh="min-w-[280px] min-h-[180px]" />       

        </Box>

      </Box>
    </ScrollView>
  );
}