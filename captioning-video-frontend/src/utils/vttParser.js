import { WebVTTParser } from 'webvtt-parser';

export const parseWebVTT = (vttText) => {
  const parser = new WebVTTParser();
  const tree = parser.parse(vttText);
  
  const captions = tree.cues.map(cue => ({
    start: cue.startTime,
    end: cue.endTime,
    text: cue.text
  }));
  
  return captions;
};