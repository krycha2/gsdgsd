import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
// 1. IMPORT DO ZDJĘĆ
import * as ImagePicker from 'expo-image-picker';

// UI z Gluestack
import { Avatar, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar';
import { Box } from '@/components/ui/box';
import { FormControl, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

// Konfiguracja
import { BASE_URL, ENDPOINTS } from '@/utils/config';
import { generateId } from '@/utils/generatePersonId';

type UserCounterProps = {
  className?: string;           
  bg?: string;                         
  textcolor?: string;           
  minimwh?: string;             
};


export default function AddPerson({
  className = "", 
  bg = 'bg-orange-foreground', 
  textcolor = 'text-white',
  minimwh = 'min-w-[1200px] min-h-[400px]',  
}: UserCounterProps) {
  const router = useRouter();
  
  // Stany
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);

  // 2. FUNKCJA WYBIERANIA ZDJĘCIA (Poprawiona)
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      // NAPRAWA BŁĘDU: Używamy MediaType.Images (bez "Options")
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // Pozwala przyciąć do kwadratu
      aspect: [1, 1],
      quality: 0.7, // Lekka kompresja
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

const handleSave = async () => {
    // 1. Walidacja
    if (!firstName.trim()) {
      Alert.alert("Błąd", "Imię jest wymagane!");
      return;
    }

    setIsLoading(true);

    try {
      const newId = generateId(20); 

      // 2. Tworzymy FormData
      const formData = new FormData();

      formData.append('id', newId);
      formData.append('first_name', firstName);
      if (lastName) formData.append('last_name', lastName);
      formData.append('current_user_id', '1');

      // 3. OBSŁUGA ZDJĘCIA (ROZRÓŻNIENIE WEB vs TELEFON)
      if (selectedImage) {
        
        // --- WERSJA DLA PRZEGLĄDARKI (WEB) ---
        if (Platform.OS === 'web') {
          // Na webie musimy zamienić URI na Blob (plik binarny)
          const res = await fetch(selectedImage);
          const blob = await res.blob();
          
          // Appendujemy czysty plik
          formData.append('photo', blob, 'photo.jpg');
        } 
        
        // --- WERSJA DLA TELEFONU (ANDROID/IOS) ---
        else {
          const filename = selectedImage.split('/').pop(); 
          const match = /\.(\w+)$/.exec(filename || '');
          const type = match ? `image/${match[1]}` : `image/jpeg`;

          formData.append('photo', {
            uri: selectedImage,
            name: filename || 'photo.jpg',
            type: type,
          } as any);
        }
      }

      // 4. WYSYŁKA
      const response = await fetch(`${BASE_URL}${ENDPOINTS.PERSON}`, {
        method: 'POST',
        body: formData, 
      });

      const data = await response.json();

      if (data.success) {
        // Na webie Alert działa słabo, więc używamy systemowego lub po prostu loga
        if (Platform.OS === 'web') {
            alert("Sukces! Dodano osobę.");
            router.back();
        } else {
            Alert.alert("Sukces", "Dodano osobę!", [
                { text: "OK", onPress: () => router.back() }
            ]);
        }
      } else {
        if (Platform.OS === 'web') alert("Błąd: " + data.message);
        else Alert.alert("Błąd API", data.message || "Nie udało się zapisać.");
      }

    } catch (error) {
      console.error(error);
      if (Platform.OS === 'web') alert("Błąd połączenia z serwerem.");
      else Alert.alert("Błąd", "Problem z połączeniem.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      className={`${bg} border border-orange-primary/20 shadow-sm rounded-2xl p-6 items-start  flex-none  ${minimwh} ${className}`}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Box className="flex-1 bg-background items-center">

            <Heading size="xl" className="text-primary mb-6 mt-4">
              Dodaj Osobę
            </Heading>

            <VStack space="xl" className="items-center">

              {/* KLIKALNY AVATAR */}
              <TouchableOpacity onPress={pickImage}>
                <Avatar size="2xl" className="bg-surface border border-orange-primary/20">
                  {selectedImage ? (
                    <AvatarImage 
                      source={{ uri: selectedImage }} 
                      alt="Zdjęcie profilowe"
                    />
                  ) : (
                    <AvatarFallbackText className="text-white text-3xl">
                      {firstName ? firstName[0] : "+"}
                    </AvatarFallbackText>
                  )}
                </Avatar>
                <Text size="xs" className="text-primary text-center mt-2 font-bold">
                  {selectedImage ? "ZMIEŃ ZDJĘCIE" : "DODAJ ZDJĘCIE"}
                </Text>
              </TouchableOpacity>

              {/* FORMULARZ */}
              <Box className="w-full">

                  {/* IMIĘ */}
                  <FormControl isRequired={true} className="mb-4">
                      <FormControlLabel>
                          <FormControlLabelText className={`text-foreground ${textcolor}`}>Imię</FormControlLabelText>
                      </FormControlLabel>
                      <Input variant="outline" size="md" className="border border-orange-primary/20 bg-surface data-[hover=true]:border-orange-primary/50 data-[hover=true]:bg-orange-foreground2/35">
                          <InputField 
                          placeholder="Wpisz imię..." 
                          value={firstName}
                          onChangeText={setFirstName}
                          className="text-orange-card placeholder:text-textMuted text-[11px]"
                          />
                      </Input>
                  </FormControl>

                  {/* NAZWISKO */}
                  <FormControl className="mb-4">
                      <FormControlLabel>
                          <FormControlLabelText className={`text-foreground ${textcolor}`}>Nazwisko</FormControlLabelText>
                      </FormControlLabel>
                      <Input variant="outline" size="md" className="border border-orange-primary/20 bg-surface data-[hover=true]:border-orange-primary/50 data-[hover=true]:bg-orange-foreground2/35">
                          <InputField 
                          placeholder="Wpisz nazwisko..." 
                          value={lastName}
                          onChangeText={setLastName}
                          className="text-orange-card placeholder:text-textMuted text-[11px]"
                          />
                      </Input>
                  </FormControl>

                  {/* PRZYCISK ZAPISZ */}
                  <TouchableOpacity 
                    onPress={handleSave}
                    activeOpacity={0.7} // To daje efekt wizualny przy kliknięciu (zamiast hover)
                    className="mt-8 w-full h-12 justify-center border border-orange-primary/20 bg-orange-foreground rounded-lg flex-row items-center px-4"
                  >
                      {/* Tekst - w React Native tekst MUSI być w <Text> */}
                      <Text className={`${textcolor} font-medium text-base`}>
                          Nowa osoba
                      </Text>
                  </TouchableOpacity>
                  {/*<Button 
                      size="lg" 
                      action="primary" 
                      onPress={handleSave}
                      isDisabled={isLoading}
                      className="mt-4 bg-primary border-primary"
                  >
                      {isLoading ? (
                          <ButtonSpinner color="white" />
                      ) : (
                          <ButtonText className="text-white font-bold">
                          Zapisz w bazie
                          </ButtonText>
                      )}
                  </Button>*/}
              </Box>

            </VStack>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </Box>
  );
}