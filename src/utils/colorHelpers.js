import chroma from 'chroma-js';

const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const generatePalette = (starterPalette) => {
  let newPalette = { ...starterPalette, colors: {} };

  levels.forEach((level) => {
    newPalette.colors[level] = [];
  })

  starterPalette.colors.forEach(colorArr => {
    let scale = generateScale(colorArr.color, 10).reverse();
    scale.forEach((value, i) => {
      newPalette.colors[levels[i]].push({
        name: `${colorArr.name} ${levels[i]}`,
        id: colorArr.name.toLowerCase().replace(/ /g, '-'),
        hex: value,
        rgb: chroma(value).css(),
        rgba: chroma(value).css("rgba")
      })
    })
  })

  return newPalette;
}

// Return Range of Color [darker - inputcolor - white]
const getRange = (hexColor) => {
  const darkenHex = chroma(hexColor).darken(1.4).hex();
  const end ='#fff';
  return [darkenHex, hexColor, end];
}

const generateScale = (hexColor, numberOfColors) => {
  return chroma
    .scale(getRange(hexColor))
    .mode("lab")
    .colors(numberOfColors)
}

export { generatePalette };