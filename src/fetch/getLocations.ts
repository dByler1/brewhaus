// const key = import.meta.env.VITE_TOM_TOM_KEY
const key = 'PBeBW1DgXevPwYaAIuYKQfepBXm6uSx4'
import type { GetDirections } from '@/types/location'

export const fetchPoi = (query: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const url = `https://api.tomtom.com/search/2/poiSearch/${query}.json/?key=${key}`
    fetch(url)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            resolve(data)
          })
        } else {
          reject('Error fetching POI')
        }
      })
      .catch(function () {
        reject('Error fetching POI')
      })
  })
}

export const fetchLocation = (query: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const url = `https://api.tomtom.com/search/2/search/${query}.json?key=${key}`
    fetch(url)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            resolve(data)
          })
        } else {
          reject('Error fetching location')
        }
      })
      .catch(function () {
        reject('Error fetching location')
      })
  })
}

export const fetchDirections = ({
  breweryLat,
  breweryLong,
  userLat,
  userLong
}: GetDirections): Promise<any> => {
  const url = `https://api.tomtom.com/routing/1/calculateRoute/${userLat}%2C${userLong}%3A${breweryLat}%2C${breweryLong}/json?instructionsType=text&traffic=true&avoid=unpavedRoads&travelMode=car&vehicleCommercial=false&key=${key}`
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            resolve(data)
          })
        } else {
          reject('Error fetching directions')
        }
      })
      .catch(function () {
        reject('Error fetching directions')
      })
  })
}
