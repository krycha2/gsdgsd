import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleProp, Text, View, ViewStyle } from 'react-native';
// Importy
import PersonCard from '@/components/my_ui/PersonCard';
import { BASE_URL, ENDPOINTS } from '@/utils/config';
import { Person } from '@/utils/types';

type UserCounterProps = {
  loading_color?: string;
  text_form?: string;
  columnWrapper?: StyleProp<ViewStyle>;
  contentContainer?: StyleProp<ViewStyle>;
  num_Columns?: number; // Changed from StyleProp<ViewStyle> to number
};

export default function PeopleList({
  loading_color = "#007bff",
  text_form = "text-center mt-10 text-gray-500",
  columnWrapper = { gap: 8 },
  contentContainer = {padding: 8, paddingBottom: 20},
  num_Columns = 2, // Changed from {2} to just 2
}: UserCounterProps) {
  
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPeople = async () => {
    try {
      const response = await fetch(`${BASE_URL}${ENDPOINTS.PERSON}`); // Fixed: added opening parenthesis
      const data = await response.json();
      if (Array.isArray(data)) {
        setPeople(data);
      } else if (data.data) {
        setPeople(data.data);
      } else {
        setPeople([]);
      }
    } catch (error) {
      console.error("Błąd pobierania:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPeople();
    }, [])
  );

  if (loading && !refreshing) {
    return <ActivityIndicator size="large" color={loading_color} className="mt-10" />;
  }

  return (
    <FlatList
      data={people}
      keyExtractor={(item) => item.id.toString()}
      numColumns={num_Columns} // Now uses the prop correctly
      columnWrapperStyle={columnWrapper} 
      contentContainerStyle={contentContainer}
      
      renderItem={({ item }) => {
        return (
          <View className="flex-1 mb-2">
            <PersonCard person={item} />
          </View>
        );
      }}
      
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={() => { setRefreshing(true); fetchPeople(); }} 
        />
      }
      ListEmptyComponent={
        <Text className={text_form}>
          Brak osób w bazie.
        </Text>
      }
    />
  );
}