import type { Dispatch, FC, SetStateAction } from 'react';
import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import useOutsideClick from '../hooks/useOutsideClick';

import IconInfo from '../assets/icons/info.svg';
import IconStar from '../assets/icons/star.svg';
import IconDocumentText from '../assets/icons/document-text.svg';
import IconDownload from '../assets/icons/download.svg';
import IconTriangle from '../assets/icons/triangle.svg';
import IconSquare from '../assets/icons/square.svg';
import IconHexagon from '../assets/icons/hexagon.svg';
import IconStarSolid from '../assets/icons/star-solid.svg';
import IconOctagon from '../assets/icons/octagon.svg';
import IconShield from '../assets/icons/shield.svg';

import repoInfoList from '../../../config/repos-info.json';

import type { ContributeCardProps } from './ContributeCard';

const Card = styled.div`
  border-radius: 0.75rem;
  border: 1px solid #eee;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03);
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  @media (max-width: 600px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

const LeftSide = styled.div`
  flex-shrink: 2;
  padding-left: 0.6rem;
`;

const Title = styled.a`
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
  &:hover {
    color: inherit;
    text-decoration: none;
    svg {
      transform: rotate(360deg);
    }
  }
`;

const Description = styled.div`
  font-size: 1.2rem;
  margin-top: 0px;
  @media (max-width: 600px) {
    margin-top: 6px;
  }
`;

const ShapeBeforeTitle = styled.span<{ color: string }>`
  margin-right: 12px;
  & svg {
    height: 1.75rem;
    color: ${(props) => props.color || 'var(--ifm-color-primary)'};
  }
  @media (max-width: 600px) {
    margin-right: 8px;
    & svg {
      height: 1.3rem;
    }
  }
`;

const LeftSideLinks = styled.div`
  display: inline-flex;
  font-size: 1rem;
  margin-top: 24px;
  & svg {
    height: 1rem;
    margin-right: 4px;
  }
`;

const LeftSideLink = styled.a`
  display: flex;
  align-items: center;
  margin-right: 18px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  color: inherit;
  &:hover {
    text-decoration: none;
  }
`;

const RightSide = styled.div`
  padding-left: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  flex-shrink: 0;
  @media (max-width: 600px) {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
    padding-left: 0;
  }
`;

const LTSCard = styled.div`
  margin-right: 1em;
  position: relative;
  display: flex;
`;

const ButtonCard = styled.div`
  margin-right: 0.3em;
  position: relative;
  display: flex;
`;

const ButtonRow = styled.div`
  inline-size: auto;
  display: flex;
`;

const Button = styled.button<{ background: string }>`
  padding: 12px 18px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 0.5rem;
  transition: all 0.3s;
  background: ${(props) => props.background || 'var(--ifm-color-primary)'};
  color: white;
  border: none;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    filter: brightness(105%);
  }
  svg {
    height: 22px;
    margin-right: 4px;
    padding-bottom: 2px;
  }
`;

const StyledDropdown = styled.div<{ open: boolean }>`
  top: 45px;
  right: 0;
  position: absolute;
  margin-top: 0.25rem;
  border-radius: 0.5rem;
  border: 1px solid #eee;
  z-index: 100;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  visibility: ${(props) => (props.open ? 'visitable' : 'hidden')};
`;

const DropdownItem = styled.a`
  margin: 0.4rem;
  padding: 0.2rem 1rem 0.2rem 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  display: block;
  color: inherit;
  &:hover {
    color: inherit;
    text-decoration: none;
  }
`;
const VersionInfo = styled.div`
  text-align: right;
  font-size: 0.9rem;
  span {
    font-weight: 500;
  }
  @media (max-width: 600px) {
    margin-bottom: 1rem;
    text-align: left;
  }
`;

interface DropdownProps {
  isDropdownOpen: boolean;
  setIsDropdownOpen: Dispatch<SetStateAction<boolean>>;
}

const Dropdown: FC<DropdownProps> = (props) => {
  const ref = useRef();
  const { isDropdownOpen, setIsDropdownOpen, children } = props;
  useOutsideClick(ref, () => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  });
  return (
    <StyledDropdown
      className="downloads-dropdown"
      ref={ref}
      open={isDropdownOpen}
    >
      {children}
    </StyledDropdown>
  );
};

interface LTSDropdownProps {
  isLTSDropdownOpen: boolean;
  setIsLTSDropdownOpen: Dispatch<SetStateAction<boolean>>;
}

const LTSDropdown: FC<LTSDropdownProps> = (props) => {
  const ref = useRef();
  const { isLTSDropdownOpen, setIsLTSDropdownOpen, children } = props;
  useOutsideClick(ref, () => {
    if (isLTSDropdownOpen) {
      setIsLTSDropdownOpen(false);
    }
  });
  return (
    <StyledDropdown
      className="downloads-dropdown"
      ref={ref}
      open={isLTSDropdownOpen}
    >
      {children}
    </StyledDropdown>
  );
};

const shapeComponentMap = {
  triangle: <IconTriangle />,
  square: <IconSquare />,
  hexagon: <IconHexagon />,
  star: <IconStarSolid />,
  shield: <IconShield />,
  octagon: <IconOctagon />,
};

interface LTSButtonProps extends LTSDropdownProps {
  name: string;
  color: string;
  LTSVersion: string;
}

const LTSButton: FC<LTSButtonProps> = (props) => {
  const {
    name, setIsLTSDropdownOpen, isLTSDropdownOpen, color, LTSVersion,
  } = props;
  return (
    <Button
      style={{ display: name === 'APISIX®' ? ' ' : 'NONE' }}
      onClick={() => setIsLTSDropdownOpen(!isLTSDropdownOpen)}
      background={color}
    >
      <IconDownload />
      {' '}
      {`${LTSVersion} LTS`}
    </Button>
  );
};

export interface DownloadInfo {
  name: string;
  description: string;
  shape: string;
  color: string;
  githubRepo: string;
  githubBranch: string;
  downloadPath: string;
  dockerhubPath: string;
  version: string;
  releaseDate: string;
  firstDocPath: string;
  LTSDownloadPath?: string;
  LTSVersion?: string;
}

interface ProjectCardProps extends Omit<DownloadInfo, 'firstDocPath'> {
}

const ProjectCard: FC<ProjectCardProps> = (props) => {
  const [isLTSDropdownOpen, setIsLTSDropdownOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const {
    name,
    description,
    shape,
    color,
    version,
    releaseDate,
    githubRepo,
    githubBranch,
    downloadPath,
    dockerhubPath,
    LTSDownloadPath = ' ',
    LTSVersion,
  } = props;

  const Download = name === 'APISIX®' ? `${version} Current` : 'Download';
  const repoInfo = repoInfoList[githubRepo] as Omit<ContributeCardProps, 'repoName'>;

  return (
    <Card>
      <LeftSide>
        <Title href={`https://github.com/${githubRepo}`} target="_blank">
          <ShapeBeforeTitle color={color}>{shapeComponentMap[shape]}</ShapeBeforeTitle>
          {name}
        </Title>
        <Description className="downloads-subtitle">{description}</Description>
        <LeftSideLinks className="downloads-leftsidelinks">
          <LeftSideLink
            className="downloads-leftsidelink"
            href={`https://github.com/${githubRepo}`}
            target="_blank"
            title="Stars"
          >
            <IconStar />
            {' '}
            {repoInfo?.info?.star ?? ' - '}
          </LeftSideLink>
          <LeftSideLink
            className="downloads-leftsidelink"
            href={`https://github.com/${githubRepo}/issues`}
            target="_blank"
            title="Issues"
          >
            <IconInfo />
            {' '}
            {repoInfo?.info?.issue ?? ' - '}
          </LeftSideLink>
          <LeftSideLink
            className="downloads-leftsidelink"
            href={`https://github.com/${githubRepo}/blob/${githubBranch}/CHANGELOG.md`}
            target="_blank"
          >
            <IconDocumentText />
            {' '}
            CHANGELOG
          </LeftSideLink>
        </LeftSideLinks>
      </LeftSide>
      <RightSide>
        <VersionInfo className="downloads-versioninfo">
          Latest Version ·
          {' '}
          <span className="downloads-versioninfo-span">{version}</span>
          <br />
          Release Date ·
          {' '}
          <span className="downloads-versioninfo-span">{releaseDate}</span>
        </VersionInfo>

        <ButtonRow>
          <LTSCard>
            <LTSButton
              name={name}
              color={color}
              LTSVersion={LTSVersion}
              isLTSDropdownOpen={isLTSDropdownOpen}
              setIsLTSDropdownOpen={setIsLTSDropdownOpen}
            />
            <LTSDropdown
              isLTSDropdownOpen={isLTSDropdownOpen}
              setIsLTSDropdownOpen={setIsLTSDropdownOpen}
            >
              <DropdownItem
                className="download-dropdown-item"
                href={`https://www.apache.org/dyn/closer.cgi/${LTSDownloadPath}.tgz`}
                target="_blank"
              >
                Source
              </DropdownItem>
              <DropdownItem
                className="download-dropdown-item"
                href={`https://downloads.apache.org/${LTSDownloadPath}.tgz.asc`}
                target="_blank"
              >
                ASC
              </DropdownItem>
              <DropdownItem
                className="download-dropdown-item"
                href={`https://downloads.apache.org/${LTSDownloadPath}.tgz.sha512`}
                target="_blank"
              >
                SHA512
              </DropdownItem>
            </LTSDropdown>
          </LTSCard>
          <ButtonCard>
            <Button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              background={color}
            >
              <IconDownload />
              {' '}
              {Download}
            </Button>
            <Dropdown
              isDropdownOpen={isDropdownOpen}
              setIsDropdownOpen={setIsDropdownOpen}
            >
              {dockerhubPath ? (
                <DropdownItem
                  className="download-dropdown-item"
                  href={`https://hub.docker.com/r/apache/${dockerhubPath}`}
                  target="_blank"
                >
                  DockerHub
                </DropdownItem>
              ) : null}
              <DropdownItem
                className="download-dropdown-item"
                href={`https://www.apache.org/dyn/closer.cgi/${downloadPath}.tgz`}
                target="_blank"
              >
                Source
              </DropdownItem>
              <DropdownItem
                className="download-dropdown-item"
                href={`https://downloads.apache.org/${downloadPath}.tgz.asc`}
                target="_blank"
              >
                ASC
              </DropdownItem>
              <DropdownItem
                className="download-dropdown-item"
                href={`https://downloads.apache.org/${downloadPath}.tgz.sha512`}
                target="_blank"
              >
                SHA512
              </DropdownItem>
            </Dropdown>
          </ButtonCard>
        </ButtonRow>
      </RightSide>
    </Card>
  );
};

export default ProjectCard;
