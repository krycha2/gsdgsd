import PeopleList from '@/components/my_ui/PeopleList';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Tab2() {
  const insets = useSafeAreaInsets();
  const topPadding = insets.top + 64 + 24;
  
  return (
    <ScrollView 
      className="flex-1 bg-orange-foreground"
      contentContainerStyle={{ alignItems: 'center', paddingTop: topPadding, paddingBottom: 40 }}>
        <PeopleList />
    </ScrollView>
  );
}
