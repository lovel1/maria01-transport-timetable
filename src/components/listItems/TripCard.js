import React from 'react'
import { motion } from 'framer-motion'
import TripBarElement from './TripBarElement'

const TripCard = ({ trip }) => {
    return (
        <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.container}>

            <div className={styles.row}>
                <p>{trip.startToEndTime}</p>
                <p>{trip.convertedDuration} min</p>
            </div>

            <div className={styles.visualTripBar}>
                {trip.legs.map((leg, index) => 
                    <TripBarElement key={'bar-elem-' + index} leg={leg}/>
                )}
            </div>

            <div className={styles.rowSmall}>
                {trip.firstBusLeg 
                    && <p>
                        From <span className={styles.departure}>{trip.transportDepartureStation} </span> 
                        at <span className={styles.departure}>{trip.transportDepartureTime.format('HH:mm')}</span>
                        </p>
                }
            </div>
        </motion.div>
    )
}

const styles = {
    container: 'pb-4 border-b mx-5',
    row: 'flex justify-between font-bold text-lg',
    busNumber: 'flex items-center text-blue-500 font-semibold text-lg',
    busIcon: 'w-6 h-6 mr-1',
    text: 'text-slate-500 font-semibold',
    rowSmall: 'flex justify-between text-slate-500 text-sm',
    departure: 'text-blue-500 font-semibold',
    visualTripBar: 'flex gap-x-1',
    barElement: 'flex rounded px-2 text-slate-700 my-1 items-center gap-x-1 font-semibold',
    icon: 'w-5 h-5'
}

export default TripCard