import React, { useEffect, useState } from 'react'
import { locations, locationTypes } from '../constants/locationsConstants'
import { store } from '../store'
import { useSelector } from 'react-redux'
import { REMOVE_ORIGIN, SET_ORIGIN } from '../constants/originConstants'
import LocationTypeButton from './buttons/LocationTypeButton'
import { REMOVE_DESTINATION, SET_DESTINATION } from '../constants/destinationConstants'
import LocationInput from './inputs/LocationInput'
import { motion } from 'framer-motion'

const OriginPicker = ({ pointType, initialValue = null }) => {
    const pointName = pointType === 'origin' ? 'Origin' : 'Destination'
    const point = useSelector(state => {
        return pointType === 'origin' ? state.origin : state.destination
    })
    const removeAction = pointType === 'origin' ? REMOVE_ORIGIN : REMOVE_DESTINATION
    const setAction = pointType === 'origin' ? SET_ORIGIN : SET_DESTINATION
    const [inputType, setInputType] = useState('')
    const [input, setInput] = useState('')
    const locationTypesToShow = [...locationTypes, 'Custom']
    const { dispatch } = store

    const onLocationTypeClick = type => {
        const locationToSet = locations.find(location => location.type === type)
        if (!locationToSet) {
            dispatch({
                type: removeAction,
                payload: null
            })
            return
        }
        dispatch({
            type: setAction,
            payload: locationToSet
        })
    }

    useEffect(() => {
        if (initialValue === 'Maria 01') {
            const locationToSet = locations.find(location => location.type === initialValue)
            dispatch({
                type: setAction,
                payload: locationToSet
            })
        }
    }, [])

    useEffect(() => {
        if (!point) {
            setInputType('Custom')
            setInput('')
            return
        }
        const location = locations.find(location => location.name === point.name)
        location ? setInputType(location.type) : setInputType('Custom')
    }, [point])

    return (
        <motion.div layout className={styles.container}>
            <motion.p layout className={styles.label}>{pointName}</motion.p>
            <motion.div layout className={styles.optionsWrapper}>
                {
                    locationTypesToShow.map((item, index) => 
                        <LocationTypeButton name={item} 
                                            onEditClick={onLocationTypeClick} 
                                            activeType={inputType} 
                                            pointType={pointType}
                                            key={pointType + '-type-' + index}
                        />    
                    )
                }
            </motion.div>
            {inputType !== 'Maria 01' &&
                <LocationInput 
                    point={point} 
                    setAction={setAction}
                    removeAction={removeAction} 
                    input={input} 
                    setInput={setInput}
                />
            }
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

export default OriginPicker