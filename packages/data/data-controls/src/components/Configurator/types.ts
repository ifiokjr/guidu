import { ColumnApi, GridApi } from '@ag-grid-community/core';
import { DataView } from '@uidu/data-views';
import { Column } from '@uidu/table';
import { GrouperProps } from '../Grouper/types';
import { ResizerProps } from '../Resizer/types';
import { TogglerProps } from '../Toggler/types';

export type ConfiguratorProps = GrouperProps &
  TogglerProps &
  ResizerProps & {
    columnDefs: Column[];
    currentView: any;
    updateView: (dataView: DataView, props: keyof DataView) => void;
    onSetColumnCount: (columnCount: number) => void;
    startDateField?: string;
    endDateField?: string;
    primaryField?: string;
    isConfiguratorOpen?: boolean;
    columnCount?: number;
    gridApi: GridApi;
    gridColumnApi: ColumnApi;
  };
