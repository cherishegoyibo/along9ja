

export const checkSession = async () => {
    try {
      const sessionData = localStorage.getItem("userSession");
      if (sessionData) {
        return JSON.parse(sessionData);
      }
      const response = await fetch("https://along9ja.onrender.com/session", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch session");
      }
      const data = await response.json();
      localStorage.setItem("userSession", JSON.stringify(data));
      console.log( "logtgg",data);
      return data;
      // Return session info (e.g., isLoggedIn, user)
    } catch (err) {
      console.error("Session Check Error:", err);
      return null; // Return null if there's an error
    }
  };


export default checkSession; 