import {html, render} from '/js/standalone.module.js';

/**
 * 客户端 jsx 组件渲染
 * @param {html} component 伪 jsx 组件
 * @param {*} data 到底到伪 jsx 组件的数据
 * @param {Element} target 目标位置
 * @param {string} position 渲染组件的插入位置 默认 beforeend （target元素内部的最后一个子元素） beforebegin （target元素的前面） afterbegin （target元素内部的第一个子元素） afterend （target元素后面）
 */
export default async ({component, data, target, position='beforeend'}) => {
  const box = document.createElement('div');
  component = component.call({html, render}, data);
  if (component instanceof Promise) component = await component;
  render(component, box);
  target.insertAdjacentHTML(position, box.innerHTML);
  box.remove;
}