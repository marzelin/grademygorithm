import '../styles.css'
import { render } from 'react-dom'
import { routes } from './routes'

const reactRoot = document.getElementById('react-root')

render(
  routes,
  reactRoot
)