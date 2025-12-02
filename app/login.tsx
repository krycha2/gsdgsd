import { useRouter } from 'expo-router';
// ! ZMIANA: Dodałem useRef do importów
import React, { useRef, useState } from 'react';
// ! DODANE: Potrzebne do typowania refa (żeby TypeScript wiedział, że to pole tekstowe)

import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Center } from '@/components/ui/center';
import { FormControl, FormControlError, FormControlErrorText, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

import { BASE_URL, ENDPOINTS } from '@/utils/config';

export default function Login() {
  const router = useRouter();

  // ! DODANE: Tworzymy referencję (uchwyt) do pola hasła
  const passwordRef = useRef<any>(null);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async () => {
    setErrorMsg('');

    if (!login || !password) {
      setErrorMsg("Podaj login i hasło!");
      return;
    }

    setIsLoading(true);

    try {
      const apiUrl = `${BASE_URL}${ENDPOINTS.LOGIN}`; 

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: login,     
          password: password, 
        }),
      });

      const data = await response.json();

      if (data.success) {
        router.replace("/tabs/(tabs)/tab1");
      } else {
        setErrorMsg(data.message);
      }

    } catch (err) {
      console.error(err);
      setErrorMsg("Błąd połączenia z serwerem.");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <Center className='h-screen w-screen flex items-center justify-center bg-my-150'>
      <Card size="lg" variant="elevated" className="m-3 w-full max-w-[350px] p-6">
        
        <VStack space="xl">
          <Center>
            <Heading size="md" className="mb-1">Witaj!</Heading>
            <Text size="sm" className="text-gray-500">Zaloguj się do systemu</Text>
          </Center>

          <VStack space="md">
            
            {/* Pole LOGIN */}
            <FormControl isInvalid={!!errorMsg}>
              <FormControlLabel>
                <FormControlLabelText>Login</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField 
                  placeholder="Wpisz login..." 
                  value={login}
                  onChangeText={setLogin} 

                  // ! DODANE: Zmienia przycisk Enter na "Dalej"
                  returnKeyType="next"
                  // ! DODANE: Po kliknięciu Enter przenosi kursor do hasła
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  // ! DODANE: Zapobiega chowaniu się klawiatury przy przeskoku
                  blurOnSubmit={false}
                />
              </Input>
            </FormControl>

            {/* Pole HASŁO */}
            <FormControl isInvalid={!!errorMsg}>
              <FormControlLabel>
                <FormControlLabelText>Hasło</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField 
                  // ! DODANE: Przypisujemy tu nasz uchwyt (ref)
                  ref={passwordRef}

                  type="password" 
                  placeholder="Wpisz hasło..." 
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={true} 

                  // ! DODANE: Zmienia przycisk Enter na "Zatwierdź/Gotowe"
                  returnKeyType="done"
                  // ! DODANE: Po kliknięciu Enter uruchamia funkcję logowania
                  onSubmitEditing={handleLogin}
                />
              </Input>
              
              {errorMsg ? (
                <FormControlError>
                  <FormControlErrorText>{errorMsg}</FormControlErrorText>
                </FormControlError>
              ) : null}
            </FormControl>

            <Button 
              onPress={handleLogin} 
              isDisabled={isLoading} 
              className="mt-4"
            >
              {isLoading ? (
                <ButtonSpinner color="white" />
              ) : (
                <ButtonText>Zaloguj się</ButtonText>
              )}
            </Button>

          </VStack>
        </VStack>
      </Card>
    </Center>
  );
}