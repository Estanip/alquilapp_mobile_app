export interface IControllerField {
  field_name: string;
  field_value: string;
}

export interface ISelectOptions {
  label: string;
  value: string;
}

export interface ITitleProps {
  _title: string;
}

export interface IDatePickerProps {
  _setShowDatePicker: () => void;
  _showDatePicker: boolean;
  _onCancel: () => void;
  _date: Date;
  _onChangeDate: (arg: Date) => void;
  _formatDate: string;
  _minimumDate?: Date;
  _maximumDate?: Date;
  _hasError?: string;
  _placeholderText: string;
}
