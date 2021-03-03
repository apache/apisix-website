import React from "react";
import styled from "styled-components";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import IconTriangle from "../assets/icons/triangle.svg";
import IconSquare from "../assets/icons/square.svg";
import IconHexagon from "../assets/icons/hexagon.svg";

const Page = styled.div`
  max-width: var(--ifm-container-width);
  margin: 0 auto;
  padding: 2rem var(--ifm-spacing-horizontal);
  width: 100%;
`;
const PageTitle = styled.h1`
  margin-top: 2rem;
  font-size: 3rem;
  font-weight: 800;
  text-transform: uppercase;
`;
const PageSubtitle = styled.div`
  margin-bottom: 4rem;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  @media (max-width: 996px) {
    grid-template-columns: 1fr;
  }
`;
const Card = styled.a`
  border-radius: 0.75rem;
  border: 1px solid #eee;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  @media (max-width: 600px) {
    flex-direction: column;
    padding: 1rem;
  }

  &:hover {
    color: inherit;
    text-decoration: none;
    svg {
      transform: rotate(360deg);
    }
  }
`;
const Title = styled.div`
  font-size: 2.4rem;
  line-height: 2.4rem;
  margin-bottom: 1rem;
  font-weight: bold;
  display: block;
  cursor: pointer;
  @media (max-width: 600px) {
    margin-top: 0px;
    font-size: 1.6rem;
  }
  svg {
    transition: all 0.6s;
  }
`;
const Description = styled.div`
  color: #374151;
  font-size: 1rem;
  margin-top: 0px;
  @media (max-width: 600px) {
    margin-top: 6px;
  }
`;
const ShapeBeforeTitle = styled.span`
  margin-right: 12px;
  & svg {
    height: 1.75rem;
    color: ${(props) => props.color || "var(--ifm-color-primary)"};
  }
  @media (max-width: 600px) {
    margin-right: 8px;
    & svg {
      height: 1.3rem;
    }
  }
`;
const VersionInfo = styled.div`
  display: inline-flex;
  font-size: 1rem;
  margin-top: 1rem;
  color: #4b5563;
  span {
    font-weight: 500;
  }
`;

const ProjectCard = (props) => {
  const {
    name,
    nameInParamCase,
    description,
    shape,
    color,
    version,
    releaseDate,
    firstDocPath = "",
  } = props;
  const shapeComponent =
    shape === "triangle" ? (
      <IconTriangle />
    ) : shape === "square" ? (
      <IconSquare />
    ) : (
      <IconHexagon />
    );

  return (
    <Card href={`/docs/${nameInParamCase}${firstDocPath}`}>
      <Title>
        <ShapeBeforeTitle color={color}>{shapeComponent}</ShapeBeforeTitle>
        {name}
      </Title>
      <Description>{description}</Description>
      <VersionInfo>
        Latest version&nbsp;<span>{version}</span>&nbsp;released at&nbsp;
        <span>{releaseDate}</span>
      </VersionInfo>
    </Card>
  );
};

export default (props) => {
  const { siteConfig } = useDocusaurusContext();
  if (!(siteConfig.customFields.downloads || []).length) {
    return null;
  }
  const projects = siteConfig.customFields.downloads.map((project) => {
    return <ProjectCard key={project.name} {...project} />;
  });

  return (
    <Layout>
      <Page>
        <PageTitle>Documents</PageTitle>
        <PageSubtitle>We love open source.</PageSubtitle>
        <CardsContainer>{projects}</CardsContainer>
      </Page>
    </Layout>
  );
};
