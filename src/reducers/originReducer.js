import { REMOVE_ORIGIN, SET_ORIGIN } from "../constants/originConstants"

export const originReducer = (state = null, action) => {
    switch (action.type) {
      case SET_ORIGIN:
        return action.payload
      case REMOVE_ORIGIN:
        return null
      default:
        return state
    }
}