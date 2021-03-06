import loadable from '@loadable/component';
import React from 'react';
import { BarChart2 } from 'react-feather';
import { FormattedMessage } from 'react-intl';

const Chart = loadable(() => import('./XY'));

export default {
  id: 'xy',
  name: <FormattedMessage id="dashlets.xy.name" defaultMessage="XY chart" />,
  icon: BarChart2,
  color: '#D08770',
  description: (
    <FormattedMessage id="dashlets.xy.description" defaultMessage="XY chart." />
  ),
  chart: Chart,
};
