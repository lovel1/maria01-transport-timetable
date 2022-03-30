import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import { getAutocompleteList } from '../../actions/helperActions'
import { store } from '../../store'
import AutocompleteList from '../lists/AutocompleteList'
import { motion } from 'framer-motion'

export const LocationInput = ({ point, removeAction, input, setInput ,setAction }) => {
    const { dispatch } = store
    const [autocompleteList, setAutocompleteList] = useState([])

    const onEditClick = () => {
        dispatch({
            type: removeAction,
            payload: null
        })
        setInput('')
    }

    useEffect(() => {
        if (input.length < 3) {
            setAutocompleteList([])
            return
        }

        if (point && input === point.name) return

        getAutocompleteList(input, setAutocompleteList)
    }, [input])

    return (
    <motion.div layout 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
    >
        <p className={styles.label + ' mt-4'}>Location</p>
        <div className={styles.inputWrapper}>
            {!point 
                ? <input className={styles.input} 
                            placeholder='Search by location'
                            value={input}
                            onChange={event => setInput(event.target.value)}
                            autoComplete="off"
                            id='input'
                    />
                : <div className={styles.submittedLocation}>
                    <p>{point.name}</p>
                    </div>
                
            }
            
            {point && 
                <button onClick={onEditClick} className={styles.button}>
                    <Icon className={styles.icon} icon='eva:edit-outline'/>
                </button>
            }

            {(autocompleteList.length > 0) 
                && <AutocompleteList  autocompleteList={autocompleteList} 
                                      setAutocompleteList={setAutocompleteList} 
                                      setInput={setInput}
                                      setAction={setAction}
                   />
            }
        </div>
    </motion.div>
    )
}

const styles = {
    container: 'bg-slate-100 px-5 py-3 rounded',
    label: 'uppercase text-slate-500 font-semibold mb-1 text-sm',
    optionsWrapper: 'flex gap-x-4',
    option: 'font-semibold text-2xl text-slate-400',
    active: ' text-blue-500 font-semibold',
    input: 'focus:outline-none bg-transparent border-b-2 focus:border-blue-500 py-1 flex-1',
    button: 'p-1 bg-blue-500 rounded-full text-white hover:bg-blue-600',
    icon: 'w-5 h-5',
    disabledButton: 'p-1 bg-slate-300 rounded-full text-white cursor-default',
    inputWrapper: 'flex gap-3 items-center relative w-full',
    submittedLocation: 'flex-1 py-1 px-2 bg-slate-200 rounded text-slate-500 border-b-2'
}

export default LocationInput