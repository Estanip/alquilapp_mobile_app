import { IMultiSelectField } from '@/screens/interfaces/book.interfaces';

export interface IMultiSelectProps {
    _onChangeInput: (arg: string) => void;
    _onSelectedItemsChange: (arg: any) => void;
    _resetFields: () => void;
    _items: IMultiSelectField[];
    _selectedItems: string[];
}
