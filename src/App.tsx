import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import Layout from './pages/Layout';
import Home from './pages/Home';
import Trade from './pages/Trade';
import Login from './pages/Login';
import useStore from './store'
import PrivateRoute from "./PrivateRoute";

function App() {
  const user = useStore(state => state.user)
  const queryClient = new QueryClient()

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute isLoggedIn={user?.isLoggedIn} />}>
              <Route path="/trade" element={<Trade />} />
            </Route>
          </Routes>
        </Layout>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
