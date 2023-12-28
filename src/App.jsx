
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import './App.css'

function App() {
  const routesElement = useRoutes(routes);

  return (
    <>
      {routesElement}
    </>
  );
}

export default App
