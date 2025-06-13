import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { silentRefresh } from '../store/recruiterAuthThunk';

const useAutoLogin = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.recruiterAuth);

  const attemptedAutoLogin = useRef(false);

  useEffect(() => {
    if (!isAuthenticated && !loading && !attemptedAutoLogin.current) {
      attemptedAutoLogin.current = true;
      dispatch(silentRefresh());
    }
  }, [dispatch, isAuthenticated, loading]);
};

export default useAutoLogin;