import type { FC } from 'react';
import React, { useState } from 'react';
import styled from 'styled-components';
import IconComment from '../assets/icons/comment.svg';

interface CommonStyleProps {
  isShow: boolean
}

const Card = styled.div<CommonStyleProps>`
  @media (max-width: 700px) {
    width: 100%;
  }
  width: 80%;
  border: 1px solid rgb(232, 67, 62);
  border-radius: 5px;
  margin-bottom: 1rem;
  padding: 0.75rem 1.25rem;

  &:hover {
    background-color: rgb(255, 241, 240, 0.2);
    cursor: pointer;

    p {
      color: rgb(232, 67, 62);
    }
  }

  background-color: ${(props) => (props.isShow ? 'rgb(255,241,240,0.2)' : '')};
`;

const ProjectTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 1.25rem;
  margin-right: 1.25rem;
`;

const Title = styled.p<CommonStyleProps>`
  margin: 0;
  font-size: 1.5rem;
  color: ${(props) => (props.isShow ? 'rgb(232, 67, 62)' : '')};
`;

const Issue = styled.div`
  @media (max-width: 700px) {
    min-width: 5rem;
  }
  border: 1px solid rgb(232, 67, 62);
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
`;

const ProjectDesc = styled.div<CommonStyleProps>`
  display: flex;
  color: ${(props) => (props.isShow ? 'rgb(232, 67, 62)' : '')};
`;

const List = styled.div<CommonStyleProps>`
  display: ${(props) => (props.isShow ? 'block' : 'none')};
`;

const ListItem = styled.li`
  list-style: none;
  display: flex;
`;

interface IssueInfo {
  number: number;
  htmlUrl: string;
  title: string;
  comments: number
}

interface RepoInfo {
  description: string;
  star: number;
  watch: number;
  fork: number;
  issue:number;
}

export interface ContributeCardProps {
  repoName: string;
  issues: IssueInfo[];
  info: RepoInfo;
}

const ContributeCard: FC<ContributeCardProps> = (props) => {
  const { repoName, issues = [], info } = props;
  const [isShow, setIsShow] = useState(false);

  if (!repoName || !info) {
    return null;
  }
  return (
    <Card onClick={() => setIsShow(!isShow)} isShow={isShow}>
      <ProjectTitle>
        <Title isShow={isShow}>{repoName}</Title>
        <Issue>
          {issues.length}
          {' '}
          issues
        </Issue>
      </ProjectTitle>
      <div>{info.description}</div>
      <ProjectDesc isShow={isShow}>
        <div style={{ marginRight: '1rem' }}>
          Star:
          {info.star}
        </div>
        <div style={{ marginRight: '1rem' }}>
          Watch:
          {info.watch}
        </div>
        <div style={{ marginRight: '1rem' }}>
          Fork:
          {info.fork}
        </div>
      </ProjectDesc>
      <List isShow={isShow}>
        <ul style={{ paddingLeft: 0 }}>
          {issues.map((item) => (
            <ListItem key={item.number}>
              <div style={{ minWidth: '4rem' }}>
                #
                {item.number}
              </div>
              <a
                target="_blank"
                href={item.htmlUrl}
                style={{
                  flex: '1 1 auto',
                  textDecoration: 'none',
                  overflow: 'hidden',
                }}
                rel="noreferrer"
              >
                {item.title}
                {' '}
              </a>
              {item.comments > 0 ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <IconComment />
                  <div
                    style={{
                      marginLeft: '0.25rem',
                      fontSize: '0.5rem',
                      color: '#333',
                    }}
                  >
                    {item.comments}
                  </div>
                </div>
              ) : (
                ''
              )}
            </ListItem>
          ))}
        </ul>
      </List>
    </Card>
  );
};

export default ContributeCard;
