
import { Area, AreaChart, ResponsiveContainer } from 'recharts';

interface MiniChartProps {
  data: { time: string; price: number }[];
  percentChange: number;
}

export function MiniChart({ data, percentChange }: MiniChartProps) {
  const color = percentChange >= 0 ? "#16c784" : "#ea3943";
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={`colorGradient-${percentChange}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="price"
          stroke={color}
          strokeWidth={1.5}
          fillOpacity={1}
          fill={`url(#colorGradient-${percentChange})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
