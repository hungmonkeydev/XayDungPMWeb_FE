// src/pages/admin/components/AdminSidebar.jsx

import AdminIcon from "./AdminIcons";
import { adminNavItems } from "../_mockData";
import { useNavigate, useLocation } from "react-router-dom";

export default function AdminSidebar({ collapsed }) {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <aside
      className={[
        "flex flex-col h-full bg-white border-r border-stone-100 flex-shrink-0",
        "transition-all duration-300 ease-in-out",
        collapsed ? "w-[60px]" : "w-[220px]"
      ].join(" ")}
    >
      {/* ── Logo ── */}
      <div className={["flex items-center gap-3 border-b border-stone-100", collapsed ? "justify-center px-0 py-5" : "px-4 py-5"].join(" ")}>
        <div className="w-8 h-8 bg-stone-900 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
        {!collapsed && (
          <div>
            <p className="text-sm font-semibold text-stone-900 leading-tight tracking-tight">Nội Thất Admin</p>
            <p className="text-[10px] text-stone-400 leading-tight mt-0.5">Quản lý hệ thống</p>
          </div>
        )}
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {adminNavItems.map(section => (
          <div key={section.section}>
            {!collapsed && <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest px-2 mb-1">{section.section}</p>}
            <div className="space-y-0.5">
              {section.items.map(item => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.path)}
                    className={[
                      "w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm",
                      "transition-all duration-150 group relative",
                      collapsed ? "justify-center" : "",
                      isActive ? "bg-stone-900 text-white" : "text-stone-500 hover:bg-stone-50 hover:text-stone-900"
                    ].join(" ")}
                  >
                    <AdminIcon name={item.icon} className="w-4 h-4 flex-shrink-0" />

                    {!collapsed && <span className="flex-1 text-left font-medium">{item.label}</span>}

                    {/* Tooltip (collapsed) */}
                    {collapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-stone-900 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                        {item.label}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* ── Footer / User ── */}
      <div className="p-2 border-t border-stone-100">
        <div
          className={["flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-stone-50 cursor-pointer transition-colors", collapsed ? "justify-center" : ""].join(" ")}
        >
          <div className="w-7 h-7 rounded-full bg-stone-900 text-white flex items-center justify-center text-[10px] font-semibold flex-shrink-0">AD</div>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-stone-900 truncate">Admin</p>
                <p className="text-[10px] text-stone-400 truncate">admin@noithat.vn</p>
              </div>
              <AdminIcon name="logout" className="w-4 h-4 text-stone-400 flex-shrink-0" />
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
