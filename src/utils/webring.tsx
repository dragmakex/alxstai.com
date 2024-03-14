import React from 'react';
import Script from 'next/script';

const WebringBanner = ({ theme = 'default' }) => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <webring-banner theme={theme}>
          <p>Member of the <a href="https://polyring.ch">Polyring</a> webring</p>
        </webring-banner>
      </div>
      <Script async src="https://polyring.ch/embed.js" charSet="utf-8" />
    </>
  );
};

export default WebringBanner;