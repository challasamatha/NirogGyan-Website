import type { Doctor } from '../types/doctor'
import { Link } from 'react-router-dom'

// Import actual image files
import doctor1Img from '../assets/doctor1.jpg'
import doctor2Img from '../assets/doctor2.jpg'
import doctorDefaultImg from '../assets/doctor-default.jpg'
import bgPattern from '../assets/bg-pattern.jpg'

const imageMap: Record<string, string> = {
  'doctor1.jpg': doctor1Img,
  'doctor2.jpg': doctor2Img,
}

const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
  const profileKey = doctor.profileImage?.replace(/^\/+/, '').toLowerCase() ?? ''
  const profileImagePath = imageMap[profileKey] || doctorDefaultImg

  return (
    <div
      className="relative border p-4 rounded-md shadow hover:shadow-lg transition overflow-hidden"
      style={{
        backgroundImage: `url(${bgPattern})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Semi-transparent overlay for readability */}
      <div className="absolute inset-1 bg-white/80 backdrop-blur-sm z-10 rounded-md" />

      <div className="relative w-[400px] h-[400px] pt-10 z-20 flex flex-col items-center text-center">
        <img
          src={profileImagePath}
          alt={doctor.name}
          className="w-28 h-28 rounded-full mb-4 border-4 border-white shadow-md"
        />
        <h2 className="text-xl font-bold">{doctor.name}</h2>
        <p className="text-gray-600">{doctor.specialization}</p>
        <p
          className={`mt-2 font-semibold ${
            doctor.status === 'Available Today'
              ? 'text-green-600'
              : doctor.status === 'Fully Booked'
              ? 'text-red-600'
              : 'text-yellow-600'
          }`}
        >
          {doctor.status}
        </p>
        <Link to={`/doctor/${doctor.id}`} className="block mt-4 text-blue-500 underline">
          View Profile
        </Link>
      </div>
    </div>
  )
}

export default DoctorCard














