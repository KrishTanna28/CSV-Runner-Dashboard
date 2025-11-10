export function calculateOverallMetrics(data) {
  if (!data || data.length === 0) {
    return {
      totalMiles: 0,
      averageMiles: 0,
      minMiles: 0,
      maxMiles: 0,
      totalRuns: 0,
      uniqueRunners: 0,
    };
  }

  const miles = data.map(record => record.miles);
  const uniqueRunners = new Set(data.map(record => record.person)).size;

  return {
    totalMiles: miles.reduce((sum, m) => sum + m, 0),
    averageMiles: miles.reduce((sum, m) => sum + m, 0) / miles.length,
    minMiles: Math.min(...miles),
    maxMiles: Math.max(...miles),
    totalRuns: data.length,
    uniqueRunners,
  };
}

export function calculatePersonMetrics(data) {
  if (!data || data.length === 0) {
    return [];
  }

  const personMap = {};

  data.forEach(record => {
    if (!personMap[record.person]) {
      personMap[record.person] = [];
    }
    personMap[record.person].push(record.miles);
  });

  return Object.entries(personMap).map(([person, miles]) => {
    const totalMiles = miles.reduce((sum, m) => sum + m, 0);
    return {
      person,
      totalMiles,
      averageMiles: totalMiles / miles.length,
      minMiles: Math.min(...miles),
      maxMiles: Math.max(...miles),
      runCount: miles.length,
    };
  }).sort((a, b) => b.totalMiles - a.totalMiles);
}

export function getRunsByDate(data) {
  if (!data || data.length === 0) {
    return [];
  }

  const dateMap = {};

  data.forEach(record => {
    if (!dateMap[record.date]) {
      dateMap[record.date] = 0;
    }
    dateMap[record.date] += record.miles;
  });

  return Object.entries(dateMap)
    .map(([date, miles]) => ({ date, miles }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

export function getRunsByPerson(data) {
  if (!data || data.length === 0) {
    return [];
  }

  const personMap = {};

  data.forEach(record => {
    if (!personMap[record.person]) {
      personMap[record.person] = 0;
    }
    personMap[record.person] += record.miles;
  });

  return Object.entries(personMap)
    .map(([person, miles]) => ({ person, miles }))
    .sort((a, b) => b.miles - a.miles);
}

export function getPersonRunsByDate(data, person) {
  if (!data || data.length === 0 || !person) {
    return [];
  }

  const personData = data.filter(record => record.person === person);
  const dateMap = {};

  personData.forEach(record => {
    if (!dateMap[record.date]) {
      dateMap[record.date] = 0;
    }
    dateMap[record.date] += record.miles;
  });

  return Object.entries(dateMap)
    .map(([date, miles]) => ({ date, miles }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}
