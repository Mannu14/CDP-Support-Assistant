import Fuse from 'fuse.js';
import { cdpDocs } from '../data/cdpDocs';
import { SearchResult } from '../types';

const fuse = new Fuse(cdpDocs, {
  keys: ['content'],
  includeScore: true,
  threshold: 0.4,
});

export const searchDocs = (query: string): SearchResult[] => {
  const results = fuse.search(query);
  return results.map(result => ({
    platform: result.item.platform,
    content: result.item.content,
    score: result.score || 1,
    url: result.item.url
  }));
};

export const generateResponse = (query: string): string => {
  const results = searchDocs(query);
  
  if (results.length === 0) {
    return "I apologize, but I couldn't find specific information about that. Could you please rephrase your question or ask about a different CDP-related topic?";
  }

  const bestMatch = results[0];
  
  if (!query.toLowerCase().includes('cdp') && 
      !query.toLowerCase().includes('segment') && 
      !query.toLowerCase().includes('mparticle') && 
      !query.toLowerCase().includes('lytics') && 
      !query.toLowerCase().includes('zeotap')) {
    return "I can only answer questions related to CDPs (Segment, mParticle, Lytics, and Zeotap). Please ask a CDP-related question.";
  }

  const sections = bestMatch.content.split('\n\n');
  const relevantSection = sections.find(section => 
    section.toLowerCase().includes(query.toLowerCase())
  ) || sections[0];

  return `Here's what I found from ${bestMatch.platform}'s documentation:\n\n${relevantSection}\n\nFor more details, you can check the official documentation at ${bestMatch.url}`;
};