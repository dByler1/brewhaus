import type {
  Brewery,
  FetchBreweriesProps,
  FetchBreweriesResponse,
  BreweryMeta
} from '@/types/breweries'
import { fetchWrapper } from '@/fetch/fetchWrapper'

const breweryBaseUrl = 'https://api.openbrewerydb.org/v1/breweries/'

export const fetchBreweries = async ({
  location,
  page,
  per_page,
  by_type,
  by_state
}: FetchBreweriesProps): Promise<FetchBreweriesResponse> => {
  const locationQuery = location ? `&by_dist=${location.latitude},${location.longitude}` : ''
  const type = by_type ? `&by_type=${by_type}` : ''
  const state = by_state ? `&by_state=${by_state}` : ''

  const breweriesUrl = `${breweryBaseUrl}?page=${page}&per_page=${per_page}${locationQuery}${type}${state}`
  const metaUrl = `${breweryBaseUrl}meta/?page=${page}&per_page=${per_page}${locationQuery}${type}${state}`

  try {
    const breweries = await fetchWrapper<Brewery[]>(breweriesUrl)
    const meta = await fetchWrapper<BreweryMeta>(metaUrl)

    return { breweries, meta }
  } catch (error) {
    throw new Error('Error fetching breweries')
  }
}

export const fetchBrewery = async (id: string): Promise<Brewery> => {
  const url = `${breweryBaseUrl}${id}`
  try {
    const brewery = await fetchWrapper<Brewery>(url)

    return brewery
  } catch (error) {
    throw new Error('Error fetching brewery')
  }
}

export const fetchSearchBreweries = async (query: string): Promise<Brewery[]> => {
  const url = `${breweryBaseUrl}autocomplete?query=${query}`
  try {
    const breweries = await fetchWrapper<Brewery[]>(url)

    return breweries
  } catch (error) {
    throw new Error('Error fetching breweries')
  }
}
