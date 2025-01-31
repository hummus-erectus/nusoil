/* eslint-disable max-lines-per-function */
// TODO: Implement in all forms, set custom colors
import DateTimePicker from '@react-native-community/datetimepicker';
import * as React from 'react';
import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from 'react-hook-form';
import { Platform, Pressable, View } from 'react-native';
import { tv } from 'tailwind-variants';

import colors from './colors';
import { Calendar as CalendarIcon } from './icons/calendar';
import { Text } from './text';

const dateInputTv = tv({
  slots: {
    container: 'mb-4',
    label: 'mb-4 ml-2 text-sm text-neutral-600 dark:text-neutral-100',
    inputContainer:
      'flex-row items-center border-b-2 border-neutral-300/50 dark:border-neutral-600/50',
    input:
      'flex-1 bg-transparent px-0 py-3 pl-2 font-poppins-regular text-sm font-medium leading-normal placeholder:text-neutral-400 focus:outline-none',
    button: 'px-3 py-2',
  },
  variants: {
    error: {
      true: {
        inputContainer: 'border-b-2 border-danger/50',
        label: 'text-danger dark:text-danger',
      },
    },
    disabled: {
      true: {
        inputContainer: 'opacity-50',
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

export const DateInput = React.forwardRef<View, DateInputProps>(
  (props, ref) => {
    const { label, error, disabled, value, onChange, placeholder } = props;
    const [show, setShow] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
      value
    );

    const styles = dateInputTv({ error: !!error, disabled });

    const handleChange = (event: any, date?: Date) => {
      setShow(Platform.OS === 'ios');
      if (date) {
        setSelectedDate(date);
        onChange?.(date);
      }
    };

    const showDatePicker = () => {
      if (!disabled) {
        setShow(true);
      }
    };

    const formattedDate = selectedDate
      ? selectedDate.toLocaleDateString()
      : placeholder || 'Choose date';

    return (
      <View ref={ref} className={styles.container()}>
        {label ? <Text className={styles.label()}>{label}</Text> : null}
        <View className={styles.inputContainer()}>
          <Text
            className={`${styles.input()} ${!selectedDate ? 'text-neutral-400' : ''}`}
          >
            {formattedDate}
          </Text>
          <Pressable onPress={showDatePicker} className={styles.button()}>
            <CalendarIcon color={colors.neutral[400]} />
          </Pressable>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={selectedDate || new Date()}
            mode="date"
            is24Hour={true}
            onChange={handleChange}
            disabled={disabled}
          />
        )}
        {error ? (
          <Text className="mt-1 text-xs text-danger">{error}</Text>
        ) : null}
      </View>
    );
  }
);

export const ControlledDateInput = <T extends FieldValues>({
  name,
  control,
  rules,
  ...props
}: ControlledDateInputProps<T>) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    rules,
  });

  return <DateInput {...props} value={value} onChange={onChange} />;
};

type ControlledDateInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: any;
} & Omit<DateInputProps, 'value' | 'onChange'>;
