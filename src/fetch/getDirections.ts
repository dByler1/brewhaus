// const key = import.meta.env.VITE_TOM_TOM_KEY

type GetDirections = {
  breweryLat: number | string
  breweryLong: number | string
  userLat: number | string
  userLong: number | string
}
export const fetchDirections = ({
  breweryLat,
  breweryLong,
  userLat,
  userLong
}: GetDirections): Promise<any> => {
  const url = `https://api.tomtom.com/routing/1/calculateRoute/${userLat}%2C${userLong}%3A${breweryLat}%2C${breweryLong}/json?instructionsType=text&traffic=true&avoid=unpavedRoads&travelMode=car&vehicleCommercial=false&key=PBeBW1DgXevPwYaAIuYKQfepBXm6uSx4`
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
