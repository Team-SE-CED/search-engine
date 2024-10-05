export function checkEmail() {
  async function postEmail(email: string) {
    let errorMessage = '';
    
    // get email
    const response = await fetch("/api/post-email", {
      method: "post",
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    // if email exist, show error message
    if(data.exists) {
      errorMessage = 'Email already exists';
      return { error: errorMessage };
    }
    // Success! Redirect user or show success message
  
  }
  return { postEmail };
}
