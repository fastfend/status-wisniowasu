import React from 'react';
import containerStyles from '../styles/components/container.module.scss';
import PropTypes from 'prop-types';

export default function Container({ children }) {
  return <div className={containerStyles.container}>{children}</div>;
}
Container.displayName = 'Container';
Container.propTypes = {
  children: PropTypes.object,
};
