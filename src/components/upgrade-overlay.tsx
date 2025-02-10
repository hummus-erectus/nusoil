import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Text } from '@/components/ui';
import colors from '@/components/ui/colors';

interface UpgradeOverlayProps {
  requiredPlan: 'Mature' | 'Harvest';
  currentPlan: string;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  blurContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 24,
    borderRadius: 16,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Lora-Bold',
    color: colors.primary[600],
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: colors.neutral[600],
    marginBottom: 24,
    textAlign: 'center',
  },
});

export const UpgradeOverlay: React.FC<UpgradeOverlayProps> = ({
  requiredPlan,
  currentPlan,
}) => {
  const handleUpgrade = () => {
    router.push('/upgrade');
  };

  return (
    <View style={styles.container}>
      <BlurView intensity={15} style={styles.blurContainer} />
      <View style={styles.content}>
        <Text style={styles.title}>Upgrade Required</Text>
        <Text style={styles.description}>
          {`This feature is only available for ${
            requiredPlan === 'Harvest' ? 'Harvest' : 'Mature and Harvest'
          } plan members. You are currently on the ${currentPlan} plan.`}
        </Text>
        <Button onPress={handleUpgrade} variant="default">
          Upgrade Now
        </Button>
      </View>
    </View>
  );
};
