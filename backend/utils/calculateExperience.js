export const calculateExperience = (experiences) => {
  let totalMonths = 0;

  experiences.forEach((exp) => {
    const start = new Date(exp.startDate);
    const end = exp.endDate ? new Date(exp.endDate) : new Date();

    let months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());

    if (months < 0) months = 0;

    totalMonths += months;
  });

  return Number((totalMonths / 12).toFixed(1));
};