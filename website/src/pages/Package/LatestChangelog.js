// @flow

import React, { type Node } from 'react';

import Changelog, { type Logs } from '../../components/ChangeLog';

const LatestChange = ({
  changelog,
  pkgId,
  groupId,
}: {
  changelog: Logs,
  pkgId: string,
  groupId: string,
}) => {
  if (!changelog || !changelog[0] || !changelog[0].version) return null;

  return (
    <Changelog
      changelog={changelog}
      range={changelog[0].version}
      packageName={pkgId}
    />
  );
};

export default LatestChange;
