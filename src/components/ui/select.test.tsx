/* eslint-disable max-lines-per-function */
import React from 'react';

import type { OptionType } from '@/components/ui';
import { cleanup, render, screen } from '@/lib/test-utils';

import { Select } from './select';

afterEach(cleanup);

describe('Select component ', () => {
  const options: OptionType[] = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  it('should render correctly ', () => {
    const onSelect = jest.fn();
    render(
      <Select
        label="Select options"
        options={options}
        onSelect={onSelect}
        testID="select"
      />
    );
    expect(screen.getByTestId('select')).toBeOnTheScreen();
    expect(screen.getByText('Select options')).toBeOnTheScreen();
  });

  it('should render the label correctly ', () => {
    const onSelect = jest.fn();
    render(
      <Select
        label="Select"
        options={options}
        onSelect={onSelect}
        testID="select"
      />
    );
    expect(screen.getByTestId('select')).toBeOnTheScreen();
    expect(screen.getByText('Select')).toBeOnTheScreen();
  });

  it('should render the error correctly ', () => {
    const onSelect = jest.fn();
    render(
      <Select
        label="Select"
        options={options}
        onSelect={onSelect}
        testID="select"
        error="Please select an option"
      />
    );
    expect(screen.getByTestId('select')).toBeOnTheScreen();
    expect(screen.getByText('Please select an option')).toBeOnTheScreen();
  });

  it('should display placeholder when no value is selected', () => {
    render(
      <Select
        label="Select"
        options={options}
        testID="select"
        placeholder="Select an option"
      />
    );
    expect(screen.getByText('Select an option')).toBeOnTheScreen();
  });

  it('should display selected value', () => {
    render(
      <Select
        label="Select"
        options={options}
        value="chocolate"
        testID="select"
      />
    );
    const selectElement = screen.getByTestId('select');
    expect(selectElement).toHaveTextContent('Chocolate');
  });

  // Note: Modal interaction tests are removed as they would require more complex setup
  // with @gorhom/bottom-sheet's test utilities. Consider adding integration tests
  // for modal interactions if needed.
});
