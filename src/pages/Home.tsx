import { useEffect, useState } from 'react'
import type { Doctor } from '../types/doctor'
import DoctorCard from '../components/DoctorCard'
import SearchBar from '../components/SearchBar'

const Home = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/doctors.json')
      .then(res => res.json())
      .then(setDoctors)
  }, [])

  const filtered = doctors.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialization.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Available Doctors</h1>
      <SearchBar value={search} onChange={setSearch} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(doctor => <DoctorCard key={doctor.id} doctor={doctor} />)}
      </div>
    </div>
  )
}

export default Home
