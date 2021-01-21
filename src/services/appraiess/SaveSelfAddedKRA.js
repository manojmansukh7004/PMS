
async function SaveSelfAddedKRA(empId, companyCode, userRole, TemplateID, FormId, AppraisalEndDate, Weightage, YearlyTarget, AspectId,  KRAId, UOMId, TargetDate, baseUrl) {
                                                                        // formId, endDate, data.weightage, data.target, data.aspect, data.kra, data.measure, data.targetDate,
    const payload= {
        "loginDetails":
        {
          "LoginEmpID": empId,
          "loginEmpCompanyCodeNo": companyCode,
          "currentRole": userRole
        },
        "kra": {
          "UserID": empId,
          "TemplateID": TemplateID,
          "FormId": FormId,
          "AppraisalEndDate": AppraisalEndDate,
          "Weightage": Weightage,
          "YearlyTarget": YearlyTarget,
          "KRAId": KRAId,
          "AspectId": AspectId,
          "UOMId": UOMId,
          "TargetDate": TargetDate    
        }
}
console.log("fffffffff",payload);
    const formBody = JSON.stringify(payload, (key, value) => {
      if (value !== null) {
        return value;
      }
      return {};
    });
  
    const response = await fetch(`${baseUrl}/api/ObjectiveSetting/SaveSelfAddedKRA`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formBody,
    });
  
    const responseJson = await response.json();
  
    return responseJson;
  }
  
  export { SaveSelfAddedKRA };
  