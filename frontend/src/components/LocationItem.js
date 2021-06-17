import {Card, CardContent} from "@material-ui/core";

export default function LocationItem({location}) {

    return (
        <div>
            <Card>
                <CardContent>
                    <p>
                        {location.title}
                    </p>
                </CardContent>
            </Card>
        </div>
    )

}