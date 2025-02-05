/* eslint-disable max-lines-per-function */
import * as React from 'react';
import { Linking } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { accountOptions } from '@/components/nutrient-plans/types';
import { FormCard, Select, Text, View } from '@/components/ui';
import { useUserStore } from '@/stores/user-store';

interface Location {
  latitude: number;
  longitude: number;
  name: string;
}

interface NutrientData {
  parameters: {
    ph: number;
    ec: number;
    oc: number;
  };
  macroNutrients: {
    n: number;
    p: number;
    k: number;
  };
  microNutrients: {
    zn: number;
    b: number;
    fe: number;
    mn: number;
    mo: number;
    cu: number;
  };
}

// This would come from your API
const MOCK_LOCATIONS: Record<string, Location> = {
  'Nusa - 1': {
    latitude: -8.409518,
    longitude: 115.188919,
    name: 'Nusa Dua Farm, Bali',
  },
  'Nusa -2': {
    latitude: -7.275973,
    longitude: 112.824579,
    name: 'Surabaya Agricultural Land, East Java',
  },
  'Nusa -3': {
    latitude: -0.789275,
    longitude: 131.352979,
    name: 'Manokwari Plantation, West Papua',
  },
};

const MOCK_NUTRIENT_DATA: Record<string, NutrientData> = {
  'Nusa - 1': {
    parameters: {
      ph: 6.5,
      ec: 1.2,
      oc: 2.1,
    },
    macroNutrients: {
      n: 280,
      p: 45,
      k: 190,
    },
    microNutrients: {
      zn: 2.1,
      b: 0.8,
      fe: 12.5,
      mn: 15.2,
      mo: 0.4,
      cu: 1.8,
    },
  },
  'Nusa -2': {
    parameters: {
      ph: 7.2,
      ec: 0.9,
      oc: 1.8,
    },
    macroNutrients: {
      n: 220,
      p: 35,
      k: 160,
    },
    microNutrients: {
      zn: 1.8,
      b: 0.6,
      fe: 10.2,
      mn: 12.8,
      mo: 0.3,
      cu: 1.5,
    },
  },
  'Nusa -3': {
    parameters: {
      ph: 5.8,
      ec: 1.5,
      oc: 2.4,
    },
    macroNutrients: {
      n: 310,
      p: 55,
      k: 210,
    },
    microNutrients: {
      zn: 2.4,
      b: 0.9,
      fe: 14.8,
      mn: 17.5,
      mo: 0.5,
      cu: 2.1,
    },
  },
};

export default function NutrientPortfolio() {
  const { subscriptionPlan } = useUserStore();
  const [selectedAccount, setSelectedAccount] = React.useState(
    accountOptions[0].value
  );
  const location = MOCK_LOCATIONS[selectedAccount as string];
  const nutrientData = MOCK_NUTRIENT_DATA[selectedAccount as string];

  const openInMaps = (lat: number, lng: number) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    Linking.openURL(url);
  };

  return (
    <>
      <KeyboardAwareScrollView
        bottomOffset={62}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 gap-6 p-6">
          <Text className="text-center font-lora text-3xl text-primary">
            Nutrient Portfolio
          </Text>
          {subscriptionPlan === 'Seed' ? (
            <Text className="text-center font-lora text-2xl text-primary">
              {accountOptions[0].label}
            </Text>
          ) : (
            <Select
              options={accountOptions}
              label="Select Account"
              value={selectedAccount}
              onSelect={(value) => setSelectedAccount(value)}
            />
          )}
          <FormCard>
            <View className="gap-2">
              <Text className="font-poppins-semibold text-lg">
                Land Location
              </Text>
              {location && (
                <>
                  <Text>{location.name}</Text>
                  <Text className="font-poppins-light text-sm">
                    {location.latitude.toFixed(6)},{' '}
                    {location.longitude.toFixed(6)}
                  </Text>
                  <Text
                    className="text-right text-primary underline"
                    onPress={() =>
                      openInMaps(location.latitude, location.longitude)
                    }
                  >
                    Open in Maps
                  </Text>
                </>
              )}
            </View>
          </FormCard>
          <View className="gap-4">
            <Text className="font-lora text-xl text-primary">
              Major Nutrient Availability
            </Text>
            <FormCard>
              {nutrientData && (
                <View className="gap-6">
                  <View className="gap-2">
                    <Text className="font-poppins-semibold">Parameters</Text>
                    <View className="flex-row justify-between">
                      <Text className="font-poppins-light">pH</Text>
                      <Text>{nutrientData.parameters.ph}</Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="font-poppins-light">EC (dS/m)</Text>
                      <Text>{nutrientData.parameters.ec}</Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="font-poppins-light">OC (%)</Text>
                      <Text>{nutrientData.parameters.oc}</Text>
                    </View>
                  </View>

                  <View className="gap-2">
                    <Text className="font-poppins-semibold">
                      Macro Nutrients (kg/ha)
                    </Text>
                    <View className="flex-row justify-between">
                      <Text className="font-poppins-light">Nitrogen (N)</Text>
                      <Text>{nutrientData.macroNutrients.n}</Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="font-poppins-light">Phosphorus (P)</Text>
                      <Text>{nutrientData.macroNutrients.p}</Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="font-poppins-light">Potassium (K)</Text>
                      <Text>{nutrientData.macroNutrients.k}</Text>
                    </View>
                  </View>
                </View>
              )}
            </FormCard>

            <Text className="font-lora text-xl text-primary">
              Micro Nutrient Availability
            </Text>
            <FormCard>
              {nutrientData && (
                <View className="gap-2">
                  <Text className="font-poppins-semibold">
                    Micro Nutrients (ppm)
                  </Text>
                  <View className="flex-row justify-between">
                    <Text className="font-poppins-light">Zinc (Zn)</Text>
                    <Text>{nutrientData.microNutrients.zn}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="font-poppins-light">Boron (B)</Text>
                    <Text>{nutrientData.microNutrients.b}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="font-poppins-light">Iron (Fe)</Text>
                    <Text>{nutrientData.microNutrients.fe}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="font-poppins-light">Manganese (Mn)</Text>
                    <Text>{nutrientData.microNutrients.mn}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="font-poppins-light">Molybdenum (Mo)</Text>
                    <Text>{nutrientData.microNutrients.mo}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="font-poppins-light">Copper (Cu)</Text>
                    <Text>{nutrientData.microNutrients.cu}</Text>
                  </View>
                </View>
              )}
            </FormCard>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
