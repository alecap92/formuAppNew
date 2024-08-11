import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getDocumentsUsage } from "../../services/api";

const ProcedimientosGrafica: React.FC = () => {
  const [usage, setUsage] = useState([]);

  const getUsage = async () => {
    const usage = await getDocumentsUsage();
    setUsage(usage);
  };

  useEffect(() => {
    getUsage();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={150}>
      <LineChart
        data={usage}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="mes" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="procedimientos"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProcedimientosGrafica;
