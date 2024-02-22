import type { FC } from 'react';
import React, { useCallback, useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import '../css/edit.scss';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const Edit: FC = () => {
  const [pathExist, setPathExist] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();
  const title = currentLocale.startsWith('en') ? 'Before editing docs' : '编辑文档前';

  const getPath = () => window.location.hash.slice(1);

  useEffect(() => {
    const path = getPath();

    setIsLoading(true);
    fetch(path.replace('github.com', 'raw.githubusercontent.com').replace('/edit', ''))
      .then((res) => setPathExist(res.status !== 404))
      .finally(() => setIsLoading(false));
  }, []);

  const edit = useCallback(() => {
    let path = getPath();
    if (!pathExist) {
      const pathArr = path.replace('edit', 'new').split('/');
      pathArr[pathArr.length - 1] = `?filename=${pathArr.at(-1)}`;
      path = pathArr.join('/');
    }
    window.location.replace(path);
  }, [pathExist]);

  return (
    <Layout>
      <Head>
        <meta
          name="twitter:title"
          content={`${title} - Apache APISIX® - Cloud-Native API Gateway`}
        />
        <meta
          name="twitter:description"
          content="Apache APISIX is a dynamic, real-time, high-performance Cloud-Native API gateway, based on the Nginx library and etcd."
        />
        <meta name="twitter:site" content="@apacheapisix" />
        <meta
          name="og:description"
          content="Apache APISIX is a dynamic, real-time, high-performance Cloud-Native API gateway, based on the Nginx library and etcd."
        />
      </Head>
      {!isLoading && (
        <div className="page">
          <h1 className="page-title">{title}</h1>
          {currentLocale.startsWith('en') && (
            <>
              <p>
                First, thank you for your willingness to contribute to the documentation of Apache
                APISIX and affiliated projects.
              </p>
              <p>
                But before you begin, please have a look and understand the
                {' '}
                <Link
                  style={{
                    color: `var(--color-primary)`,
                  }}
                  href="https://apisix.apache.org/docs/general/documentation-style-guide/"
                >
                  Documentation Style Guide
                </Link>
                {' '}
                to help you complete your contribution more efficiently and seamlessly.
              </p>
              {!pathExist && (
                <>
                  {' '}
                  <p>
                    ...But, We could not find what you were looking for. If you find the doc exist,
                    and this link should not be broken, please
                    {' '}
                    <Link
                      href="https://github.com/apache/apisix-website/issues/new/choose"
                      target="_blank"
                      rel="noreferrer"
                    >
                      submit an Issue
                    </Link>
                    .
                  </p>
                </>
              )}
              <p>
                {pathExist
                  ? 'When you are ready, click the button below to start editing the document.'
                  : 'You can also still try to edit the document by click the below button.'}
              </p>
              <button className="edit-btn" type="button" onClick={edit}>
                Let&apos;s start editing
              </button>
            </>
          )}
          {currentLocale.startsWith('zh') && (
            <>
              <p>首先，感谢您愿意向 Apache APISIX 及其相关项目贡献文档。</p>
              <p>
                但在开始之前，请先阅读并充分理解
                {' '}
                <Link href="https://apisix.apache.org/docs/general/documentation-style-guide/">
                  Documentation Style Guide
                </Link>
                {' '}
                来帮助您快速了解如何贡献文档。
              </p>
              {!pathExist && (
                <>
                  {' '}
                  <p>
                    然而，我们现在无法找到这篇文档，一般情况下，这是因为英文文档尚未被翻译为对应的中文文档。
                  </p>
                  <p>
                    如果您在检查后发现该链接对应的文档已经存在，请向 APISIX Website
                    {' '}
                    <Link
                      href="https://github.com/apache/apisix-website/issues/new/choose"
                      target="_blank"
                      rel="noreferrer"
                    >
                      提交 Issue
                    </Link>
                    。
                  </p>
                </>
              )}
              <p>
                {pathExist
                  ? '当您准备完成后，单击下方按钮，以开始编辑文档。'
                  : '如果不存在，欢迎您点击下方按钮，向 Apache APISIX 社区贡献英文对应的中文文档。或者您也可以先尝试编辑英文文档。'}
              </p>
              <button className="edit-btn" type="button" onClick={edit}>
                {pathExist ? '开始编辑' : '创建翻译'}
              </button>
            </>
          )}
        </div>
      )}
    </Layout>
  );
};

export default Edit;
