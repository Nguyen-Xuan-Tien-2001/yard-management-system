// --- Mock Data ---
export const INITIAL_SLOTS = Array.from({ length: 24 }, (_, i) => ({
  id: `S-${101 + i}`,
  status: Math.random() > 0.4 ? 'occupied' : 'empty',
  trailerId: Math.random() > 0.4 ? `TRL-${Math.floor(1000 + Math.random() * 9000)}` : null,
  type: Math.random() > 0.7 ? 'Reefer' : 'Dry Van',
  aging: Math.floor(Math.random() * 48), // hours
}));

export const DOCKS = Array.from({ length: 8 }, (_, i) => ({
  id: `DOCK-${i + 1}`,
  status: i % 3 === 0 ? 'active' : i % 5 === 0 ? 'maintenance' : 'available',
  trailerId: i % 3 === 0 ? `TRL-${2000 + i}` : null,
}));

export const TASKS = [
  { id: 'TSK-001', from: 'S-105', to: 'DOCK-2', priority: 'High', status: 'Pending', time: '10m ago' },
  { id: 'TSK-002', from: 'S-112', to: 'DOCK-4', priority: 'Medium', status: 'In-Progress', time: '5m ago' },
  { id: 'TSK-003', from: 'Gate', to: 'S-120', priority: 'Low', status: 'Pending', time: '2m ago' },
];
