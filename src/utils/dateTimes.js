module.exports.getTodayDate = function () {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

module.exports.getLastSundayDate = function () {
  const now = new Date();
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - now.getDay()
  );
};

module.exports.getThisMonth = function () {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth());
};

module.exports.getLastMonth = function () {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() - 1);
};

module.exports.getLastOneMonth = function () {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() - 1, now.getDate() + 1);
};

module.exports.getLastYearDate = function () {
  const now = new Date();
  return new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
};

module.exports.get12MonthsDate = function () {
  const now = new Date();
  return new Date(now.getFullYear() - 1, now.getMonth() + 1);
};
