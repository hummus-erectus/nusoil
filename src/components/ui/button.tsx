/* eslint-disable max-lines-per-function */
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import type { PressableProps, View } from 'react-native';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

const button = tv({
  slots: {
    container: 'my-2 flex flex-row items-center justify-center rounded-md px-4',
    label: 'font-poppins-medium text-[14px] leading-[21px]',
    indicator: 'h-6',
  },

  variants: {
    variant: {
      default: {
        container: 'h-[53px] min-w-[189px] gap-2',
        label: 'text-white',
        indicator: 'text-white',
      },
      secondary: {
        container:
          'h-[53px] min-w-[189px] gap-2 border border-primary bg-transparent',
        label: 'text-primary',
        indicator: 'text-primary',
      },
      outline: {
        container:
          'h-[53px] min-w-[189px] gap-2 border border-white bg-transparent',
        label: 'text-white',
        indicator: 'text-white',
      },
      destructive: {
        container: 'bg-danger',
        label: 'text-white',
        indicator: 'text-white',
      },
      ghost: {
        container: 'bg-transparent',
        label: 'text-neutral-600 dark:text-white',
        indicator: 'text-neutral-600 dark:text-white',
      },
      link: {
        container: 'bg-transparent',
        label: 'font-poppins-regular text-primary dark:text-white',
        indicator: 'font-poppins-regular text-primary dark:text-white',
      },
      legacy: {
        container: 'bg-black dark:bg-white',
        label: 'text-white dark:text-black',
        indicator: 'text-white dark:text-black',
      },
    },
    underline: {
      true: {
        label: 'underline',
      },
    },
    size: {
      default: {
        container: '',
        label: 'text-base',
      },
      lg: {
        container: '',
        label: 'text-xl',
      },
      sm: {
        container: '',
        label: 'text-sm',
        indicator: 'h-2',
      },
      icon: { container: 'size-9' },
    },
    disabled: {
      true: {
        container: 'opacity-30',
        label: '',
        indicator: '',
      },
    },
    fullWidth: {
      true: {
        container: '',
      },
      false: {
        container: 'self-center',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    disabled: false,
    fullWidth: true,
    size: 'default',
    underline: false,
  },
});

type ButtonVariants = VariantProps<typeof button>;
interface Props extends ButtonVariants, Omit<PressableProps, 'disabled'> {
  label?: string;
  loading?: boolean;
  className?: string;
  textClassName?: string;
}

export const Button = React.forwardRef<View, Props>(
  (
    {
      label: text,
      loading = false,
      variant = 'default',
      disabled = false,
      size = 'default',
      underline = false,
      className = '',
      testID,
      textClassName = '',
      ...props
    },
    ref
  ) => {
    const styles = React.useMemo(
      () => button({ variant, disabled, size, underline }),
      [variant, disabled, size, underline]
    );

    const content = (
      <>
        {loading && (
          <ActivityIndicator
            className={styles.indicator()}
            testID={testID ? `${testID}-loading` : undefined}
          />
        )}
        {text && !loading && (
          <Text
            className={styles.label({ className: textClassName })}
            testID={testID ? `${testID}-text` : undefined}
          >
            {text}
          </Text>
        )}
      </>
    );

    if (variant === 'default') {
      return (
        <Pressable
          ref={ref}
          disabled={disabled || loading}
          testID={testID}
          {...props}
        >
          <LinearGradient
            colors={['#003161', '#335A81']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            className={styles.container({ className })}
            style={{
              borderRadius: 30,
              paddingHorizontal: 40,
              paddingVertical: 16,
            }}
          >
            {content}
          </LinearGradient>
        </Pressable>
      );
    }

    return (
      <Pressable
        ref={ref}
        disabled={disabled || loading}
        className={styles.container({ className })}
        testID={testID}
        style={{
          borderRadius: 30,
          paddingHorizontal: 40,
          paddingVertical: 16,
        }}
        {...props}
      >
        {content}
      </Pressable>
    );
  }
);
