/* eslint-disable max-lines-per-function */
import * as React from 'react';
import type { FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { View } from 'react-native';
import { Pressable, type PressableProps } from 'react-native';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';
import { tv } from 'tailwind-variants';

import { CaretDown } from '@/components/ui/icons';

import type { InputControllerType } from './input';
import { Text } from './text';

const selectTv = tv({
  slots: {
    container: 'relative mb-4',
    label: 'mb-4 text-sm text-neutral-500 dark:text-neutral-100',
    input:
      'mt-0 flex-row items-center justify-between rounded-full bg-neutral-200 px-6 py-3 dark:bg-neutral-800',
    inputValue:
      'font-poppins-semibold text-base text-neutral-700 dark:text-neutral-100',
    dropdown:
      'absolute inset-x-0 top-full z-[100] mt-1 overflow-hidden rounded-3xl bg-white dark:bg-neutral-800',
    option:
      'flex-row items-center justify-between border-b border-neutral-100 px-6 py-3 dark:border-neutral-700',
    optionText:
      'font-poppins-regular text-base text-neutral-700 dark:text-neutral-100',
    optionTextSelected:
      'font-poppins-semibold text-base text-neutral-700 dark:text-neutral-100',
  },

  variants: {
    focused: {
      true: {
        input: 'border-neutral-600',
      },
    },
    error: {
      true: {
        input: 'border-danger',
        label: 'text-danger dark:text-danger',
        inputValue: 'text-danger',
      },
    },
    disabled: {
      true: {
        input: 'opacity-50',
      },
    },
  },
  defaultVariants: {
    error: false,
    disabled: false,
  },
});

export type OptionType = { label: string; value: string | number };

const Option = React.memo(
  ({
    label,
    selected = false,
    ...props
  }: PressableProps & {
    selected?: boolean;
    label: string;
  }) => {
    const styles = selectTv();
    return (
      <Pressable
        className="flex-row items-center justify-between border-b border-neutral-100 px-6 py-3 last:border-b-0 active:bg-neutral-100 dark:border-neutral-700 dark:active:bg-neutral-700"
        {...props}
      >
        <Text
          className={
            selected ? styles.optionTextSelected() : styles.optionText()
          }
        >
          {label}
        </Text>
        {selected && <Check />}
      </Pressable>
    );
  }
);

// Legacy Options component for backwards compatibility
export const Options = React.forwardRef<
  any,
  {
    options: OptionType[];
    onSelect: (option: OptionType) => void;
    value?: string | number;
    testID?: string;
  }
>(({ options, onSelect, value, testID }, ref) => {
  return (
    <View
      ref={ref}
      className="overflow-hidden rounded-3xl bg-white dark:bg-neutral-800"
    >
      {options.map((option) => (
        <Option
          key={option.value}
          label={option.label}
          selected={value === option.value}
          onPress={() => onSelect(option)}
          testID={testID ? `${testID}-item-${option.value}` : undefined}
        />
      ))}
    </View>
  );
});

export interface SelectProps {
  value?: string | number;
  label?: string;
  disabled?: boolean;
  error?: string;
  options?: OptionType[];
  onSelect?: (value: string | number) => void;
  placeholder?: string;
  testID?: string;
}

interface ControlledSelectProps<T extends FieldValues>
  extends SelectProps,
    InputControllerType<T> {}

export const Select = (props: SelectProps) => {
  const {
    label,
    value,
    error,
    options = [],
    placeholder = 'select...',
    disabled = false,
    onSelect,
    testID,
  } = props;

  const [isOpen, setIsOpen] = React.useState(false);

  const onSelectOption = React.useCallback(
    (option: OptionType) => {
      onSelect?.(option.value);
      setIsOpen(false);
    },
    [onSelect]
  );

  const styles = React.useMemo(
    () =>
      selectTv({
        error: Boolean(error),
        disabled,
      }),
    [error, disabled]
  );

  const textValue = React.useMemo(
    () =>
      value !== undefined
        ? (options?.filter((t) => t.value === value)?.[0]?.label ?? placeholder)
        : placeholder,
    [value, options, placeholder]
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
      <Pressable
        className={styles.input()}
        disabled={disabled}
        onPress={() => setIsOpen(!isOpen)}
        testID={testID}
      >
        <Text className={styles.inputValue()}>{textValue}</Text>
        <View className="size-4 items-center justify-center">
          <CaretDown
            width={16}
            height={16}
            style={{
              transform: [{ rotateX: isOpen ? '180deg' : '0deg' }],
              transformOrigin: 'center',
            }}
            className="text-neutral-700 dark:text-neutral-300"
          />
        </View>
      </Pressable>
      {isOpen && (
        <View className={styles.dropdown()}>
          {options.map((option) => (
            <Option
              key={option.value}
              label={option.label}
              selected={value === option.value}
              onPress={() => onSelectOption(option)}
              testID={testID ? `${testID}-item-${option.value}` : undefined}
            />
          ))}
        </View>
      )}
      {error && (
        <Text
          testID={testID ? `${testID}-error` : undefined}
          className="text-sm text-danger dark:text-danger"
        >
          {error}
        </Text>
      )}
    </View>
  );
};

export function ControlledSelect<T extends FieldValues>(
  props: ControlledSelectProps<T>
) {
  const { name, control, rules, ...selectProps } = props;

  const { field, fieldState } = useController({ control, name, rules });
  return (
    <Select
      value={field.value}
      onSelect={field.onChange}
      {...selectProps}
      error={fieldState.error?.message}
    />
  );
}

function Check({ ...props }: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.704 5.296a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L8 12.586l7.296-7.29a1 1 0 0 1 1.414 0Z"
        fill="currentColor"
      />
    </Svg>
  );
}
