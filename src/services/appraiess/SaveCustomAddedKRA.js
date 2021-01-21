async function SaveCustomAddedKRA(empId, companyCode, userRole, templateId, shortDesc, longDesc, baseUrl) {
  
    const payload= {
        "loginDetails":
        {
          "LoginEmpID": empId,
          "loginEmpCompanyCodeNo": companyCode,
          "currentRole": userRole
        },
        "kra": {
          "UserId": empId,
          "TemplateId": templateId,
          "ShortDesc": shortDesc,
          "LongDesc": longDesc
        }
}

console.log("payload",payload);
    const formBody = JSON.stringify(payload, (key, value) => {
      if (value !== null) {
        return value;
      }
      return {};
    });
  
    const response = await fetch(`${baseUrl}/api/ObjectiveSetting/SaveCustomAddedKRA`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formBody,
    });
  
    const responseJson = await response.json();
  
    return responseJson;
  }
  
  export { SaveCustomAddedKRA };
  