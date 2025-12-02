import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react';
import { TouchableOpacity } from 'react-native';

type UserCounterProps = {
  className?: string;       
  textcolor?: string;    
  bg?: string;                         
  hed?: string;            
  minimwh?: string;         
  iconColor?: string; 
  onPress?: () => void;      
};

export default function AddNewPersonTile({ 
  className = "", 
  textcolor = 'text-white',
  bg = 'bg-orange-primary', 
  hed = "text-black", 
  minimwh = 'min-w-[250px] min-h-[200px]', 
  
  iconColor = "hsla(0, 0%, 100%, 1.00)" ,
  onPress = () => console.log("Kliknięto (domyślna akcja)"),
}: UserCounterProps) {
  return (
    <Box 
      // ZMIANA 1: 
      // Zamiast 'items-center' (który centruje w poziomie), dałem 'items-start'.
      // 'justify-center' zostawiłem, żeby tekst był na środku w pionie (góra-dół).
      // Jeśli chcesz tekst na górze kafelka, zmień 'justify-center' na 'justify-start'.
      className={`${bg}  border border-orange-muted/20 shadow-sm rounded-2xl p-6  items-start  flex-none  ${minimwh} ${className}`}
    >
      {/* ZMIANA 2: Usunięto 'text-center' */}
      <Heading size="sm" className={`${hed} font-bold mb-1 text-left`}>
        Dodaj nową osobę
      </Heading>
      
      {/* ZMIANA 3: Upewnienie się, że tekst jest do lewej */}
      <Text className={`${hed} text-sm font-medium text-left`}>
        Utwórz nowy profil osoby
      </Text>
      <TouchableOpacity 
        onPress={onPress}
        activeOpacity={0.85} // To zastępuje hover:opacity-85 (efekt przy dotknięciu)
        className="mt-8 w-full justify-center h-[3rem] border border-orange-muted/20 bg-orange-foreground rounded-lg flex-row items-center px-4"
      >
          {/* Ikona */}
          {/* Zmieniłem className='pr-1' na 'mr-2', żeby odstęp był ładny przy wyśrodkowaniu */}
          <AntDesign name="usergroup-add" size={24} color={iconColor} className="mr-2"/>
          
          {/* Tekst - w React Native tekst MUSI być w <Text> */}
          <Text className={`${textcolor} font-medium text-base`}>
              Nowa osoba
          </Text>
      </TouchableOpacity>
    </Box>
  );
}