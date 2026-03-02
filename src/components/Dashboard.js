import { ClipboardList, Clock, LogOut, Navigation, Plus, Truck } from "lucide-react";
import { StatCard } from "./common/StatsCard";

const DashboardView = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <div>
      <h1 className="text-2xl font-black text-slate-900">Yard Overview</h1>
      <p className="text-slate-500">Real-time status of facility operations.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        label="Total Trailers"
        value="142"
        trend="+12%"
        icon={Truck}
        color="bg-blue-500"
      />
      <StatCard
        label="Dock Occupancy"
        value="82%"
        trend="+5.4%"
        icon={Navigation}
        color="bg-indigo-500"
      />
      <StatCard
        label="Avg. Turnaround"
        value="42m"
        trend="-8%"
        icon={Clock}
        color="bg-emerald-500"
      />
      <StatCard
        label="Pending Tasks"
        value="18"
        trend="+2"
        icon={ClipboardList}
        color="bg-amber-500"
      />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Recent Gate Activity</h2>
          <button className="text-blue-600 text-sm font-bold hover:underline">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {[
            {
              id: "TRL-9921",
              action: "Inbound",
              time: "14:20",
              status: "Checked In",
              driver: "M. Ross",
            },
            {
              id: "TRL-4412",
              action: "Outbound",
              time: "13:55",
              status: "Completed",
              driver: "S. Chen",
            },
            {
              id: "TRL-1029",
              action: "Inbound",
              time: "13:40",
              status: "Inspection",
              driver: "J. Doe",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-100"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-lg ${item.action === "Inbound" ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-600"}`}
                >
                  {item.action === "Inbound" ? (
                    <Plus size={18} />
                  ) : (
                    <LogOut size={18} />
                  )}
                </div>
                <div>
                  <p className="font-bold text-sm">{item.id}</p>
                  <p className="text-xs text-slate-400">
                    {item.driver} • {item.time}
                  </p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  item.status === "Completed"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-lg font-bold mb-6">Yard Distribution</h2>
        <div className="h-48 flex items-end justify-between px-4 pb-2 space-x-2">
          {[60, 80, 45, 90, 70, 55, 85].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-slate-50 rounded-t-lg relative group"
            >
              <div
                className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-t-lg transition-all duration-700 group-hover:bg-blue-600 cursor-pointer"
                style={{ height: `${h}%` }}
              ></div>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-400">
                Day {i + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default DashboardView;
