import React, { useState } from 'react';
import { useUIProps, useMutation } from '../../lib/mutation';
import { Trash2, Edit2, ArrowUpDown } from 'lucide-react';

export function TableTest() {
  const { isScrambled } = useMutation();
  const { id: tableId } = useUIProps("data-users-table", "Table Users", "Table Root");

  const [data, setData] = useState([
    { id: 101, name: 'Alice Cooper', role: 'Security Analyst', status: 'Active' },
    { id: 102, name: 'Bob Smith', role: 'Systems Engineer', status: 'Pending' },
    { id: 103, name: 'Charlie Davis', role: 'Data Scientist', status: 'Active' },
    { id: 104, name: 'Diana Prince', role: 'Architect', status: 'Inactive' },
    { id: 105, name: 'Evan Wright', role: 'DevOps', status: 'Active' },
  ]);

  const [sortCol, setSortCol] = useState('id');
  const [sortDir, setSortDir] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (col: string) => {
    if (sortCol === col) { setSortDir(sortDir * -1); }
    else { setSortCol(col); setSortDir(1); }
  };

  const sortedData = [...data].sort((a: any, b: any) => {
    if (a[sortCol] < b[sortCol]) return -1 * sortDir;
    if (a[sortCol] > b[sortCol]) return 1 * sortDir;
    return 0;
  });

  const handleDelete = (id: number) => {
    setData(data.filter(d => d.id !== id));
  };

  return (
    <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
      <div className="mb-8 border-b border-slate-100 pb-4">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">2. Complex Structural Elements</h2>
        <p className="text-slate-500 mt-2 text-sm">Tests structural scraping, contextual scoping bound to row scope, pagination, and multi-tier actions.</p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table id={tableId} data-testid={isScrambled ? undefined : "data-users-table"} className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
              <th className="px-6 py-4 cursor-pointer hover:bg-slate-100" onClick={() => handleSort('id')}>
                <div className="flex items-center gap-2">ID <ArrowUpDown size={14} className="opacity-50" /></div>
              </th>
              <th className="px-6 py-4 cursor-pointer hover:bg-slate-100" onClick={() => handleSort('name')}>
                <div className="flex items-center gap-2">Operator Name <ArrowUpDown size={14} className="opacity-50" /></div>
              </th>
              <th className="px-6 py-4">Clearance Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sortedData.map(row => {
              const dynRowId = isScrambled ? `qax-${btoa(row.name).substring(0,6)}` : `row-${row.id}`;
              const dynBtnId = isScrambled ? `del-${Math.floor(Math.random()*1000)}` : `btn-delete-${row.id}`;
              
              return (
                <tr key={row.id} id={dynRowId} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4 text-slate-500 font-mono text-xs">{row.id}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{row.name}</td>
                  <td className="px-6 py-4 text-slate-600">{row.role}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                      row.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                      row.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Edit">
                      <Edit2 size={16} />
                    </button>
                    <button 
                      id={dynBtnId}
                      data-testid={isScrambled ? undefined : `btn-del-${row.id}`}
                      onClick={() => handleDelete(row.id)} 
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              )
            })}
            {data.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">No active records remain.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-6 text-sm text-slate-500">
        <div>Showing {data.length} of {data.length} operators</div>
        <div className="flex items-center gap-1">
          <button className="px-3 py-1.5 border border-slate-200 rounded text-slate-400 cursor-not-allowed">Previous</button>
          <button className="px-3 py-1.5 bg-slate-900 text-white rounded">1</button>
          <button className="px-3 py-1.5 border border-slate-200 rounded text-slate-400 cursor-not-allowed">Next</button>
        </div>
      </div>
    </section>
  );
}
