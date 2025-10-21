import Script from 'next/script';

const StickyWebringBanner = ({ theme = 'default' }) => {
  return (
    <>
      <div>
        <webring-banner theme={theme}>
          <p>Member of the <a href="https://polyring.ch">Polyring</a> webring</p>
        </webring-banner>
      </div>
      <Script async src="https://polyring.ch/embed.js" charSet="utf-8" />
    </>
  );
};

export default StickyWebringBanner;