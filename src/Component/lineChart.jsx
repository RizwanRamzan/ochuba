import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { name: '0', uv: 200, pv: 2400, amt: 2400 },
  { name: '10', uv: 30, pv: 2400, amt: 2400 },
  { name: '20', uv: 10, pv: 2400, amt: 2400 },
  { name: '30', uv: 20, pv: 2400, amt: 2400 },
  { name: '40', uv: 30, pv: 2400, amt: 2400 },
  { name: '50', uv: 40, pv: 2400, amt: 2400 },
  { name: '60', uv: 50, pv: 2400, amt: 2400 },
  { name: '70', uv: 60, pv: 2400, amt: 2400 },
  { name: '80', uv: 100, pv: 2400, amt: 2400 },
  { name: '90', uv: 80, pv: 2400, amt: 2400 },
  { name: '100', uv: 90, pv: 2400, amt: 2400 },

];

const RenderLineChart = () => (
  <LineChart width={800} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
    <Line type='natural' dataKey="uv" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
  </LineChart>
);

export default RenderLineChart