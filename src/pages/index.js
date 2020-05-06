import React from 'react';
import '../styles/pages/index.scss';
import Container from '../components/container';
import TitleBox from '../components/titlebox';
import Footer from '../components/footer';
import StatusBoxContainer from '../components/statusboxContainer';
import InfoBox from '../components/info';
import { Location } from '@reach/router';

export default ({ data }) => (
  <Location>
    {({ location, navigate }) => (
      <Container>
        <TitleBox />
        <div>
          <InfoBox location={location} />
        </div>

        <StatusBoxContainer />
        <Footer />
      </Container>
    )}
  </Location>
);
