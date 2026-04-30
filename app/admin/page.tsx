import { connectDB } from '@/lib/db'
import Inquiry from '@/lib/models/Inquiry'
import DashboardContent from './components/DashboardContent'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  await connectDB()

  const [total, newCount, readCount, repliedCount, recentRaw] = await Promise.all([
    Inquiry.countDocuments(),
    Inquiry.countDocuments({ status: 'new' }),
    Inquiry.countDocuments({ status: 'read' }),
    Inquiry.countDocuments({ status: 'replied' }),
    Inquiry.find().sort({ createdAt: -1 }).limit(5).lean(),
  ])

  const recentInquiries = JSON.parse(JSON.stringify(recentRaw))

  return (
    <DashboardContent
      stats={{ total, new: newCount, read: readCount, replied: repliedCount }}
      recentInquiries={recentInquiries}
    />
  )
}
