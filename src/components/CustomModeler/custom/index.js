import CustomPalette from './pallete';
import CustomRenderer from './renderer';
import CustomContextPadProvider from './contextPadProvider';

export default {
  __init__: ['paletteProvider', 'customRenderer', 'contextPadProvider'],
  paletteProvider: ['type', CustomPalette],
  customRenderer: ['type', CustomRenderer],
  contextPadProvider: ['type', CustomContextPadProvider],
};
