import React from 'react';
import '../styles/pages/index.scss';
import Container from '../components/container';
import TitleBox from '../components/titlebox';
import Footer from '../components/footer';
import StatusBoxContainer from '../components/statusboxContainer';
import InfoBox from '../components/info';
import { Location } from '@reach/router';

export default function Index({ data }) {
  return (
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
}
Index.displayName = 'Index';
Index.propTypes = {
  data: PropTypes.object,
};
