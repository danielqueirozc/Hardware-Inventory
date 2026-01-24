export interface RegisterType {
  name: string
  email: string
  password: string
}

export interface LoginType {
  email: string
  password: string
}

export const ItemType = {
  Computer: 'Computer',
  Component: 'Component',
  Notebook: 'Notebook',
  Materials: 'Materials',
  Cables: 'Cables'
} as const

export type ItemType = (typeof ItemType)[keyof typeof ItemType]

// objeto com as const para substituir enum
export const ItemFilterType = {
  Lab_Línguas: "Lab_Línguas",
  Lab_Informática: "Lab_Informática",
  Lab_Hardware: "Lab_Hardware"
} as const

export type ItemFilterType = (typeof ItemFilterType)[keyof typeof ItemFilterType]

export interface EditItemType {
  id: string
  name: string
  amount: number
  filters: ItemFilterType[]
}

export interface CreateItemType {
  name: string
  amount: number
  type: ItemType
  filters: ItemFilterType[]
}
