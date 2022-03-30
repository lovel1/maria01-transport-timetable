import { Icon } from '@iconify/react'
import dayjs from 'dayjs'
import React from 'react'

const TripShortInfoCard = ({ trip, datetime }) => {
    const timeDiff = trip.transportDepartureTime.diff(datetime)
    const timeToDepart = dayjs(timeDiff).format('m')

    return (
      <div className={styles.tripRow}>
        <div className={styles.transportNumber}>
          <Icon className={styles.transportIcon} icon={trip.transportIcon}/>
          <p>{trip.routeName}</p>
        </div>
        <div className={styles.tripInfo}>
          <p className={styles.text}>Departs in {timeToDepart} min</p>
          <p className={styles.textAdd}>
            <span className={styles.departure}>{trip.transportDepartureStation} </span> 
            at <span className={styles.departure}>{trip.transportDepartureTime.format('HH:mm')}</span>
          </p>
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

export default TripShortInfoCard