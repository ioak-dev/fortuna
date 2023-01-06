import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ExpenseFilterModel from '../../model/ExpenseFilterModel';
import {
  ExpenseFilterPaginationState,
  ExpenseFilterState,
} from '../../simplestates/ExpenseFilterState';
import ExpenseListState from '../../simplestates/ExpenseListState';
import { fetchAllCategories } from '../../store/actions/CategoryActions';
import { receiveMessage, sendMessage } from '../../events/MessageService';
import { searchExpense } from '../Page/ExpensePage/service';
import PaginationModel from '../../model/PaginationModel';
import ExpenseStateActions from '../../simplestates/ExpenseStateActions';
import { fetchAndSetCompanyItems } from '../../store/actions/CompanyActions';
import { fetchAndSetUserItems } from '../../store/actions/UserActions';
import { fetchAndSetFilterExpenseItems } from '../../store/actions/FilterExpenseActions';
import { fetchAllTags } from '../../store/actions/TagActions';
import { setProfile } from '../../store/actions/ProfileActions';
import ReceiptStateActions from '../../simplestates/ReceiptStateActions';
import { fetchAllIncomeCategories } from '../../store/actions/IncomeCategoryActions';
import IncomeStateActions from '../../simplestates/IncomeStateActions';
import { axiosInstance, httpPost } from '../Lib/RestTemplate';
import { setSessionValue } from 'src/utils/SessionUtils';

const Init = () => {
  const authorization = useSelector((state: any) => state.authorization);
  const profile = useSelector((state: any) => state.profile);
  const [previousAuthorizationState, setPreviousAuthorizationState] =
    useState<any>();
  const [space, setSpace] = useState<string>();
  const [previousSpace, setPreviousSpace] = useState<string>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (authorization?.isAuth && space) {
      //  && !previousAuthorizationState?.isAuth) {
      initialize();
      initializeHttpInterceptor();
      dispatch(fetchAndSetUserItems(space, authorization));
      dispatch(fetchAllCategories(space, authorization));
      dispatch(fetchAllIncomeCategories(space, authorization));
      dispatch(fetchAllTags(space, authorization));
      dispatch(fetchAndSetFilterExpenseItems(space, authorization));
    }
  }, [authorization, space]);

  useEffect(() => {
    if (authorization?.isAuth && !previousAuthorizationState?.isAuth) {
      dispatch(fetchAndSetCompanyItems(authorization));
      setPreviousAuthorizationState(authorization);
    }
  }, [authorization]);

  useEffect(() => {
    if (space && previousSpace !== space) {
      setPreviousSpace(space);
    }
  }, [space]);

  useEffect(() => {
    initializeProfileFromSession();
    receiveMessage().subscribe((event: any) => {
      console.log(event);
      if (event.name === 'spaceChange') {
        setSpace(event.data);
      }
      if (event.name === 'spaceChange' && authorization.isAuth) {
        initialize();
        initializeHttpInterceptor();
      }
    });
  }, []);

  // useEffect(() => {
  //   document.body.addEventListener('mousedown', () => {
  //     sendMessage('usingMouse', true);
  //   });

  //   // Re-enable focus styling when Tab is pressed
  //   document.body.addEventListener('keydown', (event: any) => {
  //     if (event.keyCode === 9) {
  //       sendMessage('usingMouse', false);
  //     }
  //   });
  // }, [profile]);

  useEffect(() => {
    console.log('profile.theme');
    if (profile.theme === 'theme_light') {
      document.body.style.backgroundColor = 'var(--color-global-lightmode)';
    } else {
      document.body.style.backgroundColor = 'var(--color-global-darkmode)';
    }
  }, [profile.theme]);

  const initialize = () => {
    console.log('Initialization logic here');
    if (space) {
      // dispatch(fetchAllCategories(space, authorization));
    }
  };

  const initializeProfileFromSession = () => {
    const colorMode = sessionStorage.getItem('fortuna_pref_profile_colormode');
    const sidebarStatus = sessionStorage.getItem('fortuna_pref_sidebar_status');

    if (colorMode || sidebarStatus) {
      dispatch(
        setProfile({
          theme: colorMode || 'theme_dark',
          sidebar: sidebarStatus === 'expanded',
        })
      );
    }
  };

  const initializeHttpInterceptor = () => {
    console.log('HTTP Interceptor initialization');
    // TODO
    // axiosInstance.defaults.headers.authorization = authorization.access_token;
    // axiosInstance.interceptors.response.use(
    //   (response) => {
    //     return response;
    //   },
    //   (error) => {
    //     if (error.response.status !== 401) {
    //       return new Promise((resolve, reject) => {
    //         reject(error);
    //       });
    //     }
    //     httpPost(
    //       '/auth/token',
    //       {
    //         refresh_token: authorization.refresh_token,
    //         grant_type: 'refresh_token',
    //         realm: realm || 100,
    //       },
    //       null
    //     )
    //       .then((response) => {
    //         if (response.status === 200) {
    //           axiosInstance.defaults.headers.authorization =
    //             response.data.access_token;
    //           setSessionValue(
    //             `fortuna-access_token`,
    //             response.data.access_token
    //           );
    //           dispatch(
    //             addAuth({
    //               ...authorization,
    //               access_token: response.data.access_token,
    //             })
    //           );
    //           if (!error.config._retry) {
    //             error.config._retry = true;
    //             error.config.headers.authorization = response.data.access_token;
    //             return axiosInstance(error.config);
    //           }
    //         } else {
    //           console.log('********redirect to login');
    //         }
    //       })
    //       .catch((error) => {
    //         Promise.reject(error);
    //       });
    //   }
    // );
  };

  return (
    <>
      <ExpenseStateActions space={space} />
      <ReceiptStateActions space={space} />
      <IncomeStateActions space={space} />
    </>
  );
};

export default Init;
