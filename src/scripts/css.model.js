export default class CssModel {
  constructor() {
    this.css = require('../styles/index.scss').toString();
    this.classMap = this._makeClassMap();
    this.newCss = this._replaceClassesInCss();
  }
  
  _makeClassMap() {
    let classMap = {};
  
    window.webpackJsonp.forEach(e => {
      for (const key in e[1]) {
        const stringOfFunctionInKey = e[1][key].toString();
        const stringifiedChunkMap = stringOfFunctionInKey.match(/t\.locals={[^}]+}/gm)
      
        if (stringifiedChunkMap) {
          const finalChunkMap = this._parseChunkMap(stringifiedChunkMap[0].substr(9));
          Object.assign(classMap, finalChunkMap);
        }
      }
    })
  
    return classMap;
  }
  
  _parseChunkMap(stringifiedChunkMap) {
    const parsedChunkMap = eval('(' + stringifiedChunkMap + ')');
    
    for (const key in parsedChunkMap) {
      if (parsedChunkMap[key].includes(' ')) {
        const newValue = parsedChunkMap[key].split(' ').join('.');
        parsedChunkMap[key] = newValue;
      }
    }
    
    return parsedChunkMap;
  }
  
  _replaceClassesInCss() {
    let css = this.css;
    
    for (const key in this.classMap) {
      if (css.includes(key)) {
        const regex = new RegExp(`${key}\\b(?![\\w-])`, 'g')
        css = css.replace(regex, this.classMap[key]);
      }
    }
  
    return css;
  }
}