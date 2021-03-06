import { useCubeQuery } from '@cubejs-client/react';
import { Groupers } from '@uidu/dashlet-controls';
import React from 'react';
import styled from 'styled-components';
import DashletHeader from './DashletHeader';

const TimeDimensionControls = styled.div`
  position: absolute;
  right: 1rem;
`;

const DateRanges = [
  { name: undefined, title: 'All time' },
  { name: 'Today', title: 'Today' },
  { name: 'Yesterday', title: 'Yesterday' },
  { name: 'This week', title: 'This week' },
  { name: 'This month', title: 'This month' },
  { name: 'This quarter', title: 'This quarter' },
  { name: 'This year', title: 'This year' },
  { name: 'Last 7 days', title: 'Last 7 days' },
  { name: 'Last 30 days', title: 'Last 30 days' },
  { name: 'Last week', title: 'Last week' },
  { name: 'Last month', title: 'Last month' },
  { name: 'Last quarter', title: 'Last quarter' },
  { name: 'Last year', title: 'Last year' },
];

const availableGroupers: Array<Groupers> = [
  { name: 'day', title: 'Giornaliero' },
  { name: 'week', title: 'Settimanale' },
  { name: 'month', title: 'Mensile' },
  { name: 'year', title: 'Annuale' },
];

export default function Dashlet({
  dashlet,
  component: DashletContent,
  showHeader = true,
  isCard = true,
  rowData,
  ...rest
}: any) {
  // const [query, setQuery] = useState(
  //   dashlet.query || {
  //     measures: ['Donations.amount'],
  //     timeDimensions: [
  //       {
  //         dimension: 'Donations.createdAt',
  //         granularity: 'month',
  //       },
  //     ],
  //     filters: [],
  //   },
  // );

  console.log(dashlet.query);
  const { resultSet, isLoading, error } = useCubeQuery(dashlet.query);

  return (
    <div className={`h-100${isCard ? ' card' : ' d-flex flex-column'}`}>
      {showHeader && (
        <DashletHeader
          name={dashlet.label}
          description={dashlet.description}
          isCard={isCard}
        >
          {/* {false && (
            <TimeDimensionControls>
              {timeDimension && (
                <TimeFrame
                  activeTimeFrame={timeDimension.dateRange}
                  onChange={(name) => {
                    updateTimeDimensions.update(timeDimension, {
                      ...timeDimension,
                      dateRange: name,
                    });
                  }}
                  timeframes={DateRanges}
                />
              )}
              {timeDimension && (
                <TimeFrameGrouper
                  groupers={timeDimension.dimension.granularities}
                  activeGrouper={timeDimension.granularity}
                  onChange={(name) => {
                    updateTimeDimensions.update(timeDimension, {
                      ...timeDimension,
                      granularity: name,
                    });
                  }}
                />
              )}
            </TimeDimensionControls>
          )} */}
        </DashletHeader>
      )}
      <DashletContent {...rest} {...dashlet} resultSet={resultSet} />
    </div>
  );
}
