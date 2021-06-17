import useLocations from "../hooks/useLocations";
import LocationItem from "../components/LocationItem"

export default function LocationsPage() {

    const locations = useLocations()

    return (
        <div>
            {locations.map((location) => <LocationItem key={location.id} location={location}/>)}
        </div>
    );
}