import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { ChangeEvent } from 'react'
import { NavLink, Outlet, useSearchParams } from 'react-router'
import { isSkill } from '../api/client.ts'
import { viewerId, volunteersQuery } from '../api/queries.ts'
import type { Skill, Volunteer } from '../api/types.ts'
import { useAuth } from '../auth/AuthContext.ts'
import { DataList } from '../components/DataList.tsx'
import { LoadStatus } from '../components/LoadStatus.tsx'
import { Pagination } from '../components/Pagination.tsx'
import { useDebouncedValue } from '../hooks/useDebouncedValue.ts'
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts'
import { readPageNumber, readParam, withParam } from '../utils/searchParams.ts'
import { skillLabels } from '../utils/skills.ts'
import formStyles from '../components/Form.module.css'
import styles from './VolunteersPage.module.css'

type SkillFilter = Skill | 'all'

// Organizers only (the route's organizersOnly guard). Search, skill and page live in the address.
export function VolunteersPage() {
  useDocumentTitle('Volunteers')
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const skill: SkillFilter = readParam(searchParams, 'skill', isSkill) ?? 'all'
  const pageNumber = readPageNumber(searchParams)

  const search = useDebouncedValue(query.trim(), 300)
  const params = new URLSearchParams({ page: String(pageNumber) })
  if (search !== '') params.set('q', search)
  if (skill !== 'all') params.set('skill', skill)
  const viewer = viewerId(useAuth().session)
  // While the next page or search loads, keep showing the last list (not "Loading…")
  const volunteers = useQuery({
    ...volunteersQuery(params.toString(), viewer),
    placeholderData: keepPreviousData,
  })

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
      <h1>Volunteers</h1>
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
          {volunteers.isSuccess ? (
            <>
              <p role="status">
                Found {volunteers.data.page.total}{' '}
                {volunteers.data.page.total === 1 ? 'person' : 'people'}.
              </p>
              <DataList
                items={volunteers.data.items}
                getKey={(volunteer) => volunteer.id}
                renderItem={renderVolunteer}
                emptyMessage="Nobody on the crew matches your search."
                layout="plain"
              />
              <Pagination page={volunteers.data.page} label="Pages of volunteers" />
            </>
          ) : (
            <LoadStatus query={volunteers} what="the crew" />
          )}
        </div>
      </div>
    </>
  )
}
