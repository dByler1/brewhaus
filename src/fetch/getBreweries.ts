import type { Brewery, FetchBreweriesProps, FetchBreweriesResponse } from '@/types/breweries'

export const fetchBreweries = async ({
  location,
  page,
  per_page,
  by_type
}: FetchBreweriesProps): Promise<FetchBreweriesResponse | string> => {
  const locationQuery = location ? `&by_dist=${location.latitude},${location.longitude}` : ''
  const type = by_type ? `&by_type=${by_type}` : ''

  const breweriesUrl = `https://api.openbrewerydb.org/v1/breweries/?page=${page}&per_page=${per_page}${locationQuery}${type}`

  const metaUrl = `https://api.openbrewerydb.org/v1/breweries/meta/?page=${page}&per_page=${per_page}${locationQuery}${type}`

  return new Promise((resolve, reject) => {
    const breweriesPromise = fetch(breweriesUrl).then((response) => response.json())
    const metaPromise = fetch(metaUrl).then((response) => response.json())

    Promise.all([breweriesPromise, metaPromise])
      .then(([breweriesData, metaData]) => {
        resolve({ breweries: breweriesData, meta: metaData })
      })
      .catch(() => {
        reject('Error fetching breweries')
      })
  })
}

export const fetchBrewery = async (id: string): Promise<Brewery | string> => {
  const url = `https://api.openbrewerydb.org/v1/breweries/${id}`
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(function (response) {
        response.json().then(function (data) {
          resolve(data)
        })
      })
      .catch(function () {
        reject('Error fetching brewery')
      })
  })
}

export const fetchSearchBreweries = (query: string): Promise<Brewery[] | string> => {
  return new Promise((resolve, reject) => {
    const url = `https://api.openbrewerydb.org/v1/breweries/search?query=${query}`

    fetch(url)
      .then(function (response) {
        response.json().then(function (data) {
          resolve(data)
        })
      })
      .catch(function () {
        reject('Error fetching breweries')
      })
  })
}
