module.exports = function(a, b){
  var d = Math.abs(new Date(a).getTime() - new Date(b).getTime());
  var months = [
    'Jan', 'Feb', 'Mar',
    'Apr', 'May', 'June',
    'July', 'Aug', 'Sept',
    'Oct', 'Nov', 'Dec'
  ];

  // Yearly (31536000000) + Monthly
  if (d >= 2419200000) {
    return function(ms){
      var date = new Date(ms);
      return months[date.getMonth()] + ' ' + date.getFullYear();
    };
  }
  // Daily
  else if (d >= 86400000) {
    return function(ms){
      var date = new Date(ms);
      return months[date.getMonth()] + ' ' + date.getDate();
    };
  }
  // Hourly
  else if (d >= 3600000) {
    return '%I:%M %p';
  }
  // Minutely
  else {
    return '%I:%M:%S %p';
  }
};
