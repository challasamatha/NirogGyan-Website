import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { Doctor } from '../types/doctor'
import Layout from '../components/Layout'
import doctor1Img from '../assets/doctor1.jpg'
import doctor2Img from '../assets/doctor2.jpg'
import doctorDefaultImg from '../assets/doctor-default.jpg'

const DoctorProfile = () => {
  const { id } = useParams()
  const [doctor, setDoctor] = useState<Doctor | null>(null)

  useEffect(() => {
    fetch('/doctors.json')
      .then(res => res.json())
      .then((data: Doctor[]) => {
        const found = data.find((d) => d.id === id)
        setDoctor(found || null)
      })
  }, [id])

  if (!doctor) {
    return (
      <Layout>
        <p className="text-center text-gray-500">Loading doctor details...</p>
      </Layout>
    )
  }
  
 console.log('Profile image value from JSON:', doctor.profileImage);

const imageMap: Record<string, string> = {
  'doctor1.jpg': doctor1Img,
  'doctor2.jpg': doctor2Img,
};

const profileKey = doctor.profileImage?.replace(/^\//, '').toLowerCase() ?? '';
const profileImagePath = imageMap[profileKey] || doctorDefaultImg;



  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <img
          src={profileImagePath}
          alt={doctor.name}
          className="w-32 h-32 md:w-50 md:h-40 rounded-full object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{doctor.name}</h1>
          <p className="text-xl text-gray-600">{doctor.specialization}</p>
          <p className={`mt-2 font-semibold ${
            doctor.status === 'Available Today' ? 'text-green-600' :
            doctor.status === 'Fully Booked' ? 'text-red-600' : 'text-yellow-600'
          }`}>
            {doctor.status}
          </p>
          <p className="mt-4 text-gray-700">{doctor.bio}</p>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Available Slots:</h2>
            {doctor.schedule.length === 0 ? (
              <p className="text-gray-500 italic">No slots available.</p>
            ) : (
              <ul className="list-disc ml-5 text-gray-700">
                {doctor.schedule.map((slot, idx) => (
                  <li key={idx}>{new Date(slot).toLocaleString()}</li>
                ))}
              </ul>
            )}
          </div>

          <Link
            to={`/book/${doctor.id}`}
            className="inline-block mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default DoctorProfile


