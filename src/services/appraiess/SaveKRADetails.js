async function SaveKRADetails(EmpID, companyCode, userRole, timesheetJsonData, baseUrl) {

    const payload = {
        "loginDetails":
        {
          "loginEmpID": EmpID,
          "loginEmpCompanyCodeNo": companyCode,
          "currentRole":userRole
        },
        "kra": timesheetJsonData
}
    const formBody = JSON.stringify(payload, (key, value) => {
      if (value !== null) {
        return value;
      }
      return {};
    });
  
    const response = await fetch(`${baseUrl}/api/ObjectiveSetting/SaveKRADetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formBody,
    });
  
    const responseJson =  await response.json();
  console.log("jsonn",responseJson );
    return responseJson;
  }
  
  export { SaveKRADetails };