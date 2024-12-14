import { supabase } from "../db/supabaseClient";

interface Paper {
    title: string;
    abstract: string;
  };
  
export const fetchPapersByAbstract = async (query: string): Promise<Paper[]> => {
    try {
      // Query Supabase for papers based on abstract
      const { data, error } = await supabase
        .from("research_papers") // 'papers' is the table name in Supabase
        .select('title, abstract')
        .ilike('abstract', `%${query}%`); // Using ilike for case-insensitive matching
  
      if (error) {
        console.error('Error fetching papers:', error);
        throw new Error('Failed to fetch papers');
      }
      return data || [];
    } catch (error) {
      console.error('Error in the papers service:', error);
      throw new Error('Internal server error');
    }
  };