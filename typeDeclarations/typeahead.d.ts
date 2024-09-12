declare module 'vue3-simple-typeahead'
export type Typeahead = {
  id?: string
  placeholder?: string
  items: unknown[]
  defaultItem?: {} | null
  itemProjection?: (item: unknown) => unknown
  minInputLength?: number
  minItemLength?: number
  selectOnTab?: boolean
}
