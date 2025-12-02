import AddPerson from '@/components/my_ui/AddPerson';
import { Center } from '@/components/ui/center';
export default function Tab2() {
  return (
    <Center className="flex-1 bg-orange-foreground">
      {/*<Heading className="font-bold text-2xl">Expo- Tab 2</Heading>
      <Divider className="my-[30px] w-[80%]" />
      <Text className="p-4">Example below to use gluestack-ui components.</Text>
      <EditScreenInfo path="app/(app)/(tabs)/tab2.tsx" />*/}
      <AddPerson></AddPerson>
    </Center>
  );
}
