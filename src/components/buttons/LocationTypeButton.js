import React from 'react'
import { REMOVE_DESTINATION, SET_DESTINATION } from '../../constants/destinationConstants'
import { locations } from '../../constants/locationsConstants'
import { REMOVE_ORIGIN, SET_ORIGIN } from '../../constants/originConstants'
import { store } from '../../store'

const LocationTypeButton = ({ name, onEditClick, activeType, pointType }) => {
  const { dispatch } = store
  const isActive = activeType === name
  const removeAction = pointType !== 'origin' ? REMOVE_ORIGIN : REMOVE_DESTINATION
  const setAction = pointType !== 'origin' ? SET_ORIGIN : SET_DESTINATION

  const onClick = name => {
    const mainLocation = locations.find(location => location.type === 'Maria 01')

    onEditClick(name)

    if (name === 'Maria 01') {
      dispatch({
        type: removeAction
      })
      return
    }

    dispatch({
      type: setAction,
      payload: mainLocation
    })
  }

  return (
    <button onClick={() => onClick(name)} className={!isActive ? styles.button : styles.activeButton}>
        {name}
    </button>
  )
}

const styles = {
  button: 'font-semibold text-2xl text-slate-400',
  activeButton: 'font-semibold text-2xl text-blue-500',
}

export default LocationTypeButton