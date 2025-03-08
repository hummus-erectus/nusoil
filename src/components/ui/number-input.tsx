/* eslint-disable max-lines-per-function */
import * as React from 'react';
import type {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import { useController } from 'react-hook-form';
import type { TextInputProps } from 'react-native';
import { I18nManager, StyleSheet, View } from 'react-native';
import { TextInput as NTextInput } from 'react-native';
import { tv } from 'tailwind-variants';

import colors from './colors';
import { Text } from './text';

const inputTv = tv({
  slots: {
    container: 'mb-4',
    label: 'mb-2 ml-2 text-sm text-neutral-600 dark:text-neutral-100',
    input:
      'w-full border-b-2 border-neutral-300/50 bg-transparent px-0 py-3 pl-4 font-poppins-regular text-sm font-medium leading-[21px] placeholder:text-neutral-400 focus:outline-none dark:border-neutral-600/50 dark:placeholder:text-neutral-500',
  },
  variants: {
    focused: {
      true: { input: 'border-neutral-700 dark:border-neutral-300' },
    },
    error: {
      true: {
        input: 'border-b-2 border-danger/50',
        label: 'text-danger dark:text-danger',
      },
    },
    disabled: {
      true: { input: 'opacity-50' },
    },
  },
  compoundVariants: [
    {
      error: true,
      focused: true,
      class: { input: 'border-danger' },
    },
  ],
  defaultVariants: {
    focused: false,
    error: false,
    disabled: false,
  },
});

export interface NumberInputProps
  extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  label?: string;
  disabled?: boolean;
  error?: string;
  value?: number | string | null;
  onChangeText?: (value: number | null) => void;
  allowDecimals?: boolean;
  min?: number;
  max?: number;
}

export type NumberInputControllerType<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: Omit<
    RegisterOptions<T>,
    'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >;
};

interface ControlledNumberInputProps<T extends FieldValues>
  extends NumberInputProps,
    NumberInputControllerType<T> {}

export const NumberInput = React.forwardRef<NTextInput, NumberInputProps>(
  (props, ref) => {
    const {
      label,
      error,
      testID,
      value,
      onChangeText,
      allowDecimals = false,
      min,
      max,
      ...inputProps
    } = props;

    // Local state to hold the text value (to support intermediate states like "1.")
    const [text, setText] = React.useState(
      value !== null && value !== undefined ? String(value) : ''
    );
    const [isFocused, setIsFocused] = React.useState(false);

    // When external value changes (and the input isn’t focused), update local text.
    React.useEffect(() => {
      if (!isFocused) {
        setText(value !== null && value !== undefined ? String(value) : '');
      }
    }, [value, isFocused]);

    const handleChangeText = (input: string) => {
      // Use a simple regex to filter allowed characters.
      const pattern = allowDecimals ? /^-?\d*\.?\d*$/ : /^-?\d*$/;
      if (!pattern.test(input)) return; // Ignore disallowed characters

      setText(input);

      // Don’t propagate intermediate states like empty, "-", ".", or ending with "."
      if (
        input === '' ||
        input === '-' ||
        input === '.' ||
        input === '-.' ||
        input.endsWith('.')
      ) {
        onChangeText?.(null);
        return;
      }

      const parsed = allowDecimals ? parseFloat(input) : parseInt(input, 10);
      if (!isNaN(parsed)) {
        let finalValue = parsed;
        if (min !== undefined && parsed < min) finalValue = min;
        if (max !== undefined && parsed > max) finalValue = max;
        onChangeText?.(finalValue);
      } else {
        onChangeText?.(null);
      }
    };

    // On blur, we "finalize" the input and format it nicely.
    const handleBlur = () => {
      setIsFocused(false);
      let parsed: number | null = allowDecimals
        ? parseFloat(text)
        : parseInt(text, 10);
      if (isNaN(parsed)) {
        parsed = null;
      } else {
        if (min !== undefined && parsed < min) parsed = min;
        if (max !== undefined && parsed > max) parsed = max;
      }
      const formatted = parsed !== null ? String(parsed) : '';
      setText(formatted);
      onChangeText?.(parsed);
    };

    const handleFocus = () => setIsFocused(true);

    const styles = React.useMemo(
      () =>
        inputTv({
          error: Boolean(error),
          focused: isFocused,
          disabled: Boolean(props.disabled),
        }),
      [error, isFocused, props.disabled]
    );

    return (
      <View className={styles.container()}>
        {label && (
          <Text
            testID={testID ? `${testID}-label` : undefined}
            className={styles.label()}
          >
            {label}
          </Text>
        )}
        <NTextInput
          testID={testID}
          ref={ref}
          placeholderTextColor={colors.neutral[400]}
          className={styles.input()}
          keyboardType={allowDecimals ? 'decimal-pad' : 'number-pad'}
          value={text}
          onChangeText={handleChangeText}
          onBlur={handleBlur}
          onFocus={handleFocus}
          {...inputProps}
          style={StyleSheet.flatten([
            { writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' },
            { textAlign: I18nManager.isRTL ? 'right' : 'left' },
            inputProps.style,
          ])}
        />
        {error ? (
          <Text
            testID={testID ? `${testID}-error` : undefined}
            className="text-sm text-danger dark:text-danger"
          >
            {error}
          </Text>
        ) : null}
      </View>
    );
  }
);

// Only used with react-hook-form.
export function ControlledNumberInput<T extends FieldValues>(
  props: ControlledNumberInputProps<T>
) {
  const { name, control, rules, ...inputProps } = props;
  const { field, fieldState } = useController({ control, name, rules });
  return (
    <NumberInput
      ref={field.ref}
      autoCapitalize="none"
      value={field.value}
      onChangeText={(val) => field.onChange(val)}
      {...inputProps}
      error={fieldState.error?.message}
    />
  );
}
