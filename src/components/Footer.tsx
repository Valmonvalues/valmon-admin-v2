import React from 'react';
import { Link } from '@tanstack/react-router';

import brandLogo from '@/assets/images/Logo/valmon.svg'; // Adjust the path accordingly

// If you have svg components, import them here or inline the SVGs as you prefer

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#151212] text-base-content pt-10 lg:p-10 lg:px-20">
      <nav className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0 lg:justify-between">
        <a href="/">
          <img src={brandLogo} alt="brand logo" />
        </a>

        <div className="text-white gap-4 flex items-center lg:w-1/3 justify-between text-base">
          <Link to="/about" className="link link-hover">
            About Us
          </Link>
          <Link to="/terms" className="link link-hover">
            Our Terms
          </Link>
          <a href="mailto:support@valmonvalues.com" className="link link-hover">
            Support
          </a>
          <Link to="/faq" className="link link-hover">
            FAQ
          </Link>
        </div>

        <div className="center gap-3 flex items-center">
          {/* X (Twitter) Icon */}
          <a className="link link-hover" href="https://x.com/valmonworld/">
            <svg
              width="14"
              height="15"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_1842_19623"
                style={{ maskType: 'luminance' }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="14"
                height="15"
              >
                <path d="M0 0.5H14V14.5H0V0.5Z" fill="white" />
              </mask>
              <g mask="url(#mask0_1842_19623)">
                <path
                  d="M11.025 1.15601H13.172L8.482 6.53001L14 13.844H9.68L6.294 9.40901L2.424 13.844H0.275L5.291 8.09401L0 1.15701H4.43L7.486 5.21001L11.025 1.15601ZM10.27 12.556H11.46L3.78 2.37701H2.504L10.27 12.556Z"
                  fill="#868686"
                />
              </g>
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            className="link link-hover"
            href="https://www.linkedin.com/in/valmon-world-53b5b4336"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="30"
              height="31"
              viewBox="0 0 30 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.3927 8H8.60729C8.31362 8 8.03198 8.11666 7.82432 8.32432C7.61666 8.53198 7.5 8.81362 7.5 9.10729V21.8927C7.5 22.1864 7.61666 22.468 7.82432 22.6757C8.03198 22.8833 8.31362 23 8.60729 23H21.3927C21.6864 23 21.968 22.8833 22.1757 22.6757C22.3833 22.468 22.5 22.1864 22.5 21.8927V9.10729C22.5 8.81362 22.3833 8.53198 22.1757 8.32432C21.968 8.11666 21.6864 8 21.3927 8ZM11.9708 20.7781H9.71563V13.6146H11.9708V20.7781ZM10.8417 12.6219C10.5859 12.6204 10.3362 12.5432 10.1242 12.4001C9.91222 12.2569 9.7474 12.0541 9.65055 11.8173C9.5537 11.5805 9.52915 11.3204 9.58002 11.0697C9.63088 10.8189 9.75488 10.5889 9.93635 10.4086C10.1178 10.2283 10.3486 10.1058 10.5997 10.0565C10.8507 10.0073 11.1107 10.0335 11.3468 10.1319C11.583 10.2302 11.7847 10.3964 11.9265 10.6093C12.0684 10.8222 12.144 11.0723 12.1438 11.3281C12.1462 11.4994 12.1141 11.6694 12.0494 11.828C11.9847 11.9866 11.8887 12.1306 11.7672 12.2513C11.6457 12.372 11.5012 12.4671 11.3421 12.5307C11.1831 12.5944 11.0129 12.6254 10.8417 12.6219ZM20.2833 20.7844H18.0292V16.8708C18.0292 15.7167 17.5385 15.3604 16.9052 15.3604C16.2365 15.3604 15.5802 15.8646 15.5802 16.9V20.7844H13.325V13.6198H15.4938V14.6125H15.5229C15.7406 14.1719 16.5031 13.4188 17.6667 13.4188C18.925 13.4188 20.2844 14.1656 20.2844 16.3531L20.2833 20.7844Z"
                fill="#868686"
              />
            </svg>
          </a>

          {/* Instagram */}
          <a
            className="link link-hover"
            href="https://www.instagram.com/valmon_world/profilecard/?igsh=OHcyMmlnY29zZ3Fo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.33434 0C6.20731 0 5.94105 0.0091815 5.10554 0.0459073C4.27309 0.082633 3.70078 0.217294 3.20498 0.410104C2.68776 0.612096 2.25011 0.878358 1.81552 1.31601C1.37787 1.7506 1.11161 2.18824 0.909616 2.7024C0.716806 3.20126 0.582145 3.77051 0.545419 4.60296C0.508693 5.44153 0.499512 5.7078 0.499512 7.83483C0.499512 9.96186 0.508693 10.2281 0.545419 11.0636C0.582145 11.8961 0.716806 12.4684 0.909616 12.9642C1.11161 13.4814 1.37787 13.9191 1.81552 14.3537C2.25011 14.7882 2.68776 15.0576 3.20192 15.2565C3.70078 15.4493 4.27002 15.584 5.10248 15.6207C5.93799 15.6574 6.20425 15.6666 8.33128 15.6666C10.4583 15.6666 10.7246 15.6574 11.5601 15.6207C12.3925 15.584 12.9649 15.4493 13.4606 15.2565C13.9748 15.0576 14.4125 14.7882 14.847 14.3537C15.2816 13.9191 15.551 13.4814 15.7499 12.9673C15.9427 12.4684 16.0774 11.8991 16.1141 11.0667C16.1508 10.2312 16.16 9.96493 16.16 7.83789C16.16 5.71086 16.1508 5.4446 16.1141 4.60908C16.0774 3.77663 15.9427 3.20432 15.7499 2.70853C15.5571 2.18824 15.2908 1.7506 14.8532 1.31601C14.4186 0.881418 13.9809 0.612096 13.4668 0.413165C12.9679 0.220355 12.3987 0.0856934 11.5662 0.0489676C10.7276 0.0091815 10.4614 0 8.33434 0ZM8.33432 3.8101C6.11241 3.8101 4.30978 5.61272 4.30978 7.83463C4.30978 10.0565 6.11241 11.8592 8.33432 11.8592C10.5562 11.8592 12.3589 10.0565 12.3589 7.83463C12.3589 5.61272 10.5562 3.8101 8.33432 3.8101ZM8.33432 10.4452C6.89283 10.4452 5.72373 9.27612 5.72373 7.83463C5.72373 6.39314 6.89283 5.22404 8.33432 5.22404C9.7758 5.22404 10.9449 6.39314 10.9449 7.83463C10.9449 9.27612 9.7758 10.4452 8.33432 10.4452ZM12.518 4.59548C13.0352 4.59548 13.4576 4.1762 13.4576 3.65592C13.4576 3.13869 13.0352 2.71635 12.518 2.71635C12.0008 2.71635 11.5785 3.13563 11.5785 3.65592C11.5785 4.17314 11.9977 4.59548 12.518 4.59548Z"
                fill="#868686"
              />
            </svg>
          </a>

          {/* Facebook */}
          <a
            className="link link-hover ms-2"
            href="https://www.facebook.com/share/DNNXgJge6LicdYKz/?mibextid=JRoKGi"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Insert Facebook SVG icon here if you want */}
          </a>

          {/* TikTok */}
          <a
            className="link link-hover ms-2"
            href="https://www.tiktok.com/@valmon_world?_t=8qvv9I9Ti1A&_r=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Insert TikTok SVG icon here if you want */}
          </a>

          {/* YouTube */}
          <a
            className="link link-hover ms-2"
            href="https://www.youtube.com/@Valmon_world"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Insert YouTube SVG icon here if you want */}
          </a>
        </div>
      </nav>

      <div className="border border-darkGold my-5" />

      <nav className="flex flex-col-reverse lg:flex-row gap-4 items-center justify-between mb-5">
        <p className="text-sm text-white w-full lg:w-2/6">
          © 2024 Valmon. All rights reserved.
        </p>

        <div className="text-sm p-3 gap-4 lg:px-0 w-full flex justify-between flex-1 text-center">
          <span className="flex justify-between gap-6 lg:gap-3 flex-col lg:flex-row flex-wrap flex-1">
            <Link to="/copyright-infringement" className="link link-hover text-[#868686] flex-1">
              Copyright Infringement
            </Link>
          </span>
          <Link to="/privacy" className="link link-hover text-[#868686] flex-1">
            Privacy Policy
          </Link>
          <Link to="/terms" className="link link-hover text-[#868686] flex-1">
            Terms of Service
          </Link>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
