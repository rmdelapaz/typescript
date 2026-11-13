import styles from './App.module.css'
import { PlotBoard } from './components/PlotBoard.tsx'
import { RequestForm } from './components/RequestForm.tsx'

// Given: the page around your components. You do not need to change this file.
export function App() {
  return (
    <>
      <header className={styles.header}>
        <p>Juniper Hill Community Garden</p>
      </header>
      <main className={styles.page}>
        <h1>Plot board</h1>
        <PlotBoard />
        <h2>Request a plot</h2>
        <RequestForm />
      </main>
      <footer className={styles.footer}>
        <p>Juniper Hill Community Garden · volunteer-run since the first seed swap</p>
      </footer>
    </>
  )
}
