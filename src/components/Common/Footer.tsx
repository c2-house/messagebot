import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-200 p-10 text-base-content">
      <aside>
        <Image src="/images/text-logo.png" alt="logo" width={60} height={17} className="mb-2" />
        <a
          href="https://chaechae.life"
          target="_blank"
          rel="noreferrer noopener"
          className="link-hover link"
        >
          About us
        </a>
        <a href="mailto:chaechae.couple@gmail.com" className="link-hover link">
          chaechae.couple@gmail.com
        </a>
        <p>&copy; {new Date().getFullYear()} ChaeChae. All Rights Reserved.</p>
      </aside>
      <nav>
        <header className="footer-title font-sans">Family Site</header>
        <a
          href="https://ev-charge.kr"
          target="_blank"
          rel="noreferrer noopener"
          className="link-hover link"
        >
          전기차G - 전기차 충전소 찾기
        </a>
        <a
          href="https://chaechaekorea.com"
          target="_blank"
          rel="noreferrer noopener"
          className="link-hover link"
        >
          ChaeChae Korea
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
