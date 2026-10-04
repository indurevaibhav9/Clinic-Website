"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchEmployees, deleteEmployee } from "../redux/slice/userSlice";

export default function HomeComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.users);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = data?.slice(firstIndex, lastIndex) || [];
  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);

  const handleDelete = (id: string) => {
    dispatch(deleteEmployee(id));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
        <div className="flex items-center space-x-3 text-white text-lg font-medium">
          <svg className="animate-spin h-6 w-6 text-blue-500" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span>Loading directory...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto bg-slate-800 border border-slate-700 shadow-2xl rounded-xl p-6">
        <h1 className="text-3xl font-extrabold text-slate-50 text-center mb-6 tracking-wide">
          Employee Directory
        </h1>

        <div className="overflow-x-auto rounded-lg border border-slate-700">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-700/80 text-slate-200 uppercase text-xs tracking-wider">
              <tr>
                <th className="p-4 border-b border-slate-600 font-semibold">ID</th>
                <th className="p-4 border-b border-slate-600 font-semibold">Name</th>
                <th className="p-4 border-b border-slate-600 font-semibold">Role</th>
                <th className="p-4 border-b border-slate-600 font-semibold">Department</th>
                <th className="p-4 border-b border-slate-600 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700 text-sm">
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 text-xs font-mono text-slate-400 select-all">{item._id}</td>
                    <td className="p-4 font-medium text-slate-100">
                      {item.FirstName} {item.LastName}
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/60 text-blue-300 border border-blue-700/50">
                        {item.Role}
                      </span>
                    </td>
                    <td className="p-4 text-slate-300">{item.Department}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-600/80 hover:bg-red-600 text-white font-medium px-3 py-1.5 rounded-lg text-xs transition duration-150 ease-in-out shadow-sm active:scale-95"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-slate-400">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination & Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-700">
          <div className="flex items-center gap-1.5 flex-wrap">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Rows per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-slate-700 text-slate-200 text-xs border border-slate-600 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}