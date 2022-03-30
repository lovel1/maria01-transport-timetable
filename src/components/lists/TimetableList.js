import React from 'react'
import TripCard from '../listItems/TripCard'
import { useSelector } from 'react-redux'
import Loader from '../Loader'

const TimetableList = () => {
  const { data, isLoading } = useSelector(state => state.trips)

  return (
    <div className={isLoading ? styles.loading : styles.container}>
        {isLoading 
          ? <Loader />
          : data.map((trip, index) => <TripCard key={'trip-card-' + index} trip={trip}/>)
        }
    </div>
  )
}

const styles = {
    container: 'flex flex-col gap-y-4 flex-1',
    loading: 'flex flex-1 items-center justify-center'
}

export default TimetableList