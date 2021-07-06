//Делаем карту объектом и меняем формат селекторов на соответствующий CSS
const parseChunkMap = (chunkMap) => {
  const parsedChunkMap = eval('(' + chunkMap + ')');
  
  for (const key in parsedChunkMap) {
    if (parsedChunkMap[key].includes(' ')) {
      const newValue = parsedChunkMap[key].split(' ').join('.');
      parsedChunkMap[key] = newValue;
    }
  }
  return parsedChunkMap;
}

//Проходим по webpackJsonp, в каждом элементе
//проверяем каждую функцию на наличие карты.
//Если карта есть, то модифицируем её и добавляем в общую карту.
export const makeClassMap = () => {
  let classMap = {};
  
  window.webpackJsonp.forEach(e => {
    for (const key in e[1]) {
      const stringOfFunctionInKey = e[1][key].toString();
      const stringifiedChunkMap = stringOfFunctionInKey.match(/t\.locals={[^}]+}/gm)
      
      if (stringifiedChunkMap) {
        const finalChunkMap = parseChunkMap(stringifiedChunkMap[0].substr(9));
        Object.assign(classMap, finalChunkMap);
      }
    }
  })
  
  return classMap;
}