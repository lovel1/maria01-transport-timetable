import { Icon } from '@iconify/react'
import React from 'react'
import { processLeg } from '../../actions/tripsActions'

const TripBarElement = ({ leg }) => {
    const processedLeg = processLeg(leg)
    const widthColor = processedLeg.isWalk ? ' w-1/6 bg-slate-200' : ' flex-1 bg-blue-500 text-white'
    const routeName = !processedLeg.isWalk 
        ? leg.trip.routeShortName
        : ''
    return (
        <div className={styles.barElement + widthColor}>
            <Icon icon={processedLeg.icon} className={styles.icon}/>
            {routeName && <p>{routeName}</p>}
            {processedLeg.isWalk && <p>{processedLeg.duration}</p>}
        </div>
    )
}

const styles = {
    barElement: 'flex rounded px-2 text-slate-700 my-1 items-center gap-x-1 font-semibold',
    icon: 'w-5 h-5'
}

export default TripBarElement