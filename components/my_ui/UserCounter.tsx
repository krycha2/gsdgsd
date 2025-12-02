import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { BASE_URL, ENDPOINTS } from '@/utils/config';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

type UserCounterProps = {
  className?: string;       
  accentColor?: string;     
  bg?: string;              
  hed1?: string;            
  hed2?: string;            
  minimwh?: string;         
  iconColor?: string;       
};

export default function UserCounter({ 
  className = "", 
  accentColor = "", 
  bg = 'bg-orange-foreground', 
  hed2 = "text-orange-background", 
  
  // ZMIANA TUTAJ:
  // Używamy min-w (minimalna szerokość) i min-h (minimalna wysokość).
  // To jest "sztywniejsze" niż zwykłe w- i h-.
  // min-w-[250px] -> Na pewno będzie mieć co najmniej 250px szerokości.
  minimwh = 'min-w-[250px] min-h-[200px]', 
  
  iconColor = "hsl(30, 100%, 50%)" 
}: UserCounterProps) {

  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch(`${BASE_URL}${ENDPOINTS.PERSON}?count=1`);
        const data = await response.json();
        setCount(data.total);
      } catch (error) {
        console.error("Błąd liczenia:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCount();
  }, []);

  return (
    <Box 
      // Dodano flex-none, aby zapobiec deformacji przez rodzica
      className={`${bg} border border-orange-primary/20 shadow-sm rounded-2xl p-4 justify-center items-center  flex-none ${accentColor} ${minimwh} ${className}`}
    >
        <Box className="mb-4 items-center justify-center">
          <Box className="w-14 h-14 rounded-full bg-orange-primary/20 items-center justify-center">
            <Ionicons 
              name="people-outline" 
              size={32} 
              color={iconColor}
            />
          </Box>
        </Box>
      
      <Box className="flex-col items-center justify-center">
        {isLoading ? (
          <ActivityIndicator size="small" color={iconColor} />
        ) : (
          <>
            <Heading size="2xl" className={`${hed2} font-bold text-center mb-1`}>
              {count !== null ? count : '-'}
            </Heading>
            
            <Text className="text-orange-background text-sm font-medium">
              Total People
            </Text>
          </>
        )}
      </Box>
    </Box>
  );
}