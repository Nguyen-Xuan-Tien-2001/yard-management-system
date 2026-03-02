import { AlertCircle, ArrowRightLeft, ClipboardList, Filter, Plus, Truck } from "lucide-react";
import { useState } from "react";
import { DOCKS, INITIAL_SLOTS } from "../utils/mockdata/data";


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

export default YardMapView;