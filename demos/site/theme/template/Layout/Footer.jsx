import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Modal, Icon } from 'antd';
import { isLocalStorageNameSupported } from '../utils';

class Footer extends React.Component {
  render() {
    return (
      <footer id="footer">
        <div className="outer" style={{height: 10}}>
          <div className="visit" style={{textAlign: "center"}}>
            <span id="busuanzi_container_site_pv" style={{ display: "none" }}>
              <span id="site-visit" >本站到访数:
                <span id="busuanzi_value_site_uv"></span>
              </span>
            </span>
            <span id="busuanzi_container_page_pv" style={{ display: "none" }}>
              <span id="page-visit">, 本页阅读量:
                <span id="busuanzi_value_page_pv"></span>
              </span>
            </span>
          </div>
        </div>
        <ul>
          <li>
            <h2><Icon type="github" /> GitHub</h2>

          </li>
          <li>
            <h2><Icon type="link" /> <FormattedMessage id="app.footer.links" /></h2>
          </li>
          <li>
            <h2><Icon type="customer-service" /> <FormattedMessage id="app.footer.community" /></h2>
          </li>
          <li>
            <h2>Copyright © {new Date().getFullYear()}</h2>
          </li>
        </ul>
      </footer>
    );
  }
}

export default injectIntl(Footer);
