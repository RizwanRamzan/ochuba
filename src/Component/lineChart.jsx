import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

const data = [
  { name: '0', leftValue: 200, },
  { name: '10', leftValue: 30, },
  { name: '20', leftValue: 10, },
  { name: '30', leftValue: 20, },
  { name: '40', leftValue: 30, },
  { name: '50', leftValue: 40, },
  { name: '60', leftValue: 50, },
  { name: '70', leftValue: 60, },
  { name: '80', leftValue: 100, },
  { name: '90', leftValue: 80, },
  { name: '100', leftValue: 90, },

];

const RenderLineChart = () => (
  <ResponsiveContainer width="100%" height={400}>
    <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <Line type='bump' dataKey="leftValue" name="Left Value" stroke="#8884d8" />
      <LabelList dataKey="leftValue" position="left" /> {/* Display labels on the left side */}
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis  hide={true} />
      <Tooltip />
    </LineChart>
  </ResponsiveContainer>
);

export default RenderLineChart