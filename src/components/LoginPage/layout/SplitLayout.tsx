import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import './SplitLayout.scss';
import fortunaWhite from '../../../images/fortuna_white.svg';
import fortunaBlack from '../../../images/fortuna_black.svg';
import LoginFormContainer from '../form/LoginFormContainer';

interface Props {
  clientId: string;
  realm: number;
  currentRealm: any;
  currentClient: any;
}

const SplitLayout = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);

  useEffect(() => {
    if (props.currentRealm) {
      const el = document.getElementById('image-container');
      if (el) {
        el.style.background = `url('${props.currentRealm.site?.background}') no-repeat center center`;
        el.style.backgroundSize = 'cover';
      }
    }
  }, [props.currentRealm]);

  return (
    <div className="split-layout">
      <div className="split-layout__side" id="image-container" />
      <div className="split-layout__main">
        <div className="overlay">
          <div className="split-layout__main__header">
            {/* <img className="logo" src={fortunaBlack} alt="Fortuna logo" /> */}
          </div>
          <div className="content smooth-page">
            <div className="content__container">
              <img
                className="logo"
                src={props.currentRealm.site.logo || fortunaBlack}
                alt="Fortuna logo"
              />

              <LoginFormContainer
                clientId={props.clientId}
                realm={props.realm}
                currentRealm={props.currentRealm}
                currentClient={props.currentClient}
                background="light"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplitLayout;
