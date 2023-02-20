// React
import React from 'react';

// Router
import { useRoutes } from 'react-router-dom';

// MobX
import { observer } from 'mobx-react-lite';

// Routes
import routes from 'routes';

function App() {
  const element = useRoutes(routes);

  return element;
}

export default observer(App);
