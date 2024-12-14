import { fetchPapersByAbstract } from '@/server/services/paperAbstract.service';


// Define the API endpoint
export default defineEventHandler(async (event) => {
  const query = (getQuery(event).search as string)?.toLowerCase() || '';

  try {
    const papers = await fetchPapersByAbstract(query);
    return papers;
  } catch (error) {
    console.error('Error in the papers endpoint:', error);
    throw new Error('Internal server error');
  }
});