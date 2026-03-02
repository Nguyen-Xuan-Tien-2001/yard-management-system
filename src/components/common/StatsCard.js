export const StatCard = ({ label, value, trend, icon: Icon, color }) => (
  <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-500 text-sm font-medium">{label}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
    </div>
    <div className="mt-4 flex items-center text-xs">
      <span className="text-emerald-500 font-bold">{trend}</span>
      <span className="text-slate-400 ml-1">vs last 24h</span>
    </div>
  </div>
);