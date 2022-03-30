import axios from "axios"
import { locations } from "../constants/locationsConstants"

export const getActiveLocationType = origin => {
    if (!origin || !locations.find(location => location.name === origin.name)) {
        return 'Custom'
    } 
    
    const activeLocation = locations.find(location => location.name === origin.name)
    return activeLocation.type
  }
  
export const getAutocompleteList = async (query, setAutocompleteList) => {
    const url = `http://api.digitransit.fi/geocoding/v1/autocomplete?text=${query}&focus.point.lat=60.17&focus.point.lon=24.93&region=Uusimaa`

    axios.get(url)
        .then(res => {
        const data = res.data.features.map(item => {
            return {
            name: item.properties.label,
            latLon: item.geometry.coordinates
            }
        })
        setAutocompleteList(data)
        })
        .catch(err => {
            console.log(err)
        })
}