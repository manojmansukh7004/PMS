
async function GetEmpDetails(payload, baseUrl) {
    
      const formBody = JSON.stringify(payload, (key, value) => {
        if (value !== null) {      
          return value;
        }
        return {};
      });
    
      const response = await fetch(`${baseUrl}/api/empdetails/GetEmpDetails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: formBody,
      });
      
      const responseJson = await response.json();
      
      return responseJson;
    }
    
    export { GetEmpDetails };
    