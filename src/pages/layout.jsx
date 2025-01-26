

export const checkSession = async () => {
    try {
      const response = await fetch("http://localhost:5480/session", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch session");
      }
      const data = await response.json();
      return data; // Return session info (e.g., isLoggedIn, user)
    } catch (err) {
      console.error("Session Check Error:", err);
      return null; // Return null if there's an error
    }
  };


export default checkSession; 