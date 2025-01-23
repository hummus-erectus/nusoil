import * as React from 'react';
import { View } from 'react-native';
import { tv } from 'tailwind-variants';

const formCardTv = tv({
  slots: {
    container: 'rounded-3xl bg-white p-6 dark:bg-neutral-800',
  },
  variants: {
    spacing: {
      default: {
        container: 'space-y-4',
      },
      compact: {
        container: 'space-y-2',
      },
      none: {
        container: '',
      },
    },
  },
  defaultVariants: {
    spacing: 'default',
  },
});

export interface FormCardProps {
  children: React.ReactNode;
  spacing?: 'default' | 'compact' | 'none';
  className?: string;
}

export const FormCard = ({
  children,
  spacing = 'default',
  className,
}: FormCardProps) => {
  const styles = formCardTv({ spacing });

  return (
    <View className={`${styles.container()} ${className ?? ''}`}>
      {children}
    </View>
  );
};
