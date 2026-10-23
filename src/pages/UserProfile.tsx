import { useState } from 'react'
import { Pencil, Settings } from 'lucide-react'
import { Navbar } from '../components/dashboard/Navbar'
import { Sidebar } from '../components/dashboard/Sidebar'
import { ProfileForm, type ProfileValues } from '../components/profile/ProfileForm'
import { getProfileUser, saveStoredUser } from '../lib/auth'

const initialProfile = (): ProfileValues => {
  const user = getProfileUser()
  return {
  company: 'Creative Code Inc.',
  username: `${user.firstName} ${user.lastName}`.trim(),
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  address: 'Mohali-White City Sector 114',
  city: 'Chandigarh',
  country: 'India',
  postalCode: '',
  about: "Chandigarh is a beautiful and well-planned city known for its clean streets, green spaces, modern architecture.",
  }
}

export default function UserProfile() {
  const [draft, setDraft] = useState(initialProfile)

  return <main className="dashboard-shell profile-reference">
    <Sidebar />
      <button className="settings" aria-label="Profile settings"><Settings /></button>
      <button className="edit-button" aria-label="Edit profile"><Pencil /></button>
    </section>
  </main>
}
