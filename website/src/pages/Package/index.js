// @flow

import React, { Component, type Node } from 'react';
import styled from 'styled-components';

import { Helmet } from 'react-helmet';
import { List } from 'react-feather';

import Button from '@uidu/button';
import { AtlassianIcon } from '@atlaskit/logo';

import Loading from '../../components/Loading';
import Page from '../../components/Page';
import FourOhFour from '../FourOhFour';

import MetaData from './MetaData';
import LatestChangelog from './LatestChangelog';

import { isModuleNotFoundError } from '../../utils/errors';
import * as fs from '../../utils/fs';
import { Link } from '../../components/WrappedLink';
import Loadable from '../../components/WrappedLoader';

import fetchPackageData from './utils/fsOperations';

import type { RouterMatch } from '../../types';
import type { Logs } from '../../components/ChangeLog';

export const ButtonGroup = styled.div`
  display: inline-flex;
`;

export const NoDocs = props => {
  return <div>Component "{props.name}" doesn't have any documentation.</div>;
};

type PackageProps = {
  match: RouterMatch,
};

type PackageState = {
  changelog: Logs,
  doc: Node | null,
  examples: Array<any> | null,
  missing: boolean | null,
  pkg: Object | null,
};

const initialState = {
  changelog: [],
  doc: null,
  examples: null,
  missing: false,
  pkg: null,
};

function getExamplesPaths(groupId, pkgId, examples) {
  if (!examples || !examples.length) return {};

  const regex = /^[a-zA-Z0-9]/; // begins with letter or number, avoid "special" files
  const filtered = examples.map(a => a.id).filter(id => id.match(regex));
  const res = filtered[0];

  if (!res) return {};

  return {
    examplePath: `/examples/${groupId}/${pkgId}/${fs.normalize(res)}`,
    exampleModalPath: `/packages/${groupId}/${pkgId}/example/${fs.normalize(
      res,
    )}`,
  };
}

export default function LoadData({ match }) {
  const { groupId, pkgId } = match.params;

  const Content = Loadable({
    loading: () => (
      <Page>
        <Loading />
      </Page>
    ),
    loader: () =>
      fetchPackageData(groupId, pkgId).catch(
        error => console.log(error) || { error },
      ),
    render: props => {
      const { missing, error } = props;
      if (missing || error) return <FourOhFour />;

      return (
        <Package
          {...props}
          pkgId={pkgId}
          groupId={groupId}
          urlIsExactMatch={match.isExact}
        />
      );
    },
  });

  return <Content />;
}

class Package extends Component<*, *> {
  render() {
    const {
      urlIsExactMatch,
      groupId,
      pkgId,
      pkg,
      doc,
      changelog,
      examples,
    } = this.props;
    const { examplePath, exampleModalPath } = getExamplesPaths(
      groupId,
      pkgId,
      examples,
    );

    const title = fs.titleize(pkgId);

    return (
      <Page>
        {urlIsExactMatch && (
          <Helmet>
            <title>
              {title} package - {BASE_TITLE}
            </title>
          </Helmet>
        )}
        <div className="d-flex align-items-center justify-content-between">
          <div className="mr-3">
            <h1 className="h4">{title}</h1>
            <p className="mb-0">{pkg.description}</p>
          </div>
          {examplePath && (
            <ButtonGroup>
              <Button
                className="mr-3"
                color="light"
                component={Link}
                to={`/packages/${groupId}/${pkgId}/changelog`}
                withIcon
              >
                <List className="mr-2" /> Changelog
              </Button>
              <Button component={Link} to={exampleModalPath}>
                Examples
              </Button>
              {pkg['atlaskit:designLink'] && (
                <Button
                  iconBefore={<AtlassianIcon size="small" />}
                  href={pkg['atlaskit:designLink']}
                >
                  Design docs
                </Button>
              )}
            </ButtonGroup>
          )}
        </div>
        <hr />
        <MetaData
          packageName={pkg.name}
          packageSrc={`https://bitbucket.org/atlassian/atlaskit-mk-2/src/master/packages/${groupId}/${pkgId}`}
          changelog={changelog}
          pkgId={pkgId}
          groupId={groupId}
        />
        <hr />
        {doc || <NoDocs name={pkgId} />}
      </Page>
    );
  }
}
