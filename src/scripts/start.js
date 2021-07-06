import { makeClassMap } from './makeClassMap';
import { replaceClassesInCss } from './replaceClassesInCss';
import {injectCss} from './injectCss';

const initialCss = require('../styles/old.css').toString();

export const start = () => {
  window.onload = () => {
    const classMap = makeClassMap(['1375', '1379', '1381', '1383']);
    const modifiedCss = replaceClassesInCss(initialCss, classMap);
    injectCss(modifiedCss);
  }
}