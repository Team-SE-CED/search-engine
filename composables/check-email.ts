export const useCheckEmail = async (email: string): Promise<Boolean> => {
  try {
    // Call the server-side API to check if the email exists
    const response = await fetch('api/post-email', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error fetching email check: ${response.statusText}`);
    }

    interface CheckEmailResponse {
      exists: boolean;
    }

    // Parse the JSON response body
    const data: CheckEmailResponse = await response.json();

    // Return whether the email exists
    return data.exists;
    
    
  } catch (error) {
    console.error('Error checking email:', error);
    return false; // Return false in case of an error, or handle error differently
  }
};
