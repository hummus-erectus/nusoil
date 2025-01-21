import React from 'react';

import { Text, View } from '@/components/ui';

import { Title } from './title';

export const Typography = () => {
  return (
    <>
      <Title text="Typography" />
      <View className="mb-4 flex-col">
        {/* Poppins Font Sizes */}
        <Text className="font-poppins-bold text-3xl tracking-tight">
          H1 (Poppins Bold): Lorem ipsum dolor sit
        </Text>
        <Text className="font-poppins-semibold text-2xl">
          H2 (Poppins SemiBold): Lorem ipsum dolor sit
        </Text>
        <Text className="font-poppins-medium text-xl">
          H3 (Poppins Medium): Lorem ipsum dolor sit
        </Text>
        <Text className="font-poppins-regular text-lg">
          H4 (Poppins Regular): Lorem ipsum dolor sit
        </Text>

        {/* Lora Font Sizes */}
        <Text className="font-lora text-3xl tracking-tight">
          H1 (Lora): Lorem ipsum dolor sit
        </Text>
        <Text className="font-lora text-2xl">
          H2 (Lora): Lorem ipsum dolor sit
        </Text>
        <Text className="font-lora text-xl">
          H3 (Lora): Lorem ipsum dolor sit
        </Text>
        <Text className="font-poppins-light text-base">
          Body Text (Poppins Light): Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Cumque quasi aut, expedita tempore ratione quidem
          in, corporis quia minus et dolorem sunt temporibus iusto consequatur
          culpa. Omnis sequi debitis recusandae?
        </Text>
      </View>
    </>
  );
};
