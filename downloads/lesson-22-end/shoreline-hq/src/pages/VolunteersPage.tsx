import type { ChangeEvent } from 'react'
import { Link, NavLink, Outlet, useSearchParams } from 'react-router'
import { getVolunteers, isSkill } from '../api/client.ts'
import type { Skill, Volunteer } from '../api/types.ts'
import { useAuth } from '../auth/AuthContext.ts'
import { DataList } from '../components/DataList.tsx'
import { LoadStatus } from '../components/LoadStatus.tsx'
import { Pagination } from '../components/Pagination.tsx'
import { useApi } from '../hooks/useApi.ts'
import { useDebouncedValue } from '../hooks/useDebouncedValue.ts'
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts'
import { readPageNumber, readParam, withParam } from '../utils/searchParams.ts'
import { skillLabels } from '../utils/skills.ts'
import formStyles from '../components/Form.module.css'
import styles from './VolunteersPage.module.css'

type SkillFilter = Skill | 'all'

// The crew list: search, skill and page all live in the address (?q=&skill=&page=)
function CrewList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const skill: SkillFilter = readParam(searchParams, 'skill', isSkill) ?? 'all'
  const pageNumber = readPageNumber(searchParams)

  const search = useDebouncedValue(query.trim(), 300)
  const params = new URLSearchParams({ page: String(pageNumber) })
  if (search !== '') params.set('q', search)
  if (skill !== 'all') params.set('skill', skill)
  const volunteersQuery = params.toString()
  const volunteers = useApi(`/volunteers?${volunteersQuery}`, (signal) =>
    getVolunteers(volunteersQuery, signal),
  )

  // A new search or skill starts again on page 1 (typing works as on the events page)
  function changeFilter(name: 'q' | 'skill', value: string) {
    const typing = name === 'q'
    setSearchParams(
      (current) => {
        const next = withParam(current, name, value)
        next.delete('page')
        return next
      },
      { replace: typing, flushSync: typing },
    )
  }

  function handleSkillChange(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value
    changeFilter('skill', isSkill(value) ? value : '')
  }

  // Each name links to the nested route; the ?search goes along, so the list stays as it is
  function renderVolunteer(volunteer: Volunteer) {
    return (
      <NavLink to={{ pathname: volunteer.id, search: searchParams.toString() }}>
        {volunteer.name}
      </NavLink>
    )
  }

  return (
    <>
      <search className={styles.filters}>
        <div className={formStyles.field}>
          <label htmlFor="volunteer-search">Search by name or email</label>
          <input
            id="volunteer-search"
            type="search"
            value={query}
            onChange={(event) => changeFilter('q', event.target.value)}
          />
        </div>
        <div className={formStyles.field}>
          <label htmlFor="volunteer-skill">Skill</label>
          <select id="volunteer-skill" value={skill} onChange={handleSkillChange}>
            <option value="all">Any skill</option>
            {Object.entries(skillLabels).map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </search>
      <div className={styles.layout}>
        {/* The nested route renders here: a hint, or one volunteer's details */}
        <Outlet />
        <div>
          {volunteers.state.kind === 'ready' ? (
            <>
              <p role="status">
                Found {volunteers.state.data.page.total}{' '}
                {volunteers.state.data.page.total === 1 ? 'person' : 'people'}.
              </p>
              <DataList
                items={volunteers.state.data.items}
                getKey={(volunteer) => volunteer.id}
                renderItem={renderVolunteer}
                emptyMessage="Nobody on the crew matches your search."
                layout="plain"
              />
              <Pagination page={volunteers.state.data.page} label="Pages of volunteers" />
            </>
          ) : (
            <LoadStatus state={volunteers.state} what="the crew" onRetry={volunteers.reload} />
          )}
        </div>
      </div>
    </>
  )
}

export function VolunteersPage() {
  const { isOrganizer } = useAuth()
  useDocumentTitle('Volunteers')

  return (
    <>
      <h1>Volunteers</h1>
      {isOrganizer ? (
        <CrewList />
      ) : (
        <p>
          The crew list has everyone's contact details, so only organizers can see it.{' '}
          <Link to="/sign-in">Sign in</Link> with an organizer account.
        </p>
      )}
    </>
  )
}
