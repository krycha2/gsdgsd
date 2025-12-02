import { BASE_URL } from '@/utils/config';
import { Person } from '@/utils/types';
import {
    Avatar,
    AvatarFallbackText,
    AvatarImage,
    Box,
    Button,
    ButtonText,
    Heading,
    HStack,
    Text,
    VStack,
} from '@gluestack-ui/themed';
import React from 'react';

interface PersonCardProps {
  person: Person;
}

const PersonCard = ({ person }: PersonCardProps) => {
  // 1. Logika budowania URL zdjęcia
  // BASE_URL (192.168...) + /uploads/ + avatar_ + nazwa_z_bazy
  const fullImageUrl = person.profile_pic 
    ? `${BASE_URL}/uploads/avatar_${person.profile_pic}` 
    : null;

  // 2. Imię i nazwisko (nazwisko jest opcjonalne w bazie)
  const fullName = `${person.first_name} ${person.last_name || ''}`.trim();

  // 3. Podtytuł (Nick lub rok urodzenia, jeśli nicku brak)
  const subTitle = person.nickname 
    ? `@${person.nickname}` 
    : (person.birth_year ? `Rocznik: ${person.birth_year}` : 'Brak danych');

  return (
    <Box
      bg="$backgroundDark950" // Ciemne tło
      p="$4"
      rounded="$xl"
      borderColor="$borderDark800"
      borderWidth={1}
      m="$2"
      softShadow="2"
    >
      <HStack space="md" alignItems="center">
        {/* --- AVATAR --- */}
        <Avatar size="md" bgColor="$orange600">
          <AvatarFallbackText>{fullName}</AvatarFallbackText>
          {fullImageUrl && (
            <AvatarImage
              source={{ uri: fullImageUrl }}
              alt={`Avatar użytkownika ${fullName}`}
            />
          )}
        </Avatar>

        {/* --- DANE TEKSTOWE --- */}
        <VStack flex={1}>
          <Heading size="sm" color="$textDark50" fontWeight="$bold">
            {fullName}
          </Heading>
          <Text size="xs" color="$textDark400">
            {subTitle}
          </Text>
        </VStack>
      </HStack>

      {/* --- PRZYCISK --- */}
      <Box mt="$4" alignItems="center">
        <Button
          variant="link"
          size="sm"
          onPress={() => console.log('Kliknięto ID:', person.id)}
        >
          <ButtonText color="$textLight100" fontWeight="$bold">
            View Profile
          </ButtonText>
        </Button>
      </Box>
    </Box>
  );
};

export default PersonCard;