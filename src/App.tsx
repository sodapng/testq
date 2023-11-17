import { request, gql } from 'graphql-request'
import { useMemo, useState } from 'react'
import { VirtuosoGrid } from 'react-virtuoso'
import useSWR from 'swr'
import { Checkbox, Loader, TextBold, VehicleCard } from './components'
import { Vehicle } from './models'

const BASE_URL = 'https://vortex.korabli.su/api/graphql/glossary/'

const document = gql`
  {
    vehicles {
      id
      title
      description
      icons {
        large
        medium
      }
      level
      type {
        name
        title
        icons {
          default
        }
      }
      nation {
        name
        title
        color
        icons {
          small
          medium
          large
        }
      }
    }
  }
`

const countries = [
  'Japan',
  'U.S.A.',
  'U.S.S.R.',
  'Germany',
  'U.K.',
  'France',
  'Pan-Asia',
  'Italy',
  'Commonwealth',
  'Pan-America',
  'Europe',
  'The Netherlands',
  'Spain',
]

const shipClasses = [
  'Submarine',
  'Destroyer',
  'Cruiser',
  'Battleship',
  'Aircraft Carrier',
]

const levels = Array.from({ length: 11 }, (_, idx) => idx + 1)

export const App = () => {
  const { isLoading, data } = useSWR(document, (query) =>
    request<{ vehicles: Vehicle[] }>(BASE_URL, query)
  )

  const [valueCountries, setValueCountries] = useState<string[]>([])
  const [valueShipClasses, setValueShipClasses] = useState<string[]>([])
  const [valueLevel, setValueLevels] = useState<string[]>([])

  const filtredVehicles = useMemo(() => {
    return data?.vehicles.filter((vehicle) => {
      return (
        (!valueLevel.length || valueLevel.includes(String(vehicle.level))) &&
        (!valueCountries.length ||
          valueCountries.includes(vehicle.nation.title)) &&
        (!valueShipClasses.length ||
          valueShipClasses.includes(vehicle.type.title))
      )
    })
  }, [valueLevel, valueCountries, valueShipClasses, data])

  if (isLoading) {
    return (
      <div className="min-h-screen container mx-auto px-4 py-2 grid place-items-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="min-h-screen container gap-2 grid grid-cols-[1fr_5fr] mx-auto px-4 py-2">
      <div className="bg-base-300 rounded-md p-2 sticky max-h-[90vh] top-2">
        <div className="space-y-1 rounded-md bg-base-300 p-1 h-full overflow-auto divide-y divide-base-100">
          <Checkbox.Group
            label={<TextBold>Страна</TextBold>}
            value={valueCountries}
            onChange={setValueCountries}
          >
            {countries.map((countrie) => (
              <Checkbox key={countrie} value={countrie} label={countrie} />
            ))}
          </Checkbox.Group>
          <Checkbox.Group
            label={<TextBold>Уровень</TextBold>}
            value={valueLevel}
            onChange={setValueLevels}
          >
            {levels.map((level) => (
              <Checkbox key={level} value={String(level)} label={level} />
            ))}
          </Checkbox.Group>
          <Checkbox.Group
            label={<TextBold>Класс</TextBold>}
            value={valueShipClasses}
            onChange={setValueShipClasses}
          >
            {shipClasses.map((shipClass) => (
              <Checkbox key={shipClass} value={shipClass} label={shipClass} />
            ))}
          </Checkbox.Group>
        </div>
      </div>
      <VirtuosoGrid
        itemContent={(_idx, vehicle) => <VehicleCard vehicle={vehicle} />}
        listClassName="grid grid-cols-3 gap-4"
        data={filtredVehicles}
        useWindowScroll
      />
    </div>
  )
}
