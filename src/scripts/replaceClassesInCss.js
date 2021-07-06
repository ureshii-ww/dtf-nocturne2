export const replaceClassesInCss = (css, classMap) => {
  for (const key in classMap) {
    if (css.includes(key)) {
      const regex = new RegExp(key, 'g')
      css = css.replace(regex, classMap[key]);
    }
  }
  console.log(css);
  return css;
}