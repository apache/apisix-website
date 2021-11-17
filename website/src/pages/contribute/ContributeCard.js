import React, { useState, useEffect } from "react";
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
    background-color: ${(props) => (props.isShow ? "rgb(255,241,240,0.2)" : "")}
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
  color: ${(props) => (props.isShow ? "rgb(232, 67, 62)" : "")}
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
    color: ${(props) => (props.isShow ? "rgb(232, 67, 62)" : "")}
`;
const List = styled.div`
    display: ${(props) => (props.isShow ? "block" : "none")};
`;



const ContributeCard = () => {
    const [isShow, setIsShow] = useState(false);
    const [repoList, setRepoList] = useState([]);

    useEffect(() => {
        getGitHubRepoInfo('apache/apisix').then((result) => {
            const goodFisrtIssues = []
            for (let i = 0; i < result.length; i++) {
                let res = result[i];
                let labels = res.labels
                if (labels.length > 0) {
                    for (let j = 0; j < labels.length; j++) {
                        if (labels[j].name === 'good first issue') {
                            goodFisrtIssues.push(res)
                        }
                    }
                }
            }
            setRepoList(goodFisrtIssues)
        });
    }, []);

    return (
        <Card >
            <div onClick={() => setIsShow(!isShow)} isShow={isShow}>
                <ProjectTitle>
                    <Title isShow={isShow}>apache/apisix</Title>
                    <Issue isShow={isShow}><IssueNum>18</IssueNum> issues</Issue>
                </ProjectTitle>
                <ProjectIntro>The Cloud-Native API Gateway</ProjectIntro>
                <ProjectDesc isShow={isShow}>lang: Lua stars: 7.4k</ProjectDesc>
            </div>
            <List isShow={isShow}>
                <ul>
                    {repoList.map(item => (
                        <li key={item.number}>#{item.number} {item.title}</li>
                    ))}
                </ul></List>
        </Card>
    );
};

const getGitHubRepoInfo = (repo) => {
    return fetch(`https://api.github.com/repos/${repo}/issues?state=open&per_page=100`, {
        headers: {
            "content-type": "application/json",
            Accept: "application / vnd.github.v3 + json",
        },
    }).then((response) => response.json()
    );
};

export default ContributeCard;