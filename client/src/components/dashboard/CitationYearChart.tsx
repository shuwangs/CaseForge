
import { Line } from 'react-chartjs-2';
import { Chart, LinearScale } from 'chart.js/auto';
import useCitation from '../../contexts/useCitation.js';

Chart.register(LinearScale);

const CitationYearChart = () => {
    const { citationYearlyCount } = useCitation();

    const data = {
        labels: citationYearlyCount.map((data) => data.citing_year),
        datasets: [
            {
                label: 'Citation Trend Over the Years',
                data: citationYearlyCount.map((data) => data.citation_count),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <div>
            <Line data={data} />
        </div>
    )

}

export default CitationYearChart;