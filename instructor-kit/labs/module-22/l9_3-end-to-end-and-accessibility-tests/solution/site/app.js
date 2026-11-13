// Beach sites: a search that waits 300 ms after the last key, keeps its text in the address bar, and counts
const SITES = [
  { name: 'Driftwood Cove', town: 'Port Marisol' },
  { name: 'Pelican Point Beach', town: 'Port Marisol' },
  { name: 'North Jetty', town: 'Harbor Bend' },
  { name: 'Seal Rock Cove', town: 'Harbor Bend' },
  { name: 'Long Strand Beach', town: 'Saltmarsh' },
  { name: 'Otter Creek Mouth', town: 'Saltmarsh' },
]

const input = document.querySelector('#q')
const list = document.querySelector('#sites')
const count = document.querySelector('#count')
let timer

function show(query) {
  const q = query.trim().toLowerCase()
  const found = SITES.filter((site) => `${site.name} ${site.town}`.toLowerCase().includes(q))
  list.replaceChildren(
    ...found.map((site) => {
      const item = document.createElement('li')
      item.innerHTML = '<strong></strong> <span class="muted"></span>'
      item.querySelector('strong').textContent = site.name
      item.querySelector('span').textContent = site.town
      return item
    }),
  )
  count.textContent = `Found ${found.length} ${found.length === 1 ? 'site' : 'sites'}.`
  const url = new URL(window.location.href)
  if (q) url.searchParams.set('q', q)
  else url.searchParams.delete('q')
  window.history.replaceState(null, '', url)
}

input.value = new URL(window.location.href).searchParams.get('q') ?? ''
show(input.value)
input.addEventListener('input', () => {
  clearTimeout(timer)
  timer = setTimeout(() => show(input.value), 300)
})
document.querySelector('#clear').addEventListener('click', () => {
  input.value = ''
  show('')
  input.focus()
})
