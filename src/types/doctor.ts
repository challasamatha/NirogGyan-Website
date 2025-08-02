export interface Doctor {
  id: string
  name: string
  specialization: string
  profileImage: string
  status: 'Available Today' | 'Fully Booked' | 'On Leave'
  bio: string
  schedule: string[]
}
