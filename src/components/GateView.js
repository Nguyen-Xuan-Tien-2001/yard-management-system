import { User } from "lucide-react";

const GateView = () => (
  <div className="space-y-6 animate-in fade-in duration-500">
    <div className="flex justify-between items-end">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Gate Management</h1>
        <p className="text-slate-500">Register and verify vehicle arrivals/departures.</p>
      </div>
      <div className="flex space-x-3">
        <button className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold shadow-sm">Bulk Upload</button>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-100">Check-In Vehicle</button>
      </div>
    </div>

    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-slate-50 border-b border-slate-100">
          <tr>
            <th className="px-6 py-4 text-xs font-black uppercase text-slate-400 tracking-wider">Trailer/Vehicle</th>
            <th className="px-6 py-4 text-xs font-black uppercase text-slate-400 tracking-wider">Type</th>
            <th className="px-6 py-4 text-xs font-black uppercase text-slate-400 tracking-wider">Driver</th>
            <th className="px-6 py-4 text-xs font-black uppercase text-slate-400 tracking-wider">Arrival Time</th>
            <th className="px-6 py-4 text-xs font-black uppercase text-slate-400 tracking-wider">Appt. Status</th>
            <th className="px-6 py-4 text-xs font-black uppercase text-slate-400 tracking-wider text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {[
            { id: 'TRL-8820', type: 'Dry Van', carrier: 'Swift', driver: 'Alex Morgan', time: '09:45 AM', status: 'On-Time' },
            { id: 'TRL-1102', type: 'Reefer', carrier: 'FedEx', driver: 'Sarah Connor', time: '10:15 AM', status: 'Late' },
            { id: 'TRL-5529', type: 'Flatbed', carrier: 'J.B. Hunt', driver: 'Mike Wazowski', time: '10:30 AM', status: 'On-Time' },
            { id: 'TRL-3310', type: 'Container', carrier: 'Maersk', driver: 'Elena Fisher', time: '10:55 AM', status: 'No Appt' },
          ].map((row, idx) => (
            <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
              <td className="px-6 py-5">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 font-bold text-xs">{row.id.slice(-4)}</div>
                  <div>
                    <p className="font-bold text-sm text-slate-900">{row.id}</p>
                    <p className="text-xs text-slate-400 uppercase font-black">{row.carrier}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-5 text-sm font-medium text-slate-600">{row.type}</td>
              <td className="px-6 py-5">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px]"><User size={12}/></div>
                  <span className="text-sm font-bold">{row.driver}</span>
                </div>
              </td>
              <td className="px-6 py-5 text-sm font-bold text-slate-500">{row.time}</td>
              <td className="px-6 py-5">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  row.status === 'On-Time' ? 'bg-emerald-100 text-emerald-700' : 
                  row.status === 'Late' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                }`}>
                  {row.status}
                </span>
              </td>
              <td className="px-6 py-5 text-right">
                <button className="text-blue-600 hover:text-blue-800 font-bold text-sm">Review</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default GateView;