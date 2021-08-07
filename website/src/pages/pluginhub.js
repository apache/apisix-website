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
import React from "react";
import styled from "styled-components";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";


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

const Sidebaritem = styled.div`
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
  @media (max-width: 812px) {
  grid-template-columns: repeat(2, 1fr);
}
`;

const SidebarContainer = styled.div`
  display: grid;
  width: 250px;
  position: fixed;
  z-index: 1;
  left: 0;
  overflow-x: hidden;
  top: 300px;
  padding-right: 10px;
  border-style: solid;
  border-color: #ffffff #efeff5 #ffffff #ffffff ;
}
`;

const PluginCard = styled.a`
  border-radius: 0.75rem;
  border: 1px solid #eee;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
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

const PluginName = styled.div`
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
`;


function Plugins(props) {
  const { siteConfig } = useDocusaurusContext();
  const sidebar = siteConfig.customFields.plugins.map((section) => {
    return (
      <Sidebaritem><a className="sidebar-link" href={`#${section.groupName}`}>{section.groupName}</a></Sidebaritem>
    );
  });
  
  const plugins = siteConfig.customFields.plugins.map((section) => {
    const pluginCards = section.plugins.map((plugin) => {
      return (
        <div key={plugin.name}>
          <PluginCard>
            <a href={`https://apisix.apache.org/docs/apisix/plugins/${plugin.name}`} target="_blank">
              <img className="plugin-logo shadow" src={plugin.src} alt={plugin.name} />
            </a>
            <PluginName>{plugin.name}</PluginName>
            <PluginDescription>{plugin.description}</PluginDescription>
            <a className="read-more-link" href={`https://apisix.apache.org/docs/apisix/plugins/${plugin.name}`}>{'Read more >'}</a>
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
    <Page>
      <PageTitle>Apache APISIX®️ Plugin Hub</PageTitle>
      <PageSubtitle>Powerful Plugins and Easy Integrations</PageSubtitle>
      <SidebarContainer>{sidebar}</SidebarContainer>
      {plugins}
    </Page>
  );
}

export default (props) => (
  <Layout>
    <Plugins {...props} />
  </Layout>
);
