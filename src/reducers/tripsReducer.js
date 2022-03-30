import { ERROR_TRIPS, LOAD_TRIPS, SET_TRIPS } from "../constants/tripsConstants"

export const tripsReducer = (state = [], action) => {
    switch (action.type) {
      case LOAD_TRIPS:
        return { ...state, isLoading: true }
      case SET_TRIPS:
        return { data: action.payload.data, isLoading: false, error: ''}
      case ERROR_TRIPS:
        return { ...state, isLoading: false, error: action.payload.error}
      default:
        return state
    }
}