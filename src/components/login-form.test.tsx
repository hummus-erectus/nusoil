import React from 'react';

import { cleanup, screen, setup, waitFor } from '@/lib/test-utils';

import type { LoginFormProps } from './login-form';
import { LoginForm } from './login-form';

afterEach(cleanup);

const onSubmitMock: jest.Mock<LoginFormProps['onSubmit']> = jest.fn();

describe('LoginForm Form ', () => {
  it('renders correctly', async () => {
    setup(<LoginForm />);
    expect(await screen.findByTestId('form-title')).toBeOnTheScreen();
  });

  it('should display required error when values are empty', async () => {
    const { user } = setup(<LoginForm />);

    const button = screen.getByTestId('login-button');
    expect(
      screen.queryByText(/Phone number is required/i)
    ).not.toBeOnTheScreen();
    await user.press(button);
    expect(
      await screen.findByText(/Phone number is required/i)
    ).toBeOnTheScreen();
    expect(screen.getByText(/Password is required/i)).toBeOnTheScreen();
  });

  it('should display matching error when phone number is invalid', async () => {
    const { user } = setup(<LoginForm />);

    const button = screen.getByTestId('login-button');
    const phoneNumberInput = screen.getByTestId('phoneNumber');
    const passwordInput = screen.getByTestId('password-input');

    await user.type(phoneNumberInput, 'invalid');
    await user.type(passwordInput, 'test');
    await user.press(button);

    expect(
      await screen.findByText(/Invalid phone number format/i)
    ).toBeOnTheScreen();
  });

  it('Should call LoginForm with correct values when values are valid', async () => {
    const { user } = setup(<LoginForm onSubmit={onSubmitMock} />);

    const button = screen.getByTestId('login-button');
    const phoneNumberInput = screen.getByTestId('phoneNumber');
    const passwordInput = screen.getByTestId('password-input');

    await user.type(phoneNumberInput, '+1234567890');
    await user.type(passwordInput, 'password');
    await user.press(button);
    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledTimes(1);
    });
    // expect.objectContaining({}) because we don't want to test the target event we are receiving from the onSubmit function
    expect(onSubmitMock).toHaveBeenCalledWith(
      {
        phoneNumber: '+1234567890',
        password: 'password',
      },
      expect.objectContaining({})
    );
  });
});
