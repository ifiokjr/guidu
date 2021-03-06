import { textField } from '@uidu/data-fields';

export default () => ({
  type: textField.kind,
  viewType: textField.kind,
  filter: 'agTextColumnFilter',
  cellEditor: 'agLargeTextCellEditor',
  headerComponentParams: { menuIcon: textField.icon },
});
