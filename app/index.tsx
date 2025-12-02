import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import React from 'react';

import { Icon } from '@/components/ui/icon';
import { Redirect } from 'expo-router';

const FeatureCard = ({ iconSvg: IconSvg, name, desc }: any) => {
  return (
    <Box
      className="flex-column md:flex-1 m-2 p-4 rounded-lg bg-background-0/40"
      key={name}
    >
      <Box className="items-center flex flex-row">
        <Icon as={IconSvg}/>
        <Text className="font-medium ml-2 text-xl">{name}</Text>
      </Box>
      <Text className="mt-2">{desc}</Text>
    </Box>
  );
};

export default function Home() {
  return <Redirect href="/login" />;
}
