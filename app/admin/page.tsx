import { connectDB } from '@/lib/db'
import Inquiry from '@/lib/models/Inquiry'
import InquiryList from './components/InquiryList'

export const dynamic = 'force-dynamic'

async function getInquiries() {
  await connectDB()
  const data = await Inquiry.find().sort({ createdAt: -1 }).lean()
  return JSON.parse(JSON.stringify(data))
}

export default async function AdminPage() {
  const inquiries = await getInquiries()

  const newCount = inquiries.filter((i: { status: string }) => i.status === 'new').length

  return (
    <div className="p-8 md:p-12">
      {/* Page header */}
      <div className="mb-10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-headline font-extrabold text-3xl text-primary mb-1">
              Inquiries
            </h1>
            <p className="text-on-surface/40 text-sm font-headline">
              {inquiries.length} total &mdash;{' '}
              {newCount > 0 ? (
                <span className="text-amber-600 font-semibold">{newCount} new</span>
              ) : (
                'all caught up'
              )}
            </p>
          </div>

          {/* Stats chips */}
          <div className="flex gap-3 flex-wrap">
            {[
              { label: 'Total', value: inquiries.length, color: 'bg-primary/10 text-primary' },
              { label: 'New', value: newCount, color: 'bg-amber-100 text-amber-700' },
              {
                label: 'Replied',
                value: inquiries.filter((i: { status: string }) => i.status === 'replied').length,
                color: 'bg-green-100 text-green-700',
              },
            ].map((s) => (
              <div key={s.label} className={`px-4 py-2 rounded-xl font-headline font-bold text-sm ${s.color}`}>
                {s.value} {s.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <InquiryList initialInquiries={inquiries} />
    </div>
  )
}
