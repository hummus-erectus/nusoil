import React from 'react';

import { Button, View } from '@/components/ui';

import { Title } from './title';

export const Buttons = () => {
  return (
    <>
      <Title text="Buttons" />
      <View>
        {/* <View className="flex-row  flex-wrap">
          <Button label="small" size="sm" className="mr-2" />
          <Button
            label="small"
            loading
            size="sm"
            className="mr-2 min-w-[60px]"
          />
          <Button
            label="small"
            size="sm"
            variant="secondary"
            className="mr-2"
          />
          <Button label="small" size="sm" variant="outline" className="mr-2" />
          <Button
            label="small"
            size="sm"
            variant="destructive"
            className="mr-2"
          />
          <Button label="small" size="sm" variant="ghost" className="mr-2" />
          <Button label="small" size="sm" disabled className="mr-2" />
        </View> */}
        <Button label="Default Button" />
        <Button label="Secondary Button" variant="secondary" />
        <View className="rounded-md bg-primary p-2">
          <Button label="Outline Button" variant="outline" />
        </View>
        <Button label="Destructive Button" variant="destructive" />
        <Button label="Ghost Button" variant="ghost" />
        <Button label="Link Button" variant="link" />
        <Button label="Link Button (Underlined)" variant="link" underline />
        <Button label="Button" loading={true} />
        <View className="rounded-md bg-primary p-2">
          <Button label="Button" loading={true} variant="outline" />
        </View>
        <Button label="Default Button Disabled" disabled />
        <Button
          label="Secondary Button Disabled"
          disabled
          variant="secondary"
        />
      </View>
    </>
  );
};
