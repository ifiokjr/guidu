import React from 'react';
import CountUp from 'react-countup';
import { format } from '../../../utils';
import Loader from '../../Loader';
import { CounterProps } from './types';

export default function Counter({
  formatter,
  itemBefore,
  resultSet,
}: CounterProps) {
  if (!resultSet) {
    return <Loader />;
  }

  return (
    <div className="card-body h-100 d-flex align-items-center justify-content-center">
      <h2 className="my-0 d-flex align-items-center">
        {itemBefore && (
          <div className="d-flex flex-shrink-0 mr-3">{itemBefore}</div>
        )}
        <CountUp
          start={0}
          end={resultSet.seriesNames().map((s) => resultSet.totalRow()[s.key])}
          decimals={0}
          formattingFn={(value) => format(value, formatter)}
        />
      </h2>
    </div>
  );
}
