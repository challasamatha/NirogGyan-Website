import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import  type { Doctor } from '../types/doctor'
import Layout from '../components/Layout'

const BookAppointment = () => {
  const { id } = useParams()
  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    datetime: ''
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    fetch('/doctors.json')
      .then(res => res.json())
      .then((data: Doctor[]) => {
        const found = data.find((d) => d.id === id)
        setDoctor(found || null)
      })
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simple validation
    if (!form.name || !form.email || !form.datetime) return

    // Simulate successful booking
    setSubmitted(true)
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        {submitted ? (
          <div className="bg-green-100 text-green-700 p-4 rounded shadow text-center">
            <p className="text-lg font-semibold">Appointment Confirmed!</p>
            <p>We'll contact you at <strong>{form.email}</strong>.</p>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4 text-center">Book Appointment</h1>

            {doctor && (
              <p className="text-center mb-4 text-gray-600">
                Booking with <strong>{doctor.name}</strong> ({doctor.specialization})
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
              <div>
                <label className="block mb-1 font-medium">Patient Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Preferred Date & Time</label>
                <input
                  type="datetime-local"
                  name="datetime"
                  value={form.datetime}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Confirm Appointment
              </button>
            </form>
          </>
        )}
      </div>
    </Layout>
  )
}

export default BookAppointment
