/**
 * Chart Components
 * Bar chart and Pie chart for dashboard analytics
 */

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { cn } from '@/lib/utils';
import type { ChartDataPoint } from '@/types';

interface BarChartProps {
  data: ChartDataPoint[];
  title: string;
  className?: string;
}

const WARD_COLORS = [
  '#1E40AF', // Royal Blue (Ward 1)
  '#991B1B', // Dark Red (Ward 2)
  '#065F46', // Dark Emerald (Ward 3)
  '#92400E', // Dark Orange (Ward 4)
  '#5B21B6', // Dark Purple (Ward 5)
  '#155E75', // Dark Cyan (Ward 6)
];

/**
 * ComplaintsBarChart - Bar chart showing complaints per ward
 */
export function ComplaintsBarChart({ data, title, className }: BarChartProps) {
  return (
    <div className={cn('dashboard-card', className)}>
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
              cursor={{ fill: 'transparent' }}
            />
            {/* 3. Updated Bar to map through colors */}
            <Bar
              dataKey="value"
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={WARD_COLORS[index % WARD_COLORS.length]} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

interface PieChartProps {
  data: ChartDataPoint[];
  title: string;
  className?: string;
}

// Colors for pie chart segments
const COLORS = [
  'hsl(var(--status-open))',
  'hsl(var(--status-progress))',
  'hsl(var(--status-closed))',
];

/**
 * StatusPieChart - Pie chart showing complaint status distribution
 */
export function StatusPieChart({ data, title, className }: PieChartProps) {
  return (
    <div className={cn('dashboard-card', className)}>
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Legend
              formatter={(value) => (
                <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
