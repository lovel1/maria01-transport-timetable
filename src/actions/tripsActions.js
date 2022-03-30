import axios from "axios"
import dayjs from "dayjs"
import { transportTypeIcon } from "../constants/iconsConstants"
import { ERROR_TRIPS, LOAD_TRIPS, SET_TRIPS } from "../constants/tripsConstants"
import { convertSecondsToMinutes } from "../helpers/dateTimeConverter"
import { store } from "../store"

const url = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'
const { dispatch } = store

export const getTrips = (origin, destination, updatable = false) => {
  
    if (!origin.latLon || !destination.latLon) {
      console.log('Bad coordinates')
      return
    }

    const originCoordinates = `{lat: ${origin.latLon[1]}, lon: ${origin.latLon[0]}}`
    const destinationCoordinates = `{lat: ${destination.latLon[1]}, lon: ${destination.latLon[0]}}`
    const query = `query trips {
        plan(
          from: ${originCoordinates}
          to: ${destinationCoordinates}
          numItineraries: 3
        ) {
          itineraries{
            walkDistance,
            duration,
            legs {
              mode
              startTime
              endTime
              from {
                lat
                lon
                stop {
                  code
                  name
                  stoptimesForPatterns(omitNonPickups: true, timeRange: 1800) {
                    pattern {
                      code
                    }
                    stoptimes {
                      scheduledDeparture
                    }
                  }
                }
              },
              to {
                lat
                lon
                stop {
                  code
                  name
                }
              },
              trip {
                routeShortName
              }
              distance
            }
          }
        }
      }`

    !updatable && dispatch({ type: LOAD_TRIPS })
    axios.post(url, { query })
      .then(res => {
        const resData = res.data.data.plan.itineraries
        const processedData = resData.map(trip => 
            processTrip(trip)
        )
        dispatch({ 
          type: SET_TRIPS, 
          payload: {
            data: processedData
          }
        })
      })
      .catch(err => dispatch({ 
        type: ERROR_TRIPS,
        error: err || 'Error'
      }))
}

export const processTrip = trip => {
  const { duration, legs, walkDistance } = trip
  const convertedDuration = convertSecondsToMinutes(duration)
  const startTime = dayjs(legs[0].startTime).format('HH:mm')
  const endTime = dayjs(legs[legs.length - 1].endTime).format('HH:mm')
  const startToEndTime = `${startTime} - ${endTime}`
  const firstBusLeg = legs.find(leg => 
      leg.mode === 'BUS' || leg.mode === 'TRAM' || leg.mode === 'SUBWAY' || leg.mode === 'RAIL'
  )
  const transportDepartureTime = firstBusLeg
      ? dayjs(firstBusLeg.startTime)
      : null

  const transportDepartureStation = firstBusLeg 
      ? firstBusLeg.from.stop.name + ' ' + firstBusLeg.from.stop.code
      : null

  const routeName = firstBusLeg 
      ? firstBusLeg.trip.routeShortName
      : null

  const transportIcon = firstBusLeg 
    ? transportTypeIcon[firstBusLeg.mode]
    : transportTypeIcon['WALK']

  const processedTrip = {
    convertedDuration,
    startTime,
    endTime,
    startToEndTime,
    firstBusLeg,
    transportDepartureTime,
    transportDepartureStation,
    routeName,
    transportIcon,
    walkDistance,
    legs
  }

  return processedTrip
}

export const processLeg = leg => {
  const { startTime, endTime, mode } = leg
  const icon = transportTypeIcon[mode]
  const timeDiff = dayjs(endTime).diff(dayjs(startTime))
  const duration = dayjs(timeDiff).add(30, 's').format('m')
  const isWalk = mode === 'WALK' 
  return { icon, isWalk, duration }
}



