import { useParams } from 'react-router'
import { getVolunteer } from '../api/client.ts'
import type { Volunteer } from '../api/types.ts'
import { Card } from '../components/Card.tsx'
import { LoadStatus } from '../components/LoadStatus.tsx'
import { useApi } from '../hooks/useApi.ts'
import { formatDate } from '../utils/format.ts'
import { skillLabels } from '../utils/skills.ts'
import styles from './VolunteerPage.module.css'

interface VolunteerDetailsProps {
  volunteer: Volunteer
}

function VolunteerDetails({ volunteer }: VolunteerDetailsProps) {
  const skills = volunteer.skills.map((skill) => skillLabels[skill])
  return (
    <Card title={volunteer.name}>
      <dl className={styles.details}>
        <dt>Email</dt>
        <dd>
          <a href={`mailto:${volunteer.email}`}>{volunteer.email}</a>
        </dd>
        <dt>Phone</dt>
        <dd>{volunteer.phone ?? 'Not given'}</dd>
        <dt>Role</dt>
        <dd>{volunteer.role === 'organizer' ? 'Organizer' : 'Volunteer'}</dd>
        <dt>Skills</dt>
        <dd>{skills.length > 0 ? skills.join(', ') : 'None listed yet'}</dd>
        <dt>Joined</dt>
        <dd>
          <time dateTime={volunteer.joinedOn}>{formatDate(volunteer.joinedOn)}</time>
        </dd>
        <dt>Hours at cleanups</dt>
        <dd>{volunteer.hoursLogged}</dd>
      </dl>
    </Card>
  )
}

// The child route volunteers/:volunteerId: it shows up in VolunteersPage's <Outlet />
export function VolunteerPage() {
  // Naming the parameter: a typo such as volunterId is now a type error
  const { volunteerId } = useParams<'volunteerId'>()
  if (volunteerId === undefined) {
    throw new Error('VolunteerPage needs a route with a :volunteerId parameter')
  }
  const volunteer = useApi(`/volunteers/${volunteerId}`, (signal) =>
    getVolunteer(volunteerId, signal),
  )

  if (volunteer.state.kind !== 'ready') {
    return <LoadStatus state={volunteer.state} what="this volunteer" onRetry={volunteer.reload} />
  }
  return <VolunteerDetails volunteer={volunteer.state.data} />
}
