import { Vehicle } from '../models'

export const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => {
  return (
    <div className="card bg-base-100 shadow-xl image-full h-full w-full">
      <figure>
        <img src={vehicle.icons.medium} alt={vehicle.title} loading="lazy" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{vehicle.title}</h2>
        <p className="">
          {vehicle.type.title} • {vehicle.nation.title}
        </p>
        <p className="line-clamp-4">{vehicle.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Read...</button>
        </div>
        <div className="absolute h-7 w-7 bg-base-100 rounded-full right-2 top-2 grid place-items-center">
          <p className="">{vehicle.level}</p>
        </div>
      </div>
    </div>
  )
}
