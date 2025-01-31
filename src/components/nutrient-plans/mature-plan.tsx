import * as React from 'react';

import { BasePlan } from './base-plan';

export function MaturePlan() {
  return <BasePlan planType="mature" showAdvancedFields={true} />;
}
