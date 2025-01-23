import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import { twMerge } from 'tailwind-merge';

interface SafeAreaViewProps {
  className?: string;
  children?: React.ReactNode;
}

export function SafeAreaView({ className, children }: SafeAreaViewProps) {
  return (
    <RNSafeAreaView className={twMerge('bg-neutral-100', className)}>
      {children}
    </RNSafeAreaView>
  );
}
