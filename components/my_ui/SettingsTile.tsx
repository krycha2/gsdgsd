import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';


type UserCounterProps = {
  className?: string;           
  bg?: string;                         
  hed?: string; 
  textcolor?: string;           
  minimwh?: string;         
  iconColor?: string;  
  onPress?: () => void;      
};

export default function SettingsTile({ 
  className = "", 
  bg = 'bg-orange-foreground', 
  hed = "text-white", 
  textcolor = 'text-white',
  minimwh = 'min-w-[250px] min-h-[200px]', 
  onPress = () => console.log("Kliknięto (domyślna akcja)"),
  iconColor = "hsla(0, 0%, 100%, 1.00)" 
}: UserCounterProps) {

  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Box 
      // Dodano flex-none, aby zapobiec deformacji przez rodzica
      className={`${bg} border border-orange-primary/20 shadow-sm rounded-2xl p-6 items-start  flex-none ${minimwh} ${className}`}
    >
      <Heading size='sm' className={`${hed} font-bold mb-1 text-left`}>
        Ustawienia
      </Heading>
      <Text className={`${hed} text-sm font-medium text-left`}>
        Dostosuj aplikację
      </Text>
      <TouchableOpacity 
        onPress={onPress}
        activeOpacity={0.7} // To daje efekt wizualny przy kliknięciu (zamiast hover)
        className="mt-8 w-full h-12 justify-center border border-orange-primary/20 bg-orange-foreground rounded-lg flex-row items-center px-4"
      >
          {/* Ikona Ustawień */}
          <FontAwesome name="gear" size={24} color={`${iconColor}`} className='pr-1'/>

          {/* Tekst */}
          <Text className={`${textcolor} font-medium text-base`}>
              Ustawienia
          </Text>
      </TouchableOpacity>
    </Box>
  );
}