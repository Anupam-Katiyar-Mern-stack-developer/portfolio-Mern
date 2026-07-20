export const getGrowth = async (model) => {
  const now = new Date();

  // Current Month
  const currentMonthStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    1
  );

  // Last Month
  const lastMonthStart = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    1
  );

  const lastMonthEnd = new Date(
    now.getFullYear(),
    now.getMonth(),
    0,
    23,
    59,
    59
  );

  // Current Month Count
  const currentCount = await model.countDocuments({
    createdAt: {
      $gte: currentMonthStart,
    },
  });

  // Last Month Count
  const lastCount = await model.countDocuments({
    createdAt: {
      $gte: lastMonthStart,
      $lte: lastMonthEnd,
    },
  });

  let growth = 0;

  if (lastCount === 0) {
    growth = currentCount > 0 ? 100 : 0;
  } else {
    growth = Number(
      (((currentCount - lastCount) / lastCount) * 100).toFixed(1)
    );
  }

  return {
    currentCount,
    lastCount,
    growth,
  };
};