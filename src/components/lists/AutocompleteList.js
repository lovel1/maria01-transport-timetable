import { Icon } from '@iconify/react'
import React from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import { store } from '../../store'

const AutocompleteList = ({ autocompleteList, setAutocompleteList, setInput, setAction }) => {
    const { dispatch } = store

    const handleListItemClick = item => {
        setInput(item.name)
        dispatch({
            type: setAction,
            payload: item
        })
        setAutocompleteList([])
    }

    return (
        <div className={styles.container}>
            <OutsideClickHandler onOutsideClick={() => setAutocompleteList([])}>
            {autocompleteList.slice(0, 3).map((item, index) => {
                return (
                    <div key={'autocomp-item-' + index} 
                         className={styles.listItem} 
                         onClick={() => handleListItemClick(item)}
                    >
                        <p className={styles.name}>{item.name}</p>
                        <Icon className={styles.icon} icon='akar-icons:check'/>
                    </div>
                )
            })}
            </OutsideClickHandler>
        </div>
    )
}

const styles = {
    container: 'absolute top-[100%] left-0 z-100 bg-slate-50 rounded w-full mt-2 shadow',
    listItem: 'py-2 px-5 border-b hover:bg-slate-100 cursor-pointer flex justify-between items-center group',
    icon: 'text-green-500 hidden group-hover:block',
    name: 'w-[80%]'
}

export default AutocompleteList