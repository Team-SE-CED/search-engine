import type { Paper } from "~/types/research-paper-server";

export const usePapersByAbstract = () => {
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const papers = ref<Paper[]>([]);

  const getPapersByAbstract = async (query: string) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch('/api/get-abstract?=' + + encodeURIComponent(query));
      if (!response.ok) {
        const errorMessage = `API responded with status: ${response.status} - ${response.statusText}`;
        throw new Error(errorMessage);
      }
      papers.value = await response.json();
      return papers.value;
      
    } catch (err) {
      console.error('Error fetching papers:', err);
      error.value = 'Failed to fetch papers';
      return [];
    } finally {
      loading.value = false;
      return [];
    }
  };

  return {
    papers,
    loading,
    error,
    getPapersByAbstract,
  };
};