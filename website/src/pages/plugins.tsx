/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import type { FC } from 'react';
import React from 'react';
import styled from 'styled-components';

import Layout from '@theme/Layout';
import Translate, { translate } from '@docusaurus/Translate';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import Head from '@docusaurus/Head';
import Affix from '../components/UI/Affix';
import '../css/plugins.scss';

const PageTitle = styled.h1`
  text-align: center;
  margin-top: 1rem;
  font-size: 3rem;
  font-weight: 700;
  text-transform: uppercase;
`;

const PageSubtitle = styled.div`
  text-align: center;
  font-size: 1rem;
  margin-bottom: 2rem;
  font-weight: 400;
`;

const SidebarItem = styled.div`
  padding-top: 3px;
  padding-bottom: 3px;
  padding-right: 3px;
  text-align: right;
  font-size: 1rem;
  font-weight: 400;
  text-transform: capitalize;
  color: #d0312d;
`;

const Page = styled.div`
  max-width: var(--ifm-container-width);
  margin: 0 auto;
  padding: 2rem var(--ifm-spacing-horizontal);
  width: 100%;
  flex-wrap: wrap;
  gridTemplateAreas : "'SidebarContainer' 'PluginsContainer'";
`;

const PluginsContainer = styled.div`
  display: grid;
  margin-left: 200px;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5px;
  @media (max-width: 1200px) {
    margin-left: 0;
  }
  @media (max-width: 812px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 576px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const SidebarContainer = styled.div`
  display: grid;
  width: 100%;
  overflow-x: hidden;
  padding-right: 10px;
  border-style: solid;
  border-color: #ffffff #efeff5 #ffffff #ffffff ;
  @media (max-width: 1200px) {
    display: none;
  }
`;

const PluginCard = styled.a`
  border-radius: 0.75rem;
  border: 1px solid #eee;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: left;
  text-align: left;
  padding: 1rem;
  min-width: calc(180px + 5rem);
  cursor: pointer;
  height: 100%;
  &:hover {
  color: inherit;
  text-decoration: none;
}
`;

const PluginIcon = styled.div`
  padding: 1rem;
  display: flex;
  min-height: 200px;
  align-items: center;
  justify-content: center;
`;

const PluginName = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 12px;
  margin-bottom: -4px;
  line-height: 1rem;
  text-align: left;
  text-transform: capitalize;
`;

const PluginDescription = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
  margin-top: 10px;
  color : #7e7c7c;
  text-align: left;
`;

const SectionTitle = styled.h2`
  margin-left: 200px;
  margin-bottom: 24px;
  margin-top: 84px;
  text-transform: uppercase;
  @media (max-width: 1200px) {
    margin-left: 0;
  }
`;

const SBeta = styled.div`
  padding: 0.1rem 0.5rem 0.1rem 0.3rem;
  margin: 0 0.5rem;
  font-size: 90%;
  font-weight: 300;
  border: 1px solid #dadde1;
  border-right: 0;
  position: relative;
  transition: all 0.2s;
  ::before {
    content: "";
    left: 100%;
    transform: translate(-50%,-50%) rotate(45deg);
    border-left: 0 !important;
    border-bottom: 0 !important;
    width: 0.9rem;
    height: 0.9rem;
    border: 1px solid var(--docusaurus-tag-list-border);
    position: absolute;
    top: 50%;
    transition: inherit;
  }
  ::after {
    content: '';
    right: 0;
    border-radius: 50%;
    height: 0.4rem;
    width: 0.4rem;
    left: 90%;
    transform: translateY(-50%);
    border: 1px solid var(--docusaurus-tag-list-border);
    content: "";
    position: absolute;
    top: 50%;
    transition: inherit;
  }
  :hover {
    color: #e8433e;
    border-color: #e8433e;
    ::before, ::after {
      border-color: #e8433e;
    }
  }
`;

const Plugins: FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const { plugins = [] } = siteConfig.customFields as { plugins: any[] };
  const sidebar = plugins.map((section) => (
    <SidebarItem key={section.groupName}><a className="sidebar-link" href={`#${section.groupName}`}>{section.groupName}</a></SidebarItem>
  ));

  const pluginList = plugins.map((section) => {
    const pluginCards = section.plugins.map((plugin) => {
      const pluginUrl = plugin.name.indexOf('serverless') !== -1 ? 'serverless' : plugin.name;
      return (
        <div key={plugin.name}>
          <PluginCard href={plugin.beta ? `/docs/apisix/next/plugins/${pluginUrl}` : `/docs/apisix/plugins/${pluginUrl}`} target="_blank">
            <PluginIcon>
              {plugin.useDefaultIcon
                ? <img className="plugin-logo shadow default" src="/img/plugin/default-icon.png" alt={plugin.name} />
                : (
                  <svg className="plugin-logo shadow" aria-hidden="true">
                    <use xlinkHref={`#icon${plugin.name}`} />
                  </svg>
                )}
            </PluginIcon>
            <PluginName>
              {plugin.name}
              {plugin.beta && <SBeta title="This plugin will be supported in the next version of Apache APISIX">Beta</SBeta>}
            </PluginName>
            <PluginDescription>{plugin.description}</PluginDescription>
            <span className="read-more-link">{'Read more >'}</span>
          </PluginCard>
        </div>
      );
    });
    return (
      <div key={section.groupName}>
        <SectionTitle id={section.groupName}>{section.groupName}</SectionTitle>
        <PluginsContainer>
          {pluginCards}
        </PluginsContainer>
      </div>
    );
  });

  return (
    <Layout title={translate({ message: 'Plugin Hub' })}>
      <Head>
        <script src="/js/plugin-icon.js" defer />
      </Head>
      <Page>
        <PageTitle>
          <Translate id="plugins.website.title">Apache APISIX®️ Plugin Hub</Translate>
        </PageTitle>
        <PageSubtitle>
          <Translate id="plugins.website.subtitle">Powerful Plugins and Easy Integrations</Translate>
        </PageSubtitle>
        <Affix style={{
          width: 250, top: 300, left: 0, zIndex: 1,
        }}
        >
          <SidebarContainer>{sidebar}</SidebarContainer>
        </Affix>
        {pluginList}
      </Page>
    </Layout>
  );
};

export default Plugins;
