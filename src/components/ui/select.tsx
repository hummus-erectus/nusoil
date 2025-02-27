/* eslint-disable max-lines-per-function */
import * as React from 'react';
import type { FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { View } from 'react-native';
import { Pressable, type PressableProps } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';
import { tv } from 'tailwind-variants';

import { CaretDown } from '@/components/ui/icons';
import { Modal, useModal } from '@/components/ui/modal';

import type { InputControllerType } from './input';
import { Text } from './text';

const selectTv = tv({
  slots: {
    container: 'relative mb-4',
    label: 'mb-4 ml-2 text-sm text-neutral-600 dark:text-neutral-100',
    input:
      'mt-0 flex-row items-center justify-between rounded-full bg-neutral-200 px-6 py-3 dark:bg-neutral-800',
    inputValue:
      'font-poppins-semibold text-base text-neutral-700 dark:text-neutral-100',
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

interface SelectProps {
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
  extends Omit<SelectProps, 'value' | 'onSelect'>,
    InputControllerType<T> {}

const Select = ({
  value,
  label,
  disabled = false,
  error,
  options = [],
  onSelect,
  placeholder = 'Select an option',
  testID,
}: SelectProps) => {
  const modal = useModal();
  const selectedOption = options.find((option) => option.value === value);
  const styles = selectTv({
    error: !!error,
    disabled,
  });

  const handleSelect = React.useCallback(
    (option: OptionType) => {
      onSelect?.(option.value);
      modal.dismiss();
    },
    [modal, onSelect]
  );

  return (
    <>
      <View className={styles.container()}>
        {label && <Text className={styles.label()}>{label}</Text>}
        <Pressable
          testID={testID}
          disabled={disabled}
          className={styles.input()}
          onPress={() => modal.present()}
        >
          <Text
            className={
              selectedOption ? styles.inputValue() : 'text-neutral-500'
            }
          >
            {selectedOption?.label ?? placeholder}
          </Text>
          <CaretDown className="text-neutral-500" />
        </Pressable>
        {error && (
          <Text className="ml-2 mt-1 text-sm text-danger">{error}</Text>
        )}
      </View>

      <Modal ref={modal.ref} snapPoints={['50%']} title={label}>
        <ScrollView className="flex-1 px-4">
          {options.map((option) => (
            <Pressable
              key={option.value}
              className={styles.option()}
              onPress={() => handleSelect(option)}
            >
              <Text
                className={
                  option.value === value
                    ? styles.optionTextSelected()
                    : styles.optionText()
                }
              >
                {option.label}
              </Text>
              {option.value === value && <Check className="text-primary" />}
            </Pressable>
          ))}
        </ScrollView>
      </Modal>
    </>
  );
};

export const ControlledSelect = <T extends FieldValues>({
  control,
  name,
  rules,
  ...props
}: ControlledSelectProps<T>) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    control,
    name,
    rules,
  });

  return (
    <Select
      {...props}
      value={value}
      error={error?.message}
      onSelect={onChange}
    />
  );
};

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

export { Select };
export type { ControlledSelectProps, SelectProps };
