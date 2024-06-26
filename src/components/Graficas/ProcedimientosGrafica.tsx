import React from "react";
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

const data = [
  { mes: "Enero", procedimientos: 30 },
  { mes: "Febrero", procedimientos: 20 },
  { mes: "Marzo", procedimientos: 27 },
  { mes: "Abril", procedimientos: 18 },
  { mes: "Mayo", procedimientos: 23 },
  { mes: "Junio", procedimientos: 34 },
  { mes: "Julio", procedimientos: 45 },
  { mes: "Agosto", procedimientos: 30 },
  { mes: "Septiembre", procedimientos: 40 },
  { mes: "Octubre", procedimientos: 25 },
  { mes: "Noviembre", procedimientos: 29 },
  { mes: "Diciembre", procedimientos: 32 },
];

const ProcedimientosGrafica: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={150}>
      <LineChart
        data={data}
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
