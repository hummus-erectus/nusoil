import * as React from 'react';

import { BasePlan } from './base-plan';

export function HarvestPlan() {
  return <BasePlan planType="harvest" showAdvancedFields={true} />;
}
