import { Helmet } from 'react-helmet-async';
import ErrorNotFound from './ErrorMessage';
import Lamp from './Lamp';

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>404</title>
      </Helmet>
      <Lamp />
      <ErrorNotFound />
    </>
  );
};

export default NotFound;
