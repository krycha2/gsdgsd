import { Avatar, AvatarFallbackText } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Image } from '@/components/ui/image';
import { VStack } from '@/components/ui/vstack';
import { IMAGES_URL } from '@/utils/config';
import { Person } from '@/utils/types';
import React from 'react';
import { View } from 'react-native';

interface PersonCardProps {
  person: Person;
}

type UserCounterProps = {
  card_size?: "sm" | "md" | "lg";
  variant_typ?: "elevated" | "outline" | "ghost" | "filled";
  card_classname?: string;
  // ZMIANA: Usunąłem imge_style, bo układ się zmienia
  // imge_style?: StyleProp<ViewStyle>; 
  alt_avatar_bg?: string;
  alt_avatar_bg2?: string;
  alt_avatar_text?: string;
};

export default function PersonCard({ 
  person,
  card_size = "md",
  variant_typ = "elevated",
  // Uproszczona klasa, aby pasowała do nowego układu wewnątrz Card
  card_classname = "flex-1 m-1 p-3 overflow-hidden rounded-xl bg-white border border-gray-200",
  // ZMIANA: Usunąłem imge_style domyślne, bo nie ma już sekcji pełnej szerokości
  // imge_style = {height: 160, width: '100%', backgroundColor: '#eee'},
  alt_avatar_bg = "bg-blue-100",
  alt_avatar_bg2 = "bg-blue-500",
  alt_avatar_text = "text-white",
}: PersonCardProps & UserCounterProps) {
  
  const imageUrl = person.profile_pic 
    ? `${IMAGES_URL}/${person.profile_pic}` 
    : null;

  // Stałe style dla sekcji graficznej (Avatar/Image)
  const image_container_style = { 
    height: 60, // Stała wysokość
    width: 60,  // Stała szerokość
    borderRadius: 9999, // Okrąg
    overflow: 'hidden',
    marginRight: 12, // Odstęp od tekstu
  } as const;


  return (
    <Card size={card_size} variant={variant_typ} className={card_classname}>
      
      {/* GŁÓWNY KONTENER - Używamy flex-row, aby ułożyć elementy poziomo */}
      <View className="flex-row items-center">
        
        {/* OBSZAR ZDJĘCIA/AWATARA (Lewa strona) */}
        <View style={image_container_style}>
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              alt={person.first_name}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            // Fallback - Awatar z inicjałami
            <View className={`w-full h-full justify-center items-center ${alt_avatar_bg}`}>
              {/* Używamy mniejszego awatara w nowym układzie */}
              <Avatar size="md" className={alt_avatar_bg2}>
                <AvatarFallbackText className={alt_avatar_text}>
                  {person.first_name}{person.last_name}
                </AvatarFallbackText>
              </Avatar>
            </View>
          )}
        </View>

        {/* DANE (Prawa strona) */}
        <VStack space="xs" className="flex-1"> {/* flex-1, aby zajęło resztę miejsca */}
          <Heading size="sm" className="font-bold truncate text-black">
            {person.first_name} {person.last_name}
          </Heading>
          {/* Tu można dodać inne dane, np. stanowisko/email */}
        </VStack>
      </View>
      
    </Card>
  );
}