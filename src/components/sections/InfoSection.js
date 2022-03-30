import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import Clock from '../Clock'
import UpcomingBusesList from '../lists/UpcomingBusesList'
import { motion } from 'framer-motion'

const InfoSection = () => {
  const [datetime, setDatetime] = useState(dayjs())
  
  useEffect(() => {
    const interval = setInterval(() => setDatetime(dayjs()), 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.container}>
        <motion.div layout className={styles.subContainer}>
            <Clock datetime={datetime}/>
            <hr className={styles.hr}/>
            <UpcomingBusesList datetime={datetime}/>
        </motion.div>
    </div>
  )
}

const styles = {
    container: 'py-10 lg:py-0 flex-1 px-10 lg:flex justify-center items-center',
    hr: 'border-slate-300 my-5',
}

export default InfoSection