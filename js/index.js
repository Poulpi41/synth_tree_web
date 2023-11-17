import {createTree} from './models/Tree.js';
import {ProxyDQMJ2} from './models/Proxies.js';

const proxy = new ProxyDQMJ2();

let tmp = createTree(proxy, "abyss diver", 5)

const body = document.querySelector("body");
body.innerHTML = tmp.toHtml();
window.addEventListener('DOMContentLoaded', function() {
});