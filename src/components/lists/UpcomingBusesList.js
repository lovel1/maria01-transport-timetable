import React from 'react'
import { useSelector } from 'react-redux'
import TripShortInfoCard from '../listItems/TripShortInfoCard'

const UpcomingBusesList = ({ datetime }) => {
  const { data } = useSelector(state => state.trips)
  const vehicleTrips = data.filter(trip => trip.firstBusLeg)

  return (
    <div className={styles.container}>
      <div>
        {vehicleTrips.map((trip, index) => 
          <TripShortInfoCard key={'trip-short-info-' + index} datetime={datetime} trip={trip}/>
        )}
      </div>
    </div>
  )
}

const styles = {
    container: 'px-3 flex flex-col items-center',
    titleWrapper: 'flex gap-x-1 items-center flex-1 justify-center text-slate-700',
    icon: 'w-7 h-7',
    title: 'uppercase text-md font-semibold',
    transportNumber: 'flex items-center text-blue-500 font-semibold text-lg',
    transportIcon: 'w-6 h-6 mr-1',
    tripRow: 'flex justify-between w-80 my-4 bg-slate-300 px-4 py-2 rounded items-center',
    text: 'text-sm text-slate-700 font-semibold',
    textAdd: 'text-sm text-slate-700',
    tripInfo: 'text-right',
    departure: 'text-blue-500 font-semibold'
}

export default UpcomingBusesList
