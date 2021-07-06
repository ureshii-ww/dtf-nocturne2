import { makeClassMap } from './make-class-map';
import { replaceClassesInCss } from './replace-classes-in-css';
import { injectCss } from './inject-css';
import { createPlaceholder, destroyPlaceholder } from './placeholder';

const initialCss = require('../styles/index.scss').toString();

export const start = () => {
  //createPlaceholder();
  window.onload = () => {
    const classMap = makeClassMap(['1376', '1380', '1382', '1384']);
    const modifiedCss = replaceClassesInCss(initialCss, classMap);
    injectCss(modifiedCss);
    //destroyPlaceholder();
  }
}