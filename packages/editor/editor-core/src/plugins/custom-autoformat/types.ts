import { Node as ProsemirrorNode } from 'prosemirror-model';

export {
  AutoformatHandler,
  AutoformatReplacement,
  AutoformatRuleset as Ruleset,
  AutoformattingProvider,
} from '@uidu/editor-common/provider-factory';

export type AutoformatCandidate = {
  start: number;
  end: number;
  match: string[];
};

export type AutoformatMatch = {
  matchString: string;
  replacement?: ProsemirrorNode;
};

export type CustomAutoformatState = {
  resolving: Array<AutoformatCandidate>;
  matches: Array<AutoformatMatch>;
};

// actions
export type CustomAutoformatMatched = {
  action: 'matched';
  start: number;
  end: number;
  match: string[];
};

export type CustomAutoformatResolved = {
  action: 'resolved';
  matchString: string;
  replacement?: ProsemirrorNode;
};

export type CustomAutoformatFinish = {
  action: 'finish';
  matchString: string;
};

export type CustomAutoformatAction =
  | CustomAutoformatMatched
  | CustomAutoformatResolved
  | CustomAutoformatFinish;
