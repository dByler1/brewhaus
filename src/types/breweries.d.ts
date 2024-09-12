import type { Location } from '@/types/location'

export type Brewery = {
  id: string
  name: string
  brewery_type: string
  address_1: string
  address_2: null
  address_3: null
  city: string
  state_province: string
  postal_code: string
  country: string
  longitude: string
  latitude: string
  phone: string
  website_url: string
  state: string
  street: string
}

export interface FetchBreweriesProps {
  page: number
  per_page: number
  by_type?: string
  location?: Location
}

export interface BreweryMeta {
  total: string
  page: string
  per_page: string
}

export interface FetchBreweriesResponse {
  breweries: Brewery[]
  meta: BreweryMeta
}
