import { memo } from 'react';
import { extraMainURLFrontend } from "./../../../../src/app/AppParams";

function FuseSplashScreen() {
  return (
    <div id="fuse-splash-screen">
      <div className="center">
        <div className="logo">
          <img width="128" src={extraMainURLFrontend+"assets/images/logos/logo_tekmovil.png"} alt="logo"/>
        </div>
        <div className="spinner-wrapper">
          <div className="spinner">
            <div className="inner">
              <div className="gap" />
              <div className="left">
                <div className="half-circle" />
              </div>
              <div className="right">
                <div className="half-circle" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(FuseSplashScreen);
