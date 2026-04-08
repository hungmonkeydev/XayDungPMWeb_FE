// src/pages/admin/components/staff/StaffTable.jsx

function initials(name) {
  const parts = name.trim().split(" ");
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const AVATAR_COLORS = [
  "bg-rose-100    text-rose-700",
  "bg-blue-100    text-blue-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100   text-amber-700",
  "bg-violet-100  text-violet-700",
  "bg-teal-100    text-teal-700"
];

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

export default function StaffTable({ staffList, onEdit, onToggleStatus }) {
  if (staffList.length === 0) {
    return (
      <div className="bg-white border border-stone-100 rounded-2xl">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center mb-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-stone-400">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
            </svg>
          </div>
          <p className="text-sm font-medium text-stone-600">Không tìm thấy nhân viên</p>
          <p className="text-xs text-stone-400 mt-1">Thử thay đổi bộ lọc hoặc thêm nhân viên mới</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-stone-100 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px]">
          <thead className="bg-stone-50 border-b border-stone-100">
            <tr>
              {[
                { label: "Nhân viên", cls: "text-left" },
                { label: "Phân quyền", cls: "text-center" },
                { label: "Ngày tham gia", cls: "text-center hidden md:table-cell" },
                { label: "Trạng thái", cls: "text-center" },
                { label: "", cls: "w-[110px]" }
              ].map(h => (
                <th key={h.label} className={`text-[10px] font-semibold text-stone-400 uppercase tracking-wider px-4 py-3 ${h.cls}`}>
                  {h.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-stone-50">
            {staffList.map(s => {
              const colorCls = AVATAR_COLORS[s.id % AVATAR_COLORS.length];
              const isAdmin = s.type === "Admin";

              return (
                <tr key={s.id} className="group hover:bg-stone-50/50 transition-colors">
                  {/* Name + email */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      {/* Avatar with online dot */}
                      <div className="relative flex-shrink-0">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${colorCls}`}>{initials(s.name)}</div>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-stone-900 truncate">{s.name}</p>
                        <p className="text-[11px] text-stone-400 truncate mt-0.5">{s.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-4 py-3.5 text-center">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full ${
                        isAdmin ? "bg-rose-50 text-rose-700 border border-rose-200" : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {isAdmin && (
                        <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5">
                          <path d="M6 1L2 4v3c0 2.2 1.7 4.2 4 4.7 2.3-.5 4-2.5 4-4.7V4L6 1z" />
                        </svg>
                      )}
                      {s.type}
                    </span>
                  </td>

                  {/* Join date */}
                  <td className="px-4 py-3.5 text-center hidden md:table-cell">
                    <span className="text-[11px] text-stone-400">{fmtDate(s.createdAt)}</span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3.5 text-center">
                    <span
                      className={`inline-flex text-[10px] font-semibold px-2.5 py-1 rounded-full ${
                        s.isActive ? "bg-emerald-50 text-emerald-700" : "bg-stone-100 text-stone-500"
                      }`}
                    >
                      {s.isActive ? "Hoạt động" : "Vô hiệu hoá"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity justify-end">
                      <button
                        onClick={() => onEdit(s)}
                        className="text-[11px] font-semibold text-stone-600 hover:text-stone-900 px-2.5 py-1.5 rounded-lg hover:bg-stone-100 transition-colors"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => onToggleStatus(s)}
                        className={`text-[11px] font-semibold px-2.5 py-1.5 rounded-lg transition-colors ${
                          s.isActive ? "text-rose-500 hover:bg-rose-50" : "text-emerald-600 hover:bg-emerald-50"
                        }`}
                      >
                        {s.isActive ? "Khoá" : "Mở"}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-stone-100">
        <p className="text-xs text-stone-400">
          Hiển thị <span className="font-semibold text-stone-700">{staffList.length}</span> nhân viên
        </p>
        <div className="flex items-center gap-1">
          {[1, 2].map(p => (
            <button
              key={p}
              className={`w-7 h-7 text-xs rounded-lg transition-colors ${p === 1 ? "bg-stone-900 text-white font-semibold" : "text-stone-500 hover:bg-stone-100"}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
