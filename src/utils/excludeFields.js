// Function to exclude specific fields
function excludeFields(obj, fieldsToExclude) {
    const result = { ...obj };
    fieldsToExclude.forEach(field => {
      delete result[field];
    });
    return result;
  }