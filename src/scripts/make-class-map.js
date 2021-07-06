//Поиск объектов с нужным нам текстом в window.webpackJsonp, лучше полностью поменять механизм поиска
const findChunk = (chunkNumber) => {
  let string = null;
  
  window.webpackJsonp.forEach(e => {
    if (e[1].hasOwnProperty(chunkNumber)) {
      string = e[1][chunkNumber].toString();
    }
  })
  
  return string;
}

//Ищем карты, вычленяем их из текста функций, меняем их значения на подходящие для CSS-селекторов, объединяем в одну
export const makeClassMap = (chunkNumbers) => {
  let map = {};
  chunkNumbers.forEach(chunk => {
    const neededChunk = findChunk(chunk);
    const invertedChunkMap = neededChunk.match(/t\.locals={[^}]+}/gm)[0].substr(9);
    const chunkMap = eval('(' + invertedChunkMap + ')');
    for (const key in chunkMap) {
      if (chunkMap[key].includes(' ')) {
        const newValue = chunkMap[key].split(' ').join('.');
        chunkMap[key] = newValue;
      }
    }
    Object.assign(map, chunkMap);
  })
  
  return map;
}