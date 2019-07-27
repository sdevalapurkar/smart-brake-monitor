import Card from 'react-bootstrap/Card';

function BrakeInfoCard(props) {
    return (
        <div style={{ textAlign: "center" }}>
            <Card className={props.variant}>
                <Card.Body>
                    <h5>
                        {props.topText}
                    </h5>
                    <h1>
                        {props.midText}
                    </h1>
                </Card.Body>
            </Card>
        </div>
    );
}

export default BrakeInfoCard;
