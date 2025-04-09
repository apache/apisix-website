import { Redirect } from '@docusaurus/router';
import React from 'react';
import type { FC } from 'react';
import sidebarsJson from '../../../../docs/general/sidebars.json';

const Events: FC = () => {
  const eventsObj = sidebarsJson.docs.Community.find((v) => {
    if (typeof v === 'object') {
      return v.type === 'category' && v.label === 'Events';
    }
    return false;
  }) as { items: string[] } | undefined;
  const events = eventsObj?.items;

  if (!events || !Array.isArray(events)) return null;
  return <Redirect to={events[0].replace(/^events\//, '')} />;
};

export default Events;
