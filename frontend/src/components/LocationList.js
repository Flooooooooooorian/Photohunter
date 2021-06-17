import LocationItem from "./LocationItem";

export default function LocationList({locations}) {
    return (
        <div>
            {locations.map((location) => <LocationItem key={location.id} location={location}/>)}
        </div>
    )
}