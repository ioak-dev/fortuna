import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';

import { useHistory, withRouter } from 'react-router';

import './RightNav.scss';

import { receiveMessage, sendMessage } from '../../events/MessageService';
import DarkModeIcon from '../Navigation/DarkModeIcon';
import NavAccountIcon from '../Navigation/NavAccountIcon';
import { removeAuth } from '../../store/actions/AuthActions';

interface Props {
  cookies: any;
  //   location: any;
  //   match: any;
}

const RightNav = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = (
    event: any,
    type = 'success',
    message = 'You have been logged out'
  ) => {
    dispatch(removeAuth());
    props.cookies.remove(
      `fortuna_${process.env.REACT_APP_ONEAUTH_APPSPACE_ID}`
    );
    history.push(`/`);
    sendMessage('notification', true, {
      type,
      message,
      duration: 3000,
    });
  };

  const login = (type: string) => {
    window.location.href = `${process.env.REACT_APP_ONEAUTH_URL}/#/realm/${process.env.REACT_APP_ONEAUTH_APPSPACE_ID}/login/${process.env.REACT_APP_ONEAUTH_APP_ID}`;
  };

  return (
    <div className="right-nav">
      {/* <OakButton theme="info" variant="regular" handleClick={openAddExpense}>
        <FontAwesomeIcon icon={faPlus} /> Expense
      </OakButton>
      <OakButton theme="info" variant="regular" handleClick={openEditCategory}>
        <FontAwesomeIcon icon={faPlus} /> Category
      </OakButton> */}
      <DarkModeIcon />
      <NavAccountIcon logout={logout} login={login} />
    </div>
  );
};

export default RightNav;
