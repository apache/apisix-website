/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc) {
    const baseUrl = this.props.config.baseUrl;
    const docsUrl = this.props.config.docsUrl;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    return `${baseUrl}${docsPart}${doc}`;
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>ASF</h5>
            <a href="https://www.apache.org/security/">Security</a>
            <a href="https://www.apache.org/">Foundation</a>
            <a href="https://www.apache.org/licenses/">LICENSES</a>
            {/* <a href="https://apachecon.com/?ref=apisix.apache.org">ApacheCon</a>
            <a href="https://www.apache.org/foundation/sponsorship.html">Sponsorship</a>
            <a href="https://www.apache.org/foundation/thanks.html">Thanks</a> */}
          </div>
          <div>
            <h5>Community</h5>
            <a href={`${this.props.config.baseUrl}users`}>User Showcase</a>
            <a
              href="https://github.com/apache/apisix/issues"
              target="_blank"
              rel="noreferrer noopener">
              Issues
            </a>
            <a
              href="https://twitter.com/ApacheAPISIX"
              target="_blank"
              rel="noreferrer noopener">
              Twitter
            </a>
          </div>
          <div>
            <h5>More</h5>
            <a href={`${this.props.config.baseUrl}blog`}>Blog</a>
            <a href="https://github.com/">GitHub</a>
            <a
              className="github-button"
              href={this.props.config.repoUrl}
              data-icon="octicon-star"
              data-count-href="/facebook/docusaurus/stargazers"
              data-show-count="true"
              data-count-aria-label="# stargazers on GitHub"
              aria-label="Star this project on GitHub">
              Star
            </a>
            {this.props.config.twitterUsername && (
              <div className="social">
                <a
                  href={`https://twitter.com/${this.props.config.twitterUsername}`}
                  className="twitter-follow-button">
                  Follow @{this.props.config.twitterUsername}
                </a>
              </div>
            )}
            {this.props.config.facebookAppId && (
              <div className="social">
                <div
                  className="fb-like"
                  data-href={this.props.config.url}
                  data-colorscheme="dark"
                  data-layout="standard"
                  data-share="true"
                  data-width="225"
                  data-show-faces="false"
                />
              </div>
            )}
          </div>
        </section>

        <a
          href="https://www.apache.org/"
          target="_blank"
          rel="noreferrer noopener"
          style={{
            display: 'block',
            margin: '1em auto',
            opacity: 0.8,
            transition: 'opacity 0.15s ease-in-out',
            textAlign: 'center'
          }}
        >
          <img
            src={`${this.props.config.baseUrl}img/asf_logo_wide_small.png`}
            alt="Apache Software Foundation"
            style={{width: 370, height: 64}}
          />
        </a>
        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
