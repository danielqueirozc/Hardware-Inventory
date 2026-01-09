  export interface RegisterType {
    name: string
    email: string
    password: string
  }

  export interface LoginType {
    email: string
    password: string
  }

  export enum ItemType {
    Computer = 'Computer',
    Component = 'Component',
    Notebook = 'Notebook',
    Materials = 'Materials',
    Cables = 'Cables'
  }

  export enum ItemFilterType {
    Lab_Línguas,
    Lab_Informática,
    Lab_Hardware 
  }