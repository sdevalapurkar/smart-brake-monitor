import Card from 'react-bootstrap/Card';

function BrakeInfoCard(props) {
    return (
        <div>
            <Card className={props.variant}>
                <Card.Body>
                    <h5>
                        {props.topText}
                    </h5>
                    <h1>
                        {props.midText}
                    </h1>
                    <div style={{ cursor: 'pointer' }} onClick={props.onClick}>
                        {props.botText}
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default BrakeInfoCard;
