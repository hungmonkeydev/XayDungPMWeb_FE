import { useState, useEffect } from 'react'

const API_URL = '/api/users'

const GROUP_INFO = {
  name: 'Nhóm Xây Dựng PM Web',
  members: [
    { name: 'Ngô Thanh Bảo', role: 'Nhóm trưởng' },
    { name: 'Tiêu Hải Đăng', role: 'Thành viên' },
    { name: 'Trần Gia Huy', role: 'Thành viên' },
    { name: 'Phạm Đức Duy', role: 'Thành viên' },
    { name: 'Nguyễn Bùi Phúc Hưng', role: 'Thành viên' },
  ],
}

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newName, setNewName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitMsg, setSubmitMsg] = useState(null)
  const [showMembers, setShowMembers] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(API_URL)
      if (!res.ok) throw new Error(`Lỗi ${res.status}`)
      const data = await res.json()
      setUsers(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newName.trim()) return
    setSubmitting(true)
    setSubmitMsg(null)
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName.trim() }),
      })
      if (!res.ok) throw new Error(`Lỗi ${res.status}`)
      setSubmitMsg({ type: 'success', text: `Đã thêm user "${newName.trim()}" thành công!` })
      setNewName('')
      fetchUsers()
    } catch (err) {
      setSubmitMsg({ type: 'error', text: `Thêm thất bại: ${err.message}` })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm(`Bạn có chắc muốn xóa user #${id} không?`)) return
    setDeletingId(id)
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error(`Lỗi ${res.status}`)
      setUsers((prev) => prev.filter((u) => u.id !== id))
    } catch (err) {
      alert(`Xóa thất bại: ${err.message}`)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-['Inter']">
      {/* ── HEADER ── */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Group title */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow">
                <span className="text-xl">👥</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 leading-tight">
                  {GROUP_INFO.name}
                </h1>
                <p className="text-gray-500 text-sm mt-0.5">Quản lý danh sách người dùng</p>
              </div>
            </div>

            {/* Toggle members */}
            <button
              onClick={() => setShowMembers((v) => !v)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-all text-sm font-medium text-gray-600 hover:text-gray-800 cursor-pointer"
            >
              <span>🎓</span>
              <span>Thành viên nhóm</span>
              <span
                className={`transition-transform duration-300 inline-block ${showMembers ? 'rotate-180' : ''}`}
              >
                ▾
              </span>
            </button>
          </div>

          {/* Members panel */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${showMembers ? 'max-h-60 opacity-100 mt-4' : 'max-h-0 opacity-0'
              }`}
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {GROUP_INFO.members.map((m, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1 p-3 rounded-xl bg-gray-50 border border-gray-200 hover:border-blue-400 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-lg font-bold text-white shadow">
                    {m.name.charAt(0)}
                  </div>
                  <span className="text-sm font-semibold text-gray-700 leading-tight text-center">
                    {m.name}
                  </span>
                  <span className="text-xs text-blue-500">{m.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        {/* Add user form */}
        <section className="rounded-xl border border-gray-200 bg-white shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <span className="text-xl">➕</span> Thêm người dùng mới
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              id="new-user-name"
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Nhập tên người dùng..."
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-gray-800 placeholder:text-gray-400 bg-white transition-all"
              disabled={submitting}
            />
            <button
              type="submit"
              disabled={submitting || !newName.trim()}
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-white shadow transition-all active:scale-95 cursor-pointer"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Đang thêm...
                </span>
              ) : (
                '+ Thêm'
              )}
            </button>
          </form>

          {submitMsg && (
            <div
              className={`mt-3 px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2 ${submitMsg.type === 'success'
                  ? 'bg-green-50 border border-green-200 text-green-700'
                  : 'bg-red-50 border border-red-200 text-red-600'
                }`}
            >
              <span>{submitMsg.type === 'success' ? '✅' : '❌'}</span>
              {submitMsg.text}
            </div>
          )}
        </section>

        {/* Users table */}
        <section className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <span className="text-xl">📋</span> Danh sách người dùng
              {!loading && !error && (
                <span className="ml-1 px-2 py-0.5 rounded-full bg-blue-100 border border-blue-200 text-blue-600 text-xs font-bold">
                  {users.length}
                </span>
              )}
            </h2>
            <button
              onClick={fetchUsers}
              title="Làm mới"
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-700 cursor-pointer"
            >
              <svg
                className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582M20 20v-5h-.582M4.582 9A8 8 0 1119.418 15" />
              </svg>
            </button>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-gray-400">
              <svg className="animate-spin h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              <span>Đang tải dữ liệu...</span>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-red-500">
              <span className="text-4xl">⚠️</span>
              <p className="font-medium">{error}</p>
              <button
                onClick={fetchUsers}
                className="px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-sm transition-colors cursor-pointer"
              >
                Thử lại
              </button>
            </div>
          ) : users.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-2 text-gray-400">
              <span className="text-4xl">👤</span>
              <p>Chưa có người dùng nào.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 w-16">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Tên người dùng
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {users.map((user, idx) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 transition-colors group border-b border-gray-50"
                    >
                      <td className="px-6 py-4 text-gray-400 text-xs">{idx + 1}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 font-mono text-xs font-semibold">
                          #{user.id}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold text-white shrink-0">
                            {user.name?.charAt(0)?.toUpperCase() ?? '?'}
                          </div>
                          <span className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                            {user.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(user.id)}
                          disabled={deletingId === user.id}
                          title={`Xóa user #${user.id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/10 hover:bg-red-500/25 border border-red-500/20 hover:border-red-500/50 text-red-400 hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 cursor-pointer"
                        >
                          {deletingId === user.id ? (
                            <svg className="animate-spin h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                          ) : (
                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                              <path d="M10 11v6M14 11v6" />
                              <path d="M9 6V4h6v2" />
                            </svg>
                          )}
                          {deletingId === user.id ? 'Đang xóa...' : 'Xóa'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      <footer className="text-center text-gray-400 text-xs py-6 border-t border-gray-200 mt-4">
        © 2026 {GROUP_INFO.name} — Tất cả quyền được bảo lưu.
      </footer>
    </div>
  )
}
