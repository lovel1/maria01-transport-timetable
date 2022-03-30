import React, { useEffect, useRef } from 'react'
import PointPicker from '../PointPicker'
import TimetableList from '../lists/TimetableList'
import { useSelector } from 'react-redux'
import { getTrips } from '../../actions/tripsActions'

const TimetableSection = () => {
  const origin = useSelector(state => state.origin)
  const destination = useSelector(state => state.destination)
  const updateIntervalRef = useRef()

  useEffect(() => {
    if (!origin || !destination) return

    getTrips(origin, destination)
    setTimeout(() => {
      const updateInterval = setInterval(() => getTrips(origin, destination, true), 60000)
      updateIntervalRef.current = updateInterval
    }, 60000)
    
    return () => clearInterval(updateIntervalRef.current)
  }, [origin, destination])

  return (
    <div className={styles.container}>
        <PointPicker initialValue={'Maria 01'} pointType={'origin'}/>
        <PointPicker pointType={'destination'}/>
        <hr/>
        <TimetableList />
    </div>
  )
}

const styles = {
    container: 'px-5 w-full md:w-1/3 bg-slate-50 md:px-10 pt-10 flex flex-col gap-y-5',
}

export default TimetableSection