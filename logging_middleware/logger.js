const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzb25hc3Jpc3IuY3QyM0BiaXRzYXRoeS5hYy5pbiIsImV4cCI6MTc3ODIzMzU5MiwiaWF0IjoxNzc4MjMyNjkyLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNjg0OGY1ODUtNzA0Ny00MDg4LTlmNDctNjc4ODA4NjExMzA5IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoic29uYSBzcmkgcyByIiwic3ViIjoiMDYwYWRhMGMtYTAzYy00NjM2LTg3YjEtM2I3ODRiNDgyYjlmIn0sImVtYWlsIjoic29uYXNyaXNyLmN0MjNAYml0c2F0aHkuYWMuaW4iLCJuYW1lIjoic29uYSBzcmkgcyByIiwicm9sbE5vIjoiNzM3NjIzMmN0MTQ5IiwiYWNjZXNzQ29kZSI6InVLYUpmbSIsImNsaWVudElEIjoiMDYwYWRhMGMtYTAzYy00NjM2LTg3YjEtM2I3ODRiNDgyYjlmIiwiY2xpZW50U2VjcmV0IjoiZ3BIVWJuYkZSeEpXaGVzRCJ9.s834jKXyFBeVpcQQau3MiT0r-ExoPR80YPwbgujpvC0";
async function Log(stack, level, packageName, message) {
   
    const res = await fetch("http://4.224.186.213/evaluation-service/logs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + TOKEN
        },
        body: JSON.stringify({
            stack: stack,        
            level: level,        
            package: packageName,
            message: message
        })
    });
    const data = await res.json();
    console.log("Log sent:", data);
}