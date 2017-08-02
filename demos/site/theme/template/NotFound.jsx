import React from 'react';
import { Link } from 'bisheng/router';
import * as utils from './utils';

export default function NotFound({ location }) {
  return (
    <div id="page-404">
      <section>
        <h1>404</h1>
        <p>
          你要找的页面不存在
          <a href="/">返回主页</a>
        </p>
      </section>
      <style
        dangerouslySetInnerHTML={{
          __html: '#react-content { height: 100%; background-color: #fff }',
        }}
      />
    </div>
  );
}
