type Icons = {
  default: string
  medium: string
  small: string
  large: string
}

type TypeVehicle = {
  icons: Pick<Icons, 'default'>
  title: string
  name: string
}

type NationVehicle = {
  icons: Omit<Icons, 'default'>
  color: string
  title: string
  name: string
}

export type Vehicle = {
  icons: Pick<Icons, 'medium' | 'large'>
  nation: NationVehicle
  description: string
  type: TypeVehicle
  title: string
  level: number
  id: number
}
