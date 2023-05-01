import { BrowserRouter } from 'react-router-dom';
import Layout from './structure/layout';
import Helmet from 'react-helmet';
const App = () => {
  return (
    <BrowserRouter>
    <Helmet>
      <title>Tim's website</title>
    </Helmet>
      <Layout />
    </BrowserRouter>
  );
}


export default App;
