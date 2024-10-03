export interface Location {
  latitude: number
  longitude: number
}

export type GetDirections = {
  breweryLat: number | string
  breweryLong: number | string
  userLat: number | string
  userLong: number | string
}

export type Directions = {
  routes: [
    {
      summary: {
        lengthInMeters: number
      }
      guidance: {
        instructions: [
          {
            message: string
          }
        ]
      }
    }
  ]
}
