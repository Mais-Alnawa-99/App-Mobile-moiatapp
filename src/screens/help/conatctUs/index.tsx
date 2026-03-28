import React, {Fragment} from 'react';
import CallSection from './CallSection';
import HelpMapView from './HelpMapView';
import CentersSection from './CentersSection';
import TawasulSection from './TawasulSection';

export default function ConatctUs(props: any): JSX.Element {
  return (
    <Fragment>
      <CallSection />
      <HelpMapView />
      <CentersSection />
      <TawasulSection />
    </Fragment>
  );
}
