import { BlockQuoteDefinition, ParagraphDefinition } from '@uidu/adf-schema';

export const blockQuote = (
  ...content: Array<ParagraphDefinition>
): BlockQuoteDefinition => ({
  type: 'blockquote',
  content,
});
