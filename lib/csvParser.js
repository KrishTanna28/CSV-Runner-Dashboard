import Papa from 'papaparse';

const REQUIRED_HEADERS = ['date', 'person', 'miles'];

export function parseCSV(file) {
  return new Promise((resolve) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const validationResult = validateCSVData(results.data, results.meta.fields);
        resolve(validationResult);
      },
      error: () => {
        resolve({
          data: [],
          errors: [{ row: 0, field: 'file', message: 'Failed to parse CSV file' }],
          isValid: false,
        });
      },
    });
  });
}

function validateCSVData(rawData, headers) {
  const errors = [];
  const validData = [];

  // Check headers
  if (!headers || headers.length === 0) {
    errors.push({ row: 0, field: 'headers', message: 'CSV file has no headers' });
    return { data: [], errors, isValid: false };
  }

  // Normalize headers to lowercase for comparison
  const normalizedHeaders = headers.map(h => h.toLowerCase().trim());
  const missingHeaders = REQUIRED_HEADERS.filter(
    required => !normalizedHeaders.includes(required)
  );

  if (missingHeaders.length > 0) {
    errors.push({
      row: 0,
      field: 'headers',
      message: `Missing required columns: ${missingHeaders.join(', ')}. Expected: date, person, miles`,
    });
    return { data: [], errors, isValid: false };
  }

  // Validate each row
  rawData.forEach((row, index) => {
    const rowNumber = index + 2; // +2 because index is 0-based and we skip header row
    const rowErrors = [];

    // Get values (handle different case variations)
    const dateValue = getFieldValue(row, 'date');
    const personValue = getFieldValue(row, 'person');
    const milesValue = getFieldValue(row, 'miles');

    // Validate date
    if (!dateValue || dateValue.trim() === '') {
      rowErrors.push({
        row: rowNumber,
        field: 'date',
        message: 'Date is required',
      });
    } else if (!isValidDate(dateValue)) {
      rowErrors.push({
        row: rowNumber,
        field: 'date',
        message: `Invalid date format: "${dateValue}". Use YYYY-MM-DD or MM/DD/YYYY`,
      });
    }

    // Validate person
    if (!personValue || personValue.trim() === '') {
      rowErrors.push({
        row: rowNumber,
        field: 'person',
        message: 'Person name is required',
      });
    }

    // Validate miles
    if (!milesValue || milesValue.toString().trim() === '') {
      rowErrors.push({
        row: rowNumber,
        field: 'miles',
        message: 'Miles value is required',
      });
    } else {
      const miles = parseFloat(milesValue);
      if (isNaN(miles)) {
        rowErrors.push({
          row: rowNumber,
          field: 'miles',
          message: `Invalid miles value: "${milesValue}". Must be a number`,
        });
      } else if (miles < 0) {
        rowErrors.push({
          row: rowNumber,
          field: 'miles',
          message: `Miles cannot be negative: ${miles}`,
        });
      } else if (miles > 200) {
        rowErrors.push({
          row: rowNumber,
          field: 'miles',
          message: `Miles value seems unrealistic: ${miles}. Please verify.`,
        });
      }
    }

    // If row has errors, add them to the errors array
    if (rowErrors.length > 0) {
      errors.push(...rowErrors);
    } else {
      // Add valid record
      validData.push({
        date: normalizeDate(dateValue),
        person: personValue.trim(),
        miles: parseFloat(milesValue),
      });
    }
  });

  return {
    data: validData,
    errors,
    isValid: errors.length === 0 && validData.length > 0,
  };
}

function getFieldValue(row, fieldName) {
  // Try exact match first
  if (row[fieldName] !== undefined) {
    return row[fieldName];
  }
  
  // Try case-insensitive match
  const keys = Object.keys(row);
  const matchingKey = keys.find(k => k.toLowerCase() === fieldName.toLowerCase());
  return matchingKey ? row[matchingKey] : '';
}

function isValidDate(dateStr) {
  // Try parsing as Date
  const date = new Date(dateStr);
  if (!isNaN(date.getTime())) {
    return true;
  }

  // Try common formats: YYYY-MM-DD, MM/DD/YYYY, DD/MM/YYYY
  const formats = [
    /^\d{4}-\d{2}-\d{2}$/,
    /^\d{1,2}\/\d{1,2}\/\d{4}$/,
    /^\d{1,2}-\d{1,2}-\d{4}$/,
  ];

  return formats.some(format => format.test(dateStr.trim()));
}

function normalizeDate(dateStr) {
  const date = new Date(dateStr);
  if (!isNaN(date.getTime())) {
    return date.toISOString().split('T')[0];
  }
  return dateStr;
}
