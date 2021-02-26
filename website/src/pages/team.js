import React from "react";
import styled from "styled-components";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import GitHubLogo from "../assets/icons/github-logo.svg";

import IconCode from "../assets/icons/code.svg";
import IconStar from "../assets/icons/star.svg";
import IconDatabase from "../assets/icons/database.svg";
import IconTerminal from "../assets/icons/terminal.svg";
import IconPuzzle from "../assets/icons/puzzle.svg";
import IconEye from "../assets/icons/eye.svg";
import IconDocumentText from "../assets/icons/document-text.svg";

const PageTitle = styled.h1`
  margin-top: 2rem;
  font-size: 4rem;
  font-weight: 800;
  text-transform: uppercase;
`;

const PageSubtitle = styled.div`
  margin-bottom: 3rem;
`;

const Page = styled.div`
  max-width: var(--ifm-container-width);
  margin: 0 auto;
  padding: 2rem var(--ifm-spacing-horizontal);
  width: 100%;
`;

const MembersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 18px;
  @media (max-width: 812px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const MemberCard = styled.a`
  border-radius: 0.75rem;
  border: 1px solid #eee;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1rem;
  min-width: calc(108px + 2rem);
  cursor: pointer;
  height: 100%;
  &:hover {
    color: inherit;
    text-decoration: none;
  }
`;

const Avatar = styled.img`
  height: 108px;
  width: 108px;
  border-radius: 50%;
`;
const MemberName = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin-top: 12px;
  margin-bottom: -4px;
  line-height: 1rem;
`;
const Username = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
  margin-top: 8px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 24px;
  margin-top: 84px;
`;
const SectionSubtitle = styled.p`
  opacity: 0.68;
  margin-top: -12px;
`;

const RepoCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -8px;
`;
const RepoCard = styled.a`
  border-radius: 0.75rem;
  border: 1px solid #eee;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03);
  display: flex;
  align-items: center;
  font-weight: 500;
  padding: 1rem;
  margin: 8px;
  cursor: pointer;
  color: #374151;
  transition: all 0.3s;

  &:hover {
    opacity: 0.98;
    color: inherit;
    text-decoration: none;
    color: #111827;
  }

  svg {
    margin-right: 8px;
    transition: all 0.3s;
  }
`;

const ContributeCard = styled.div`
  display: flex;
  background: #100f14;
  border-radius: 0.75rem;
  margin-top: 6rem;
  margin-bottom: 3rem;
  color: white;
  padding: 2rem 2.4rem;
`;
const ContributeCardTitle = styled.div`
  font-size: 2.4rem;
  font-weight: 700;
`;
const ContributeCardSubtitle = styled.div`
  opacity: 0.78;
  font-size: 14px;
  margin-top: 1rem;
`;
const ContributeCardButton = styled.a`
  padding: 12px 24px;
  font-size: 20px;
  line-height: 20px;
  font-weight: 600;
  border-radius: 0.5rem;
  border: 2px solid white;
  background: transparent;
  color: white;
  transition: all 0.3s;
  margin-top: 2.4rem;
  cursor: pointer;
  display: inline-block;
  &:hover {
    background: white;
    color: black;
    text-decoration: none;
  }
`;

const ContributeCardLeftSide = styled.div`
  flex: 3;
`;

const ContributeCardRightSide = styled.div`
  @keyframes icon-animation {
    0% {
      color: #ef4444;
    }
    14% {
      color: #f59e0b;
    }
    28% {
      color: #10b981;
    }
    42% {
      color: #3b82f6;
    }
    57% {
      color: #6366f1;
    }
    71% {
      color: #8b5cf6;
    }
    85% {
      color: #ec4899;
    }
    100% {
      color: #ef4444;
    }
  }
  flex: 1;
  position: relative;
  @media (max-width: 812px) {
    display: none;
  }
  svg {
    position: absolute;
    color: white;
    height: 24px;
    transition: all 0.3s;
  }
  svg:hover {
    animation-name: icon-animation;
    animation-duration: 2s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
  #icon-code {
    height: 72px;
    top: 12px;
    right: 12px;
    transform: rotate(15deg);
  }
  #icon-star {
    height: 56px;
    top: 108px;
    right: 34px;
    transform: rotate(45deg);
  }
  #icon-database {
    height: 42px;
    top: 66px;
    right: 108px;
    transform: rotate(10deg);
  }
  #icon-terminal {
    height: 32px;
    bottom: 0;
    left: 88px;
    transform: rotate(-16deg);
  }
  #icon-puzzle {
    height: 28px;
    left: 88px;
    transform: rotate(-10deg);
  }
  #icon-eye {
    height: 38px;
    right: 16px;
    bottom: 12px;
    transform: rotate(10deg);
  }
  #icon-document-text {
    height: 22px;
    bottom: 58px;
    left: 124px;
    transform: rotate(12deg);
  }
`;

function Team(props) {
  const { siteConfig } = useDocusaurusContext();
  const memberSections = siteConfig.customFields.team.map((section) => {
    const memberCards = section.members.map((member) => {
      return (
        <div key={member.username}>
          <MemberCard
            href={`https://github.com/${member.githubUsername}`}
            target="_blank"
          >
            <Avatar src={member.avatarUrl} />
            <MemberName>{member.name}</MemberName>
            <Username>@{member.username}</Username>
          </MemberCard>
        </div>
      );
    });
    return (
      <div key={section.groupName}>
        <SectionTitle>{section.groupName}</SectionTitle>
        <MembersContainer id={section.groupName}>
          {memberCards}
        </MembersContainer>
      </div>
    );
  });
  const repoComponents = siteConfig.customFields.allRepos.map((repo) => {
    return (
      <RepoCard
        href={`https://github.com/${repo}/graphs/contributors`}
        target="_blank"
        key={repo}
      >
        <GitHubLogo /> {repo}
      </RepoCard>
    );
  });
  return (
    <Page>
      <PageTitle>Team</PageTitle>
      <PageSubtitle>We love open source.</PageSubtitle>
      {memberSections}
      <SectionTitle>Contributors</SectionTitle>
      <SectionSubtitle>
        You can find all contributors of Apache APISIX from GitHub contribution
        list.
      </SectionSubtitle>
      <RepoCardsContainer>{repoComponents}</RepoCardsContainer>
      <ContributeCard>
        <ContributeCardLeftSide>
          <ContributeCardTitle>🛠 Become A Committer </ContributeCardTitle>
          <ContributeCardSubtitle>
            The Apache APISIX community follows the Apache Community’s process
            on accepting a new committer. After a contributor participates
            APISIX's community actively, PMC and Committers will make decisions
            to invite the contributor join Committers and PMC.
          </ContributeCardSubtitle>
          <ContributeCardButton href="/docs/general/contributor-guide">
            Start Contribute
          </ContributeCardButton>
        </ContributeCardLeftSide>
        <ContributeCardRightSide>
          <IconCode id="icon-code" />
          <IconStar id="icon-star" />
          <IconDatabase id="icon-database" />
          <IconTerminal id="icon-terminal" />
          <IconPuzzle id="icon-puzzle" />
          <IconEye id="icon-eye" />
          <IconDocumentText id="icon-document-text" />
        </ContributeCardRightSide>
      </ContributeCard>
    </Page>
  );
}

export default (props) => (
  <Layout>
    <Team {...props} />
  </Layout>
);
