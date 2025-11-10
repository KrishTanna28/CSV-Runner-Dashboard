# Testing Guide

This document provides detailed testing scenarios to verify all functionality.

## Prerequisites

- Application running at `http://localhost:3000`
- Sample CSV file at `/public/sample-running-data.csv`

## Test Scenarios

### 1. Valid CSV Upload

**Steps:**
1. Click "Choose File" button
2. Select `sample-running-data.csv`
3. Wait for processing

**Expected Results:**
- ✅ Dashboard appears
- ✅ Shows "30 records • 4 runners"
- ✅ All charts render correctly
- ✅ Metrics are calculated

**Metrics to Verify:**
- Total Miles: ~180-190
- Average Miles: ~6.0
- Total Runs: 30
- Unique Runners: 4

---

### 2. Missing Headers Error

**Test File Content:**
```csv
2024-01-01,John Doe,5.2
2024-01-02,Jane Smith,3.8
```

**Expected Result:**
- ❌ Error: "Missing required columns: date, person, miles"

---

### 3. Invalid Date Format

**Test File Content:**
```csv
date,person,miles
not-a-date,John Doe,5.2
```

**Expected Result:**
- ❌ Error: "Row 2, date: Invalid date format"

---

### 4. Invalid Miles (Non-Numeric)

**Test File Content:**
```csv
date,person,miles
2024-01-01,John Doe,abc
```

**Expected Result:**
- ❌ Error: "Row 2, miles: Invalid miles value: 'abc'. Must be a number"

---

### 5. Negative Miles

**Test File Content:**
```csv
date,person,miles
2024-01-01,John Doe,-5.2
```

**Expected Result:**
- ❌ Error: "Row 2, miles: Miles cannot be negative: -5.2"

---

### 6. Missing Person Name

**Test File Content:**
```csv
date,person,miles
2024-01-01,,5.2
```

**Expected Result:**
- ❌ Error: "Row 2, person: Person name is required"

---

### 7. Empty CSV

**Test File Content:**
```csv
date,person,miles
```

**Expected Result:**
- ❌ Error or message indicating no data

---

### 8. Case-Insensitive Headers

**Test File Content:**
```csv
DATE,PERSON,MILES
2024-01-01,John Doe,5.2
```

**Expected Result:**
- ✅ Parses successfully
- ✅ Dashboard displays correctly

---

### 9. Different Date Formats

**Test File Content:**
```csv
date,person,miles
2024-01-01,John Doe,5.2
01/02/2024,Jane Smith,3.8
1/3/2024,Mike Johnson,7.5
```

**Expected Result:**
- ✅ All dates parsed correctly
- ✅ Dates normalized to YYYY-MM-DD format

---

### 10. Large Miles Value Warning

**Test File Content:**
```csv
date,person,miles
2024-01-01,John Doe,250
```

**Expected Result:**
- ⚠️ Warning: "Miles value seems unrealistic: 250. Please verify."
- ✅ Data still accepted

---

## UI/UX Testing

### Overall Statistics Tab

**Verify:**
- [ ] 4 metric cards display correctly
- [ ] Icons match metric type
- [ ] Numbers are formatted (2 decimal places)
- [ ] Range statistics show min/max
- [ ] Line chart has proper axes labels
- [ ] Bar chart shows all runners
- [ ] Pie chart shows percentages
- [ ] Charts are responsive

### Per-Person Analysis Tab

**Verify:**
- [ ] Runner selection buttons work
- [ ] Selected runner is highlighted
- [ ] Metrics update when changing runner
- [ ] Progress chart shows correct data
- [ ] Comparison table shows all runners
- [ ] Selected runner is highlighted in table

### Responsive Design

**Test at:**
- [ ] Mobile (375px width)
- [ ] Tablet (768px width)
- [ ] Desktop (1024px width)
- [ ] Large Desktop (1920px width)

**Verify:**
- [ ] No horizontal scrolling
- [ ] Charts remain readable
- [ ] Buttons are accessible
- [ ] Text is legible

### Accessibility

**Keyboard Navigation:**
- [ ] Tab through all interactive elements
- [ ] Enter/Space activates buttons
- [ ] Focus indicators visible
- [ ] Logical tab order

**Screen Reader:**
- [ ] Labels on all inputs
- [ ] Error messages announced
- [ ] Chart data accessible

**Color Contrast:**
- [ ] Text readable on backgrounds
- [ ] Dark mode has proper contrast
- [ ] Focus indicators visible

---

## Performance Testing

### File Size Limits

**Test with:**
- [ ] 100 rows - Should be instant
- [ ] 1,000 rows - Should be fast (<1s)
- [ ] 10,000 rows - May be slow but should work
- [ ] 100,000 rows - May cause issues

### Browser Compatibility

**Test in:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

---

## Edge Cases

### Multiple Runs Same Day

**Test File Content:**
```csv
date,person,miles
2024-01-01,John Doe,5.2
2024-01-01,John Doe,3.8
```

**Expected Result:**
- ✅ Both runs counted
- ✅ Total miles summed correctly

### Single Runner

**Test File Content:**
```csv
date,person,miles
2024-01-01,John Doe,5.2
2024-01-02,John Doe,3.8
```

**Expected Result:**
- ✅ Dashboard displays correctly
- ✅ Pie chart shows 100% for one runner
- ✅ Per-person view works

### Special Characters in Names

**Test File Content:**
```csv
date,person,miles
2024-01-01,O'Brien,5.2
2024-01-02,José García,3.8
```

**Expected Result:**
- ✅ Names display correctly
- ✅ No parsing errors

---

## Regression Testing

After any code changes, verify:
- [ ] Sample CSV still uploads
- [ ] All charts still render
- [ ] Metrics still calculate correctly
- [ ] Error handling still works
- [ ] Reset button still works
- [ ] Tab navigation still works

---

## Bug Reporting

If you find a bug, please report:
1. Steps to reproduce
2. Expected behavior
3. Actual behavior
4. Browser and version
5. Sample CSV file (if applicable)
6. Screenshots (if applicable)
