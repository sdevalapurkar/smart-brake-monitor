import { Scatter } from 'react-chartjs-2';

function Graph(props) {
    console.log('props here man', props.data);
    return (
        <div>
            <Scatter
                data={props.data}
                options={props.options}
                height={100}
            />
        </div>
    );
}

export default Graph;
