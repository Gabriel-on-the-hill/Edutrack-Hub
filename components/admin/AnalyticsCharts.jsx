import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';

export default function AnalyticsCharts({ data, currency = 'NGN', exchangeRate = 0.0011 }) {
    if (!data || data.length === 0) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {[1, 2].map(i => (
                    <div key={i} className="h-80 bg-slate-50 rounded-2xl border border-slate-100 animate-pulse flex items-center justify-center">
                        <span className="text-slate-300 font-medium">Loading visualization...</span>
                    </div>
                ))}
            </div>
        );
    }

    const formatCurrency = (value) => {
        let val = value;
        let curr = 'NGN';
        if (currency === 'USD') {
            val = value * exchangeRate;
            curr = 'USD';
        }

        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: curr,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(val);
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white/90 backdrop-blur-md p-4 border border-slate-100 shadow-xl rounded-2xl">
                    <p className="font-bold text-slate-800 mb-2">{label}</p>
                    {payload.map((entry, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                            <p className="text-sm font-medium text-slate-600">
                                {entry.name}: <span className="text-slate-900 font-bold">
                                    {entry.name.includes('Revenue') ? formatCurrency(entry.value) : entry.value}
                                </span>
                            </p>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Revenue Trend */}
            <div className="bg-white rounded-3xl shadow-sm p-8 border border-slate-100 hover:shadow-xl transition-all duration-300">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Revenue Trend</h3>
                        <p className="text-sm text-slate-500">Trailing 6 months performance</p>
                    </div>
                    <div className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold rounded-full border border-teal-100 capitalize">
                        {currency} Chart
                    </div>
                </div>

                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis
                                dataKey="name"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: '#64748b', fontWeight: 500 }}
                                dy={10}
                            />
                            <YAxis
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: '#64748b', fontWeight: 500 }}
                                tickFormatter={(val) => currency === 'USD' ? `$${(val * exchangeRate).toFixed(0)}` : `₦${val / 1000}k`}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                name="Gross Revenue"
                                stroke="#0ea5e9"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorRevenue)"
                                activeDot={{ r: 6, strokeWidth: 0, fill: '#0ea5e9' }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Student Growth */}
            <div className="bg-white rounded-3xl shadow-sm p-8 border border-slate-100 hover:shadow-xl transition-all duration-300">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Student Growth</h3>
                        <p className="text-sm text-slate-500">New monthly registrations</p>
                    </div>
                </div>

                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis
                                dataKey="name"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: '#64748b', fontWeight: 500 }}
                                dy={10}
                            />
                            <YAxis
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: '#64748b', fontWeight: 500 }}
                                allowDecimals={false}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc', radius: 4 }} />
                            <Bar
                                dataKey="students"
                                name="New Students"
                                radius={[6, 6, 0, 0]}
                                barSize={40}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index === data.length - 1 ? '#14b8a6' : '#cbd5e1'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
