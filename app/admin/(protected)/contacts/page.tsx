import { getContacts } from '@/lib/data'
import ContactsClient from './_components/ContactsClient'

export const dynamic = 'force-dynamic'

export default async function AdminContactsPage() {
  const contacts = await getContacts()
  return <ContactsClient initialContacts={contacts} />
}
