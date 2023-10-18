import React from 'react';
import './App.scss';
import Layout from './components/Layout';
import { useAppDispatch } from './redux/hooks';
import { fetchOperators } from './redux/features/operator-slice';

function App() {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(fetchOperators());
  }, [dispatch]);
  return (
    <div className="App">
      <Layout />
    </div>
  );
}

export default App;
