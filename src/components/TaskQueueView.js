import { ArrowRightLeft, Clock, Plus } from "lucide-react";
import { TASKS } from "../utils/mockdata/data";

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

export default TaskQueueView;