
async function GetTemplates(empId, companyCode, userRole, baseUrl) {
  
    const payload = {
        "loginDetails":
        {
          "LoginEmpID": empId,
          "loginEmpCompanyCodeNo": companyCode,
          "currentRole": userRole
        },
        "data": {
          "EmpId": empId,
          "EmpCompanyCodeNo":companyCode
        }
}

    const formBody = JSON.stringify(payload, (key, value) => {
      if (value !== null) {
        return value;
      }
      return {};
    });
  
    const response = await fetch(`${baseUrl}/api/template/GetTemplates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formBody,
    });
  
    const responseJson = await response.json();
  
    return responseJson;
  }
  
  export { GetTemplates };
  