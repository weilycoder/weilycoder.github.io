---
title: monaco-editor-test
mathjax: true
date: 2025-08-24 14:00:08
categories:
  - project
tags:
  - theme
---

{% editor javascript hc-black %}
/* global hexo */

'use strict';

function render(data) {
    return hexo.render.renderSync({ text: data, engine: 'markdown' });
}

hexo.extend.tag.register('hide', (args) => {
    let content = ''
    args.forEach((item) => {
        content += ' ' + item
    });
    return `<span class="hide"><object>${render(content.slice(1)).trim()}</object></span>`;
})
{% endeditor %}
