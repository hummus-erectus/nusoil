import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import colors from '@/components/ui/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[100],
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: colors.neutral[500],
    marginBottom: 20,
  },
});

export default function LandWallet() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Land Wallet</Text>
    </View>
  );
}
