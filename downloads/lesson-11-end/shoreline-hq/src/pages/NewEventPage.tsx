import { NewEventForm } from '../components/NewEventForm.tsx'

export function NewEventPage() {
  return (
    <>
      <h1>Plan a cleanup</h1>
      <p className="lead">
        Fill in the basics. Save it as a draft to finish later, or publish it so volunteers can
        sign up.
      </p>
      <NewEventForm />
    </>
  )
}
