import { Line } from 'react-chartjs-2';

function Graph(props) {
    return (
        <div>
            <Line data={props.data} options={props.options} />
        </div>
    );
}

export default Graph;
