import {
  ArrowRightLeft,
  Bell,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Map as MapIcon,
  Plus,
  Search,
  Settings,
  Truck,
} from "lucide-react";
import { useState } from "react";
import DashboardView from "./components/Dashboard";
import GateView from "./components/GateView.js";
import TaskQueueView from "./components/TaskQueueView";
import YardMapView from "./components/YardMapView";
import SidebarItem from "./components/common/SideBarItem";

const App = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState(3);

  // Views
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardView />;
      case "yard-map":
        return <YardMapView />;
      case "gate":
        return <GateView />;
      case "tasks":
        return <TaskQueueView />;
      default:
        return <DashboardView />;
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
          <span className="text-xl font-black tracking-tight text-blue-900">
            YMS Pro
          </span>
        </div>

        <nav className="flex-1 space-y-1">
          <SidebarItem
            icon={LayoutDashboard}
            label="Dashboard"
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
          />
          <SidebarItem
            icon={MapIcon}
            label="Yard Map"
            active={activeTab === "yard-map"}
            onClick={() => setActiveTab("yard-map")}
          />
          <SidebarItem
            icon={ArrowRightLeft}
            label="Gate Check-in"
            active={activeTab === "gate"}
            onClick={() => setActiveTab("gate")}
          />
          <SidebarItem
            icon={ClipboardList}
            label="Task Queue"
            active={activeTab === "tasks"}
            onClick={() => setActiveTab("tasks")}
          />
        </nav>

        <div className="mt-auto pt-4 border-t border-slate-100">
          <SidebarItem
            icon={Settings}
            label="System Settings"
            active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
          />
          <div className="mt-4 p-3 bg-slate-50 rounded-xl flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              JD
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold truncate">John Doe</p>
              <p className="text-xs text-slate-500 truncate">Yard Supervisor</p>
            </div>
            <LogOut
              size={16}
              className="text-slate-400 cursor-pointer hover:text-red-500"
            />
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
        <div className="flex-1 overflow-y-auto p-8">{renderContent()}</div>
      </main>
    </div>
  );
};

export default App;
