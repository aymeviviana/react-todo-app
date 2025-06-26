export function getYears(start, end) { 
  const years = [];
  
  for (let year = start; year <= end; year += 1) { 
    years.push({ title: year.toString(), value: year.toString() });
  }

  return years;
}

function formatDay(day) { 
  const stringDay = day.toString();
  return stringDay.length < 2 ? `0${stringDay}` : stringDay;
}

export function getDays(start, end) { 
  const days = [];

  for (let day = start; day <= end; day += 1) { 
    days.push({ title: day.toString(), value: formatDay(day) });
  }
  return days;
}