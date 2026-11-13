import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { viewerId, volunteerQuery } from '../api/queries.ts'
import type { Volunteer } from '../api/types.ts'
import { useAuth } from '../auth/AuthContext.ts'
import { Card } from '../components/Card.tsx'
import { LoadStatus } from '../components/LoadStatus.tsx'
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
  const viewer = viewerId(useAuth().session)
  const volunteer = useQuery(volunteerQuery(volunteerId, viewer))

  if (!volunteer.isSuccess) {
    return <LoadStatus query={volunteer} what="this volunteer" />
  }
  return <VolunteerDetails volunteer={volunteer.data} />
}
