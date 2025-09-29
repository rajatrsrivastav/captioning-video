export const parseWebVTT = (vttText) => {
  const lines = vttText.split('\n');
  const captions = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.includes('-->')) {
      const [startTime, endTime] = line.split(' --> ');
      const text = lines[i + 1]?.trim();
      
      if (text) {
        captions.push({
          start: parseTime(startTime),
          end: parseTime(endTime),
          text: text
        });
      }
    }
  }
  
  return captions;
};

const parseTime = (timeStr) => {
  const [hours, minutes, seconds] = timeStr.split(':');
  return parseFloat(hours) * 3600 + parseFloat(minutes) * 60 + parseFloat(seconds);
};