/* eslint-disable max-lines-per-function */
import DateTimePicker from '@react-native-community/datetimepicker';
import * as React from 'react';
import type { Control, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { Modal, Platform, Pressable, View } from 'react-native';
import { tv } from 'tailwind-variants';

import { Text } from './text';

const dateInputTv = tv({
  slots: {
    container: 'mb-4',
    label: 'mb-2 text-sm text-neutral-600 dark:text-neutral-100',
    input:
      'w-full border-b-2 border-neutral-300/50 bg-transparent px-0 py-3 pl-2 font-poppins-regular text-sm font-medium leading-normal placeholder:text-neutral-400 focus:outline-none dark:border-neutral-600/50 dark:placeholder:text-neutral-500',
  },
  variants: {
    error: {
      true: {
        input: 'border-b-2 border-danger/50',
        label: 'text-danger dark:text-danger',
      },
    },
    disabled: {
      true: {
        input: 'opacity-50',
      },
    },
  },
});

type DateInputProps = {
  label?: string;
  disabled?: boolean;
  error?: string;
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
};

type ControlledDateInputProps<T extends Record<string, any>> = {
  name: Path<T>;
  control: Control<T>;
  rules?: any;
} & Omit<DateInputProps, 'value' | 'onChange'>;

export const DateInput = React.forwardRef<View, DateInputProps>(
  (props, ref) => {
    const { label, error, disabled, value, onChange, placeholder } = props;
    const [showPicker, setShowPicker] = React.useState(false);

    const styles = dateInputTv({
      error: Boolean(error),
      disabled,
    });

    const handlePress = () => {
      if (disabled) return;
      setShowPicker(true);
    };

    const handleChange = (event: any, selectedDate?: Date) => {
      if (Platform.OS === 'android') {
        setShowPicker(false);
      }

      if (selectedDate) {
        onChange?.(selectedDate);
      }
    };

    const formatDate = (date?: Date) => {
      if (!date) return '';
      return date.toLocaleDateString();
    };

    return (
      <View ref={ref} className={styles.container()}>
        {label ? <Text className={styles.label()}>{label}</Text> : null}
        <Pressable onPress={handlePress}>
          <View className={styles.input()}>
            <Text>{value ? formatDate(value) : placeholder}</Text>
          </View>
        </Pressable>
        {error ? (
          <Text className="mt-1 text-xs text-danger">{error}</Text>
        ) : null}

        {showPicker &&
          (Platform.OS === 'ios' ? (
            <Modal
              animationType="slide"
              transparent={true}
              visible={showPicker}
              onRequestClose={() => setShowPicker(false)}
            >
              <View className="flex-1 justify-end bg-black/50">
                <View className="bg-white">
                  <View className="flex-row justify-end p-2">
                    <Pressable
                      onPress={() => setShowPicker(false)}
                      className="px-4 py-2"
                    >
                      <Text>Done</Text>
                    </Pressable>
                  </View>
                  <DateTimePicker
                    value={value || new Date()}
                    mode="date"
                    display="spinner"
                    onChange={handleChange}
                  />
                </View>
              </View>
            </Modal>
          ) : (
            <DateTimePicker
              value={value || new Date()}
              mode="date"
              display="default"
              onChange={handleChange}
            />
          ))}
      </View>
    );
  }
);

export const ControlledDateInput = <T extends Record<string, any>>({
  name,
  control,
  rules,
  ...props
}: ControlledDateInputProps<T>) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules,
  });

  return (
    <DateInput
      {...props}
      value={field.value}
      onChange={field.onChange}
      error={fieldState.error?.message}
    />
  );
};
