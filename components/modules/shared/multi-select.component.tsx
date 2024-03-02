import React from 'react';
import MultiSelect from 'react-native-multiple-select';

import { IMultiSelectProps } from '@/components/interfaces/book.interfaces';

export default function MultiSelectPicker({
    _items,
    _selectedItems,
    _onChangeInput,
    _onSelectedItemsChange,
    _resetFields,
}: IMultiSelectProps) {
    return (
        <MultiSelect
            displayKey="name"
            //canAddItems={false}
            fixedHeight
            filterMethod="partial"
            hideDropdown={false}
            hideSubmitButton={false}
            hideTags={false}
            items={_items}
            itemTextColor="black"
            noItemsText="No hay jugadores disponibles"
            //onAddItem={(item) => console.log('additem', item)}
            onChangeInput={(word: string) => _onChangeInput(word)}
            onSelectedItemsChange={(items: any) => _onSelectedItemsChange(items)}
            onToggleList={() => _resetFields()}
            searchInputStyle={{ color: 'black' }}
            searchInputPlaceholderText="Busqueda"
            selectedItems={_selectedItems}
            selectText="Selecciona jugadores (máx. 4)"
            selectedItemTextColor="#3498db"
            selectedItemIconColor="#3498db"
            styleDropdownMenu={{}}
            styleDropdownMenuSubsection={{
                borderColor: 'black',
                borderWidth: 1,
                borderRadius: 5,
            }}
            styleIndicator={{ height: 30 }}
            styleInputGroup={{ height: 40 }}
            styleItemsContainer={{}}
            styleListContainer={{}}
            styleMainWrapper={{}}
            styleRowList={{}}
            styleSelectorContainer={{
                backgroundColor: 'white',
                height: 'auto',
                maxHeight: 200,
            }}
            styleTextDropdown={{ paddingLeft: 15 }}
            styleTextDropdownSelected={{
                height: 20,
                paddingLeft: 15,
                color: 'gray',
            }}
            submitButtonColor="#00BFFF"
            submitButtonText="SELECCIONAR"
            tagBorderColor="gray"
            tagRemoveIconColor="#FF6347"
            tagTextColor="#3498db"
            uniqueKey="id"
            fontFamily=""
        />
    );
}
