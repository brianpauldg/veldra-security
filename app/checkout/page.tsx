import { redirect } from 'next/navigation'

// Consolidated: checkout + booking are now one page at /book
export default function CheckoutRedirect() {
  redirect('/book')
}
