
async function FetchKRADetails(empId, companyCode, userRole, formid, templateId, baseUrl) {
  
    const payload= {
        "loginDetails":
        {
          "LoginEmpID": empId,
          "loginEmpCompanyCodeNo": companyCode,
          "currentRole": userRole
        },
        "kra": {
          "UserId": empId,
          "Formid": formid,
          "TemplateId": templateId
        }
}
console.log(payload);

    const formBody = JSON.stringify(payload, (key, value) => {
      if (value !== null) {
        return value;
      }
      return {};
    });
  
    const response = await fetch(`${baseUrl}/api/ObjectiveSetting/FetchKRADetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formBody,
    });
  
    const responseJson = await response.json();
  
    return responseJson;
  }
  
  export { FetchKRADetails };
  