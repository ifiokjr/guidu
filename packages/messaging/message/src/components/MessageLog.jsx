// @flow

import React from 'react';

export default ({ message }) => (
  <div className="position-relative py-3">
    <div className="text-center text-muted small">
      {message.messager.name} {message.body}
    </div>
  </div>
);