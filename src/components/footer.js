import React from 'react';
import containerStyles from '../styles/components/footer.module.scss';
// import powered_logo from '../images/powered_logo.png'
// import insatgram from '../images/icons/icons8-instagram-100.png'
// import facebook from '../images/icons/icons8-facebook-100.png'
// import youtube from '../images/icons/icons8-play-button-100.png'
// import discord from '../images/icons/icons8-discord-100.png'
import packageJson from '../../package.json';

export default class Footer extends React.Component {
  render() {
    return (
      <footer className={containerStyles.footer}>
        <p className={containerStyles.poweredby}>powered by</p>
        <a
          href="https://wisniowasu.pl"
          className={containerStyles.logo}
        ></a>
        <div className={containerStyles.icons}>
          <a
            className={containerStyles.facebook}
            href="https://facebook.wisniowasu.pl"
            target="_blank"
            rel="noopener noreferrer"
          ></a>
          <a
            className={containerStyles.instagram}
            href="https://instagram.wisniowasu.pl"
            target="_blank"
            rel="noopener noreferrer"
          ></a>
          <a
            className={containerStyles.youtube}
            href="https://youtube.wisniowasu.pl"
            target="_blank"
            rel="noopener noreferrer"
          ></a>
          <a
            className={containerStyles.discord}
            href="https://discord.wisniowasu.pl"
            target="_blank"
            rel="noopener noreferrer"
          ></a>
        </div>
        <p>
          Made by{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/fastfend"
          >
            Piotr Stadnicki
          </a>{' '}
          | Source code on{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/fastfend/status-wisniowasu"
          >
            GitHub
          </a>
        </p>
        <p>
          Ikony wykorzystane z{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://icons8.com"
          >
            Icons8
          </a>
        </p>
        <p>wersja {packageJson.version}</p>
      </footer>
    );
  }
}
