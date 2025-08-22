'use client'

import { useState } from 'react'
import { PlusCircle } from 'lucide-react'

interface HealthLog {
  date: string
  weight: string
  mood: string
  notes: string
}

export default function HealthTracker() {
  const [logs, setLogs] = useState<HealthLog[]>([])
  const [form, setForm] = useState<HealthLog>({
    date: new Date().toISOString().split('T')[0],
    weight: '',
    mood: '',
    notes: ''
  })

  const addLog = () => {
    if (!form.weight && !form.mood && !form.notes) return
    setLogs([...logs, form])
    setForm({ ...form, weight: '', mood: '', notes: '' })
  }

  return (
    <div className="flex-1 p-6 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 overflow-y-auto">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">记录今日健康</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">日期</label>
              <input
                type="date"
                value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">体重 (kg)</label>
              <input
                type="number"
                value={form.weight}
                onChange={e => setForm({ ...form, weight: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">心情 (1-10)</label>
              <input
                type="number"
                min={1}
                max={10}
                value={form.mood}
                onChange={e => setForm({ ...form, mood: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">备注</label>
              <textarea
                value={form.notes}
                onChange={e => setForm({ ...form, notes: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={3}
              />
            </div>
          </div>
          <button
            onClick={addLog}
            className="mt-4 inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            添加记录
          </button>
        </div>

        {logs.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">历史记录</h3>
            <ul className="space-y-3">
              {logs.map((log, index) => (
                <li key={index} className="p-4 border border-gray-100 rounded-lg">
                  <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
                    <span>{log.date}</span>
                    {log.weight && <span>{log.weight} kg</span>}
                    {log.mood && <span>心情 {log.mood}/10</span>}
                  </div>
                  {log.notes && <p className="mt-1 text-gray-700">{log.notes}</p>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

