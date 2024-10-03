// const key = import.meta.env.VITE_TOM_TOM_KEY
const key = 'PBeBW1DgXevPwYaAIuYKQfepBXm6uSx4'
import type { GetDirections, Directions } from '@/types/location'
import { fetchWrapper } from '@/fetch/fetchWrapper'

export const fetchDirections = async ({
  breweryLat,
  breweryLong,
  userLat,
  userLong
}: GetDirections): Promise<Directions> => {
  const url = `https://api.tomtom.com/routing/1/calculateRoute/${userLat}%2C${userLong}%3A${breweryLat}%2C${breweryLong}/json?instructionsType=text&traffic=true&avoid=unpavedRoads&travelMode=car&vehicleCommercial=false&key=${key}`

  try {
    const directions = await fetchWrapper<Directions>(url)
    return directions
  } catch (error) {
    throw new Error('Error fetching directions')
  }
}
