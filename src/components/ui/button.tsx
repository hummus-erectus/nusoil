/* eslint-disable max-lines-per-function */
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import type { PressableProps, View } from 'react-native';
import { ActivityIndicator, Animated, Pressable, Text } from 'react-native';
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

const button = tv({
  slots: {
    container: 'flex flex-row items-center justify-center rounded-md',
    label: 'font-poppins-medium text-[14px] leading-[21px]',
    indicator: 'h-6',
  },

  variants: {
    variant: {
      default: {
        container: 'h-[53px] gap-2',
        label: 'text-white',
        indicator: 'text-white',
      },
      secondary: {
        container: 'h-[53px] gap-2 border border-primary bg-transparent',
        label: 'text-primary',
        indicator: 'text-primary',
      },
      outline: {
        container: 'h-[53px] gap-2 border border-white bg-transparent',
        label: 'text-white',
        indicator: 'text-white',
      },
      destructive: {
        container: 'h-[53px] gap-2 bg-danger',
        label: 'text-white',
        indicator: 'text-white',
      },
      ghost: {
        container: 'h-[53px] gap-2 bg-transparent',
        label: 'text-neutral-600 dark:text-white',
        indicator: 'text-neutral-600 dark:text-white',
      },
      icon: {
        container: 'gap-0 p-0',
      },
      link: {
        container: 'bg-transparent',
        label: 'font-poppins-regular text-primary dark:text-white',
        indicator: 'font-poppins-regular text-primary dark:text-white',
      },
    },
    underline: {
      true: {
        label: 'underline',
      },
    },
    disabled: {
      true: {
        container: 'opacity-30',
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
    underline: false,
  },
});

type ButtonVariants = VariantProps<typeof button>;
interface Props extends ButtonVariants, Omit<PressableProps, 'disabled'> {
  label?: string | React.ReactNode;
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
      underline = false,
      fullWidth = true,
      className = '',
      testID,
      textClassName = '',
      ...props
    },
    ref
  ) => {
    const styles = React.useMemo(
      () => button({ variant, disabled, underline, fullWidth }),
      [variant, disabled, underline, fullWidth]
    );

    const animatedScale = React.useRef(new Animated.Value(1)).current;

    const handlePressIn = React.useCallback(() => {
      Animated.spring(animatedScale, {
        toValue: 0.97,
        useNativeDriver: true,
      }).start();
    }, [animatedScale]);

    const handlePressOut = React.useCallback(() => {
      Animated.spring(animatedScale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }, [animatedScale]);

    const content = (
      <>
        {loading && (
          <ActivityIndicator
            className={styles.indicator()}
            testID={testID ? `${testID}-loading` : undefined}
          />
        )}
        {!loading &&
          (typeof text === 'string' ? (
            <Text
              className={styles.label({ className: textClassName })}
              testID={testID ? `${testID}-text` : undefined}
            >
              {text}
            </Text>
          ) : (
            text
          ))}
      </>
    );

    const animatedStyle = {
      transform: [{ scale: animatedScale }],
    };

    if (variant === 'default') {
      return (
        <Animated.View style={animatedStyle}>
          <Pressable
            ref={ref}
            disabled={disabled || loading}
            testID={testID}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            {...props}
          >
            <LinearGradient
              colors={['#003161', '#456483']}
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
        </Animated.View>
      );
    }

    // For variants with border (secondary, outline)
    if (variant === 'secondary' || variant === 'outline') {
      return (
        <Animated.View style={animatedStyle}>
          <Pressable
            ref={ref}
            className={styles.container({ className })}
            disabled={disabled || loading}
            testID={testID}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={{
              borderRadius: 30,
              paddingHorizontal: 40,
              paddingVertical: 16,
            }}
            {...props}
          >
            {content}
          </Pressable>
        </Animated.View>
      );
    }

    // Default rendering for other variants
    return (
      <Animated.View style={animatedStyle}>
        <Pressable
          ref={ref}
          className={styles.container({ className })}
          disabled={disabled || loading}
          testID={testID}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={
            variant !== 'icon' &&
            variant !== 'link' && {
              borderRadius: 30,
              paddingHorizontal: 40,
              paddingVertical: 16,
            }
          }
          {...props}
        >
          {content}
        </Pressable>
      </Animated.View>
    );
  }
);

Button.displayName = 'Button';
