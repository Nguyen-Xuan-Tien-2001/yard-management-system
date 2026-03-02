import {
  AlertCircle,
  ArrowRightLeft,
  Bell,
  ClipboardList,
  Clock,
  Filter,
  LayoutDashboard,
  LogOut,
  Map as MapIcon,
  Navigation,
  Plus,
  Search,
  Settings,
  Truck,
  User
} from 'lucide-react';
import { useState } from 'react';

// --- Mock Data ---
const INITIAL_SLOTS = Array.from({ length: 24 }, (_, i) => ({
  id: `S-${101 + i}`,
  status: Math.random() > 0.4 ? 'occupied' : 'empty',
  trailerId: Math.random() > 0.4 ? `TRL-${Math.floor(1000 + Math.random() * 9000)}` : null,
  type: Math.random() > 0.7 ? 'Reefer' : 'Dry Van',
  aging: Math.floor(Math.random() * 48), // hours
}));

const DOCKS = Array.from({ length: 8 }, (_, i) => ({
  id: `DOCK-${i + 1}`,
  status: i % 3 === 0 ? 'active' : i % 5 === 0 ? 'maintenance' : 'available',
  trailerId: i % 3 === 0 ? `TRL-${2000 + i}` : null,
}));

const TASKS = [
  { id: 'TSK-001', from: 'S-105', to: 'DOCK-2', priority: 'High', status: 'Pending', time: '10m ago' },
  { id: 'TSK-002', from: 'S-112', to: 'DOCK-4', priority: 'Medium', status: 'In-Progress', time: '5m ago' },
  { id: 'TSK-003', from: 'Gate', to: 'S-120', priority: 'Low', status: 'Pending', time: '2m ago' },
];

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      active 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </button>
);

const StatCard = ({ label, value, trend, icon: Icon, color }) => (
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

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(3);

  // Views
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardView />;
      case 'yard-map': return <YardMapView />;
      case 'gate': return <GateView />;
      case 'tasks': return <TaskQueueView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col p-4">
        <div className="flex items-center space-x-2 px-2 mb-8">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Truck className="text-white" size={24} />
          </div>
          <span className="text-xl font-black tracking-tight text-blue-900">YMS Pro</span>
        </div>

        <nav className="flex-1 space-y-1">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <SidebarItem icon={MapIcon} label="Yard Map" active={activeTab === 'yard-map'} onClick={() => setActiveTab('yard-map')} />
          <SidebarItem icon={ArrowRightLeft} label="Gate Check-in" active={activeTab === 'gate'} onClick={() => setActiveTab('gate')} />
          <SidebarItem icon={ClipboardList} label="Task Queue" active={activeTab === 'tasks'} onClick={() => setActiveTab('tasks')} />
        </nav>

        <div className="mt-auto pt-4 border-t border-slate-100">
          <SidebarItem icon={Settings} label="System Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
          <div className="mt-4 p-3 bg-slate-50 rounded-xl flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">JD</div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold truncate">John Doe</p>
              <p className="text-xs text-slate-500 truncate">Yard Supervisor</p>
            </div>
            <LogOut size={16} className="text-slate-400 cursor-pointer hover:text-red-500" />
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-bottom border-slate-200 flex items-center justify-between px-8 z-10">
          <div className="flex items-center bg-slate-100 px-3 py-1.5 rounded-lg w-96">
            <Search size={18} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Search trailers, drivers or slots..." 
              className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative cursor-pointer p-2 hover:bg-slate-50 rounded-full transition-colors">
              <Bell size={22} className="text-slate-600" />
              {notifications > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white">
                  {notifications}
                </span>
              )}
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center transition-colors">
              <Plus size={18} className="mr-2" />
              New Entry
            </button>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

// --- View: Dashboard ---
const DashboardView = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <div>
      <h1 className="text-2xl font-black text-slate-900">Yard Overview</h1>
      <p className="text-slate-500">Real-time status of facility operations.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard label="Total Trailers" value="142" trend="+12%" icon={Truck} color="bg-blue-500" />
      <StatCard label="Dock Occupancy" value="82%" trend="+5.4%" icon={Navigation} color="bg-indigo-500" />
      <StatCard label="Avg. Turnaround" value="42m" trend="-8%" icon={Clock} color="bg-emerald-500" />
      <StatCard label="Pending Tasks" value="18" trend="+2" icon={ClipboardList} color="bg-amber-500" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Recent Gate Activity</h2>
          <button className="text-blue-600 text-sm font-bold hover:underline">View All</button>
        </div>
        <div className="space-y-4">
          {[
            { id: 'TRL-9921', action: 'Inbound', time: '14:20', status: 'Checked In', driver: 'M. Ross' },
            { id: 'TRL-4412', action: 'Outbound', time: '13:55', status: 'Completed', driver: 'S. Chen' },
            { id: 'TRL-1029', action: 'Inbound', time: '13:40', status: 'Inspection', driver: 'J. Doe' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-100">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${item.action === 'Inbound' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                  {item.action === 'Inbound' ? <Plus size={18} /> : <LogOut size={18} />}
                </div>
                <div>
                  <p className="font-bold text-sm">{item.id}</p>
                  <p className="text-xs text-slate-400">{item.driver} • {item.time}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                item.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
              }`}>
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
            <div key={i} className="flex-1 bg-slate-50 rounded-t-lg relative group">
              <div 
                className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-t-lg transition-all duration-700 group-hover:bg-blue-600 cursor-pointer" 
                style={{ height: `${h}%` }}
              ></div>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-400">Day {i+1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// --- View: Yard Map ---
const YardMapView = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);

  return (
    <div className="flex h-full space-x-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Yard Visualizer</h1>
            <p className="text-slate-500">Live graphical map of parking slots and docks.</p>
          </div>
          <div className="flex space-x-2">
            <div className="flex items-center space-x-4 bg-white px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium">
              <div className="flex items-center space-x-1.5"><div className="w-3 h-3 rounded-full bg-blue-500"></div><span>Occupied</span></div>
              <div className="flex items-center space-x-1.5"><div className="w-3 h-3 rounded-full bg-slate-200"></div><span>Empty</span></div>
              <div className="flex items-center space-x-1.5"><div className="w-3 h-3 rounded-full bg-amber-400"></div><span>Late</span></div>
            </div>
            <button className="p-2 bg-white border border-slate-200 rounded-lg"><Filter size={20}/></button>
          </div>
        </div>

        {/* Map Grid */}
        <div className="bg-slate-200/50 p-8 rounded-3xl border-4 border-dashed border-slate-300 grid grid-cols-6 gap-4 min-h-[600px]">
          {/* Top Docks */}
          <div className="col-span-6 flex justify-around mb-8">
            {DOCKS.map(dock => (
              <div 
                key={dock.id}
                className={`w-20 h-28 border-x-2 border-b-2 rounded-b-xl flex flex-col items-center justify-center space-y-2 transition-all cursor-pointer shadow-sm ${
                  dock.status === 'active' ? 'bg-blue-600 border-blue-700 text-white' : 
                  dock.status === 'maintenance' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-white border-slate-200 text-slate-400'
                }`}
              >
                <span className="text-[10px] font-black uppercase">{dock.id}</span>
                {dock.status === 'active' ? <Truck size={24} /> : dock.status === 'maintenance' ? <AlertCircle size={24} /> : <Plus size={24} />}
              </div>
            ))}
          </div>

          {/* Parking Slots */}
          {INITIAL_SLOTS.map(slot => (
            <div 
              key={slot.id}
              onClick={() => setSelectedSlot(slot)}
              className={`h-32 rounded-lg border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer relative group ${
                selectedSlot?.id === slot.id ? 'ring-4 ring-blue-500 ring-offset-2 border-transparent' : ''
              } ${
                slot.status === 'occupied' 
                  ? 'bg-white border-blue-200 shadow-sm' 
                  : 'bg-slate-100/50 border-slate-300 hover:bg-slate-100 hover:border-slate-400'
              }`}
            >
              <span className="text-[10px] font-bold text-slate-400 absolute top-2 left-2">{slot.id}</span>
              {slot.status === 'occupied' ? (
                <>
                  <Truck size={32} className="text-blue-600" />
                  <span className="text-xs font-black mt-1">{slot.trailerId}</span>
                  {slot.aging > 24 && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>}
                </>
              ) : (
                <Plus size={20} className="text-slate-300 group-hover:text-slate-400" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Detail Sidebar (Mock) */}
      <div className={`w-80 transition-all duration-300 transform ${selectedSlot ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}>
        {selectedSlot && (
          <div className="bg-white h-full rounded-2xl shadow-xl border border-slate-100 p-6 space-y-6">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-black">Slot {selectedSlot.id}</h2>
              <button onClick={() => setSelectedSlot(null)} className="p-1 hover:bg-slate-100 rounded-full"><AlertCircle size={20}/></button>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl flex items-center space-x-4">
              <div className="p-3 bg-blue-600 rounded-lg text-white"><Truck size={24} /></div>
              <div>
                <p className="text-xs text-blue-600 font-bold uppercase tracking-tight">Trailer ID</p>
                <p className="text-lg font-black">{selectedSlot.trailerId || 'N/A'}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-sm py-2 border-b border-slate-50">
                <span className="text-slate-500">Status</span>
                <span className="font-bold capitalize">{selectedSlot.status}</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-slate-50">
                <span className="text-slate-500">Trailer Type</span>
                <span className="font-bold">{selectedSlot.type}</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-slate-50">
                <span className="text-slate-500">Aging</span>
                <span className={`font-bold ${selectedSlot.aging > 24 ? 'text-amber-600' : ''}`}>{selectedSlot.aging} hours</span>
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold flex items-center justify-center shadow-lg shadow-blue-100">
                <ArrowRightLeft size={18} className="mr-2" />
                Move Trailer
              </button>
              <button className="w-full bg-slate-100 text-slate-700 py-3 rounded-xl font-bold flex items-center justify-center hover:bg-slate-200 transition-colors">
                <ClipboardList size={18} className="mr-2" />
                View Inspection
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- View: Gate Management ---
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

// --- View: Task Queue ---
const TaskQueueView = () => (
  <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Task Dispatcher</h1>
        <p className="text-slate-500">Monitor and assign trailer movements to shunters.</p>
      </div>
      <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl border border-emerald-100">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
        <span className="text-sm font-bold">4 Active Shunters Online</span>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {['To-Do', 'In Progress', 'Done'].map((col) => (
        <div key={col} className="bg-slate-100/50 p-4 rounded-2xl min-h-[500px]">
          <div className="flex justify-between items-center mb-4 px-2">
            <h3 className="font-black text-slate-500 uppercase tracking-widest text-xs">{col}</h3>
            <span className="bg-white px-2 py-0.5 rounded-lg text-xs font-bold shadow-sm">
              {TASKS.filter(t => (col === 'To-Do' ? t.status === 'Pending' : col === 'In Progress' ? t.status === 'In-Progress' : false)).length}
            </span>
          </div>

          <div className="space-y-4">
            {TASKS.map((task) => {
              const isMatch = (col === 'To-Do' && task.status === 'Pending') || (col === 'In Progress' && task.status === 'In-Progress');
              if (!isMatch) return null;

              return (
                <div key={task.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 cursor-move hover:border-blue-300 transition-colors group">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-black px-2 py-1 bg-slate-100 rounded text-slate-500 tracking-tighter">{task.id}</span>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${task.priority === 'High' ? 'text-red-500' : 'text-slate-400'}`}>
                      {task.priority} Priority
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-center flex-1">
                      <p className="text-xs text-slate-400 font-bold uppercase mb-1">From</p>
                      <p className="font-black text-lg text-blue-600">{task.from}</p>
                    </div>
                    <ArrowRightLeft size={16} className="text-slate-300 mx-2" />
                    <div className="text-center flex-1">
                      <p className="text-xs text-slate-400 font-bold uppercase mb-1">To</p>
                      <p className="font-black text-lg text-emerald-600">{task.to}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-50 flex justify-between items-center">
                    <div className="flex items-center text-[10px] text-slate-400 font-bold">
                      <Clock size={12} className="mr-1" />
                      {task.time}
                    </div>
                    <div className="flex -space-x-2 group-hover:opacity-100 opacity-50 transition-opacity">
                      <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-[8px] font-bold">S1</div>
                    </div>
                  </div>
                </div>
              );
            })}

            {col === 'To-Do' && (
              <button className="w-full border-2 border-dashed border-slate-300 rounded-xl py-4 flex flex-col items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-300 hover:bg-white transition-all">
                <Plus size={24} />
                <span className="text-xs font-bold mt-1 uppercase">Create Task</span>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default App;