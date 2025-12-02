import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { BASE_URL, ENDPOINTS } from './utils/config';
import { User, Product } from './utils/types';

export default function App() {
  // 1. Potrzebujesz DWOCH stanów na DWA rodzaje danych
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  
  const [isLoading, setLoading] = useState(true);

  const getAllData = async () => {
    try {
      // 2. MAGIA: Promise.all
      // To wysyła oba zapytania RÓWNOCZEŚNIE.
      // Czekamy, aż OBA wrócą.
      const [responseUsers, responseProducts] = await Promise.all([
        fetch(`${BASE_URL}${ENDPOINTS.USERS}`),
        fetch(`${BASE_URL}${ENDPOINTS.PRODUCTS}`)
      ]);

      // 3. Rozpakowujemy oba JSON-y
      const jsonUsers = await responseUsers.json();
      const jsonProducts = await responseProducts.json();

      // 4. Zapisujemy do stanów
      setUsers(jsonUsers);
      setProducts(jsonProducts);

    } catch (error) {
      console.error("Błąd pobierania danych:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={{ flex: 1, padding: 50 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Użytkownicy:</Text>
      {users.map(u => (
          <Text key={u.id_user}>- {u.user_name}</Text>
      ))}

      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>Produkty:</Text>
      {products.map(p => (
          <Text key={p.id}>- {p.name} ({p.price} zł)</Text>
      ))}
    </View>
  );
}