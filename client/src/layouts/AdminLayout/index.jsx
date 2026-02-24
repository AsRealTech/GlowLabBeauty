import { useContext, useEffect, Suspense, useState } from 'react';
import { Navigate, Outlet, replace } from 'react-router-dom';
import api from "../../config/axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// project imports
import MobileHeader from './MobileHeader';
import Navigation from './Navigation';
import NavBar from './NavBar';
import Breadcrumb from './Breadcrumb';
import useWindowSize from 'hooks/useWindowSize';
import { ConfigContext } from 'contexts/ConfigContext';
import * as actionType from 'store/actions';
import Loader from 'components/Loader/Loader';

// -----------------------|| ADMIN LAYOUT ||-----------------------//

export default function AdminLayout() {
  const [loading, setLoading] = useState(true);
  const windowSize = useWindowSize();
  const configContext = useContext(ConfigContext);
  const bodyElement = document.body;
  const { collapseLayout } = configContext.state;
  const { dispatch } = configContext;
  
  const { state } = useContext(ConfigContext);

  useEffect(() => {

    const fetchUser = async () => {
          try {
                const res = await api.get('/me');

                if (!res) {
                    console.log("User not authenticated");
                    return;
                }

                dispatch({
                  type: actionType.SET_USER,
                  payload: res.data.user
                });
            } catch (err) {
                console.error("Failed to fetch user:", err);
                return;
            }finally{
                setLoading(false);
            }
        };
        
        // Navigation
        if (windowSize.width > 992 && windowSize.width <= 1024) {
          dispatch({ type: actionType.COLLAPSE_MENU });
        }
        
        fetchUser();

  }, [dispatch, windowSize]);

  if(loading){
    return <p>Loading...</p>
  }

  if(!state.userData){
    return <Navigate to={"/login"} relative='true'/>;
  }

  if (windowSize.width > 992 && collapseLayout) {
    bodyElement.classList.add('minimenu');
  } else {
    bodyElement.classList.remove('minimenu');
  }

  let containerClass = ['pc-container'];

  let adminlayout = (
    <>
      <MobileHeader />
      <NavBar />
      <Navigation />
      <div className={containerClass.join(' ')}>
        <div className="pcoded-content">
          <>
            <Breadcrumb />
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </>
        </div>
        
      </div>
      <div style={{position:"absolute"}}>
              <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              pauseOnHover
              draggable
              theme="colored"
            />
      </div>
    </>
  );
  return <>{adminlayout}</>;
}
