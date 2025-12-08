import AddNewPersonTile from '@/components/my_ui/AddNewPersonTile';
import BrowsePeopleTile from '@/components/my_ui/BrowsePeopleTile';
import PeopleList from '@/components/my_ui/PeopleList'; // <--- 1. Importujemy listę
import SettingsTile from '@/components/my_ui/SettingsTile';
import UserCounter from '@/components/my_ui/UserCounter';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Tab1() { // Zmieniłem nazwę funkcji na Tab1 zgodnie z nazwą pliku
  const insets = useSafeAreaInsets();
  const topPadding = insets.top + 64 + 24;

  const handleAaddPerson = async () => {
    router.replace("/tabs/(tabs)/tab3");
  }

  return (
    <ScrollView 
      className="flex-1 bg-orange-foreground"
      contentContainerStyle={{ alignItems: 'center', paddingTop: topPadding, paddingBottom: 40 }}
    >
      
      {/* WSPÓLNY KONTENER (MAX SZEROKOŚĆ) */}
      <Box className="w-full max-w-[1200px] px-4">
        
        {/* --- SEKCJA GÓRNA: NAGŁÓWEK --- */}
        <Box className="mb-6 w-full md:ml-1"> 
          <Heading size="xl" className="font-bold text-white mb-1 text-center md:text-left">
            PersonifyKeeper Dashboard
          </Heading>
          <Text className="text-gray-400 text-sm text-center md:text-left">
            Manage your contacts with ease
          </Text>
        </Box>

        {/* --- SEKCJA ŚRODKOWA: KAFELKI --- */}
        <Box className="flex-row flex-wrap gap-3 justify-center md:justify-start mb-10">
          <UserCounter minimwh="min-w-[280px] min-h-[180px]" />
          <AddNewPersonTile onPress={handleAaddPerson} minimwh="min-w-[280px] min-h-[180px]" />
          <BrowsePeopleTile minimwh="min-w-[280px] min-h-[180px]" />      
          <SettingsTile minimwh="min-w-[280px] min-h-[180px]" />      
        </Box>

        {/* --- SEKCJA DOLNA: LISTA PROFILI --- */}
        {/* <--- 2. Tutaj dodajemy listę */}
        <Box className="w-full">
            {/* Opcjonalny nagłówek sekcji listy */}
            <Heading size="lg" className="font-bold text-white mb-4 ml-1 text-center md:text-left">
                All Profiles
            </Heading>
            
            {/* Sam komponent listy */}
            <PeopleList num_Columns={3} />
        </Box>

      </Box>
    </ScrollView>
  );
}