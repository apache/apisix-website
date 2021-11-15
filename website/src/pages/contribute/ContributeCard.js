import React from "react";
import styled from "styled-components";


const Card = styled.div`
    width: 50%;
    border: 1px solid rgb(232, 67, 62);
    border-radius: 5px;
    padding: 0.75rem 1.25rem;

    &:hover {
        background-color: rgb(255,241,240,0.2);
        cursor: pointer;
        a{
            color: rgb(232, 67, 62);
        }
    }
`;

const ProjectTitle = styled.div`
    display:flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 1.25 rem;
    margin-right: 1.25 rem;
`;
const Title = styled.a`
  display: block;
  font-size: 1.5rem;
`;
const Issue = styled.div`
    border: 1px solid rgb(232, 67, 62);
    border-radius: 50px;
    padding: 0.25rem 0.5rem;
    font-size: .875rem;
`;
const IssueNum = styled.span`
`;

const ProjectIntro = styled.div`
`;
const ProjectDesc = styled.div`
`;


const ContributeCard = () => {

    return (
        <Card>
            <ProjectTitle>
                <Title>apache/apisix</Title>
                <Issue><IssueNum>18</IssueNum> issues</Issue>
            </ProjectTitle>
            <ProjectIntro>The Cloud-Native API Gateway</ProjectIntro>
            <ProjectDesc>lang: Lua stars: 7.4k</ProjectDesc>
        </Card>
    );
};

export default ContributeCard;