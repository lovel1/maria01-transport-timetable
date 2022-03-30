import React from 'react'

const Clock = ({ datetime }) => {

  return (
    <div className={styles.clockWrapper}>
        <h1 className={styles.time}>{datetime.format('H:mm')}</h1>
        <p className={styles.date}>{datetime.format('D MMM YYYY')}</p>
    </div>
  )
}

const styles = {
  clockWrapper: 'flex flex-col items-center gap-y-2',
  time: 'font-bold text-9xl',
  date: 'font-semibold text-slate-700'
}

export default Clock