import React from 'react';
import Layout from './components/Layout';
import App from './components/App';

function AppView({ app }) {
  return (
    <Layout>
      {
        app?
          <App {...app}/> : null
      }
    </Layout>
  );
}
export default AppView;
