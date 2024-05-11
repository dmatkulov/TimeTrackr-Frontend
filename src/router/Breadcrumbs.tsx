import { useMatches } from 'react-router-dom';
import React from 'react';
import { Breadcrumb } from 'antd';

interface Handle {
  link: string;
  title: string;
}

interface Crumb {
  title: React.ReactNode | string;
}
const Breadcrumbs = () => {
  const matches = useMatches();

  const crumbs = matches
    .filter((match) => Boolean(match.handle))
    .map((match) => {
      return match.handle as Handle;
    });

  const bread: Crumb[] = crumbs.map((crumb, i) => {
    if (crumbs.length > 1 && i === crumbs.length - 1) {
      return {
        title: crumb.title,
      };
    }

    return {
      title: <a href={crumb.link}>{crumb.title}</a>,
    };
  });

  return (
    <>
      <Breadcrumb
        items={bread}
        style={{ marginBottom: '20px', fontSize: '12px' }}
      />
    </>
  );
};

export default Breadcrumbs;
