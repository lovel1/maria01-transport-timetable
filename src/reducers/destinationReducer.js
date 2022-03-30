import { REMOVE_DESTINATION, SET_DESTINATION } from "../constants/destinationConstants"

export const destinationReducer = (state = null, action) => {
    switch (action.type) {
      case SET_DESTINATION:
        return action.payload
      case REMOVE_DESTINATION:
        return null
      default:
        return state
    }
}