import ErrorNotFound from './ErrorMessage';
import Lamp from './Lamp';

const NotFound: React.FC = () => {
  return (
    <>
      <Lamp />
      <ErrorNotFound />
    </>
  );
};

export default NotFound;
