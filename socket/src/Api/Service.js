import { format } from "date-fns";
export const apiDateFormat = (date) => {
  //return moment(date).format("YYYY-MM-DD");
};

export function isLoggedIn() {
  return localStorage.getItem("isLoggedIn");
}
export function handleInvalidToken() {
  //clearToken();
  clearUserData();
  window.location.href = "/login";
}

export function clearUserData() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("accountData");
  localStorage.removeItem("userData");
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("temp_signup_data");
  localStorage.removeItem("profileStatus");
  localStorage.removeItem("dateFormat");
  localStorage.removeItem("timeFormat");

}
export function getAccountData() {
  return JSON.parse(localStorage.getItem("accountData"));
}
export function setAccountData(payload) {
  setDateFormat(payload.date_format);
  setTimeFormat(payload.time_format);
  return localStorage.setItem("accountData", JSON.stringify(payload));
}

export function getUser() {
  return JSON.parse(localStorage.getItem("userData"));
}

export function setUser(payload) {
  return localStorage.setItem("userData", JSON.stringify(payload));
}

export function setToken(access_token) {
  console.log("set token data",access_token)
  localStorage.setItem("access_token", access_token);
 // localStorage.setItem("isLoggedIn", true);
}

export function getToken() {
 
  let token = localStorage.getItem("access_token");
  console.log("get token data",token)
  if (token) {
    return token;
  }
  return false;
}
export function logoutCompletely() {
  clearUserData();
}

export function setTempData(payload) {
  localStorage.setItem("temp_signup_data", JSON.stringify(payload));
}
export function removeTempData() {
  localStorage.removeItem("temp_signup_data");
}

export function getTempData() {
  return JSON.parse(localStorage.getItem("temp_signup_data"));
}

export function getLoggedinUserId() {
  return getUser()?.id;
}

export function setDateFormat(dateFormat) {
  switch (dateFormat) {
    case 'mm/dd/yyyy':
      dateFormat = 'MM/DD/YYYY';
      break;
    case 'yyyy/mm/dd':
      dateFormat = 'YYYY/MM/DD';
      break;
    case 'dd/mm/yyyy':
      dateFormat = 'DD/MM/YYYY';
      break;
    default:
      dateFormat = "YYYY/MM/DD";
      break;
  }
  localStorage.setItem('dateFormat', dateFormat);
  return true;
}


export function getDateFormat() {
  let dateFormat = localStorage.getItem('dateFormat')
  if (dateFormat) {
    return dateFormat;
  } else
    return "YYYY/MM/DD";
}



export function setTimeFormat(timeFormat) {
  switch (timeFormat) {
    case '12 Hours':
      timeFormat = 'hh:mm A';
      break;
    case '24 Hours':
      timeFormat = 'HH:mm';
      break;
    default:
      timeFormat = 'hh:mm A';
      break;
  }
  localStorage.setItem('timeFormat', timeFormat);
  return true;
}

// export function formatTime(time) {
//   let timeFormat = getTimeFormat();
//   return moment(time, "HH:mm:ss").format(timeFormat);
// }

export function getTimeFormat() {
  let timeFormat = localStorage.getItem('timeFormat')
  if (timeFormat) {
    return timeFormat;
  } else
    return 'HH:mm';
}



/*
  style = 'currency', 'decimal' or 'percent'
*/
export function numberFormat(amount, style, minimumFractionDigits, maximumFractionDigits) {
  let locale = 'en'; // todo
  let currency = "INR"; //'usd'; // todo
  style = style || 'decimal';
  maximumFractionDigits = maximumFractionDigits || 2;

  var options = { style: style, currency: currency, currencyDisplay: 'code', maximumFractionDigits: maximumFractionDigits, minimumFractionDigits: minimumFractionDigits };
  var formatter = new Intl.NumberFormat(locale, options);
  if (amount && amount !== null && amount !== '' && amount > 0) {
    return formatter.format(amount);
    //return givenNumber.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
  }

  return formatter.format(0);
}


/*
time12h = '02:55 AM', '05:30:00 am'
*/
export function convertTime12to24(time12h, isSeconds = false) {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  if (hours === '12') {
    hours = '00';
  }

  if (modifier.toLowerCase() === 'pm') {
    hours = parseInt(hours, 10) + 12;
  }
  if (isSeconds) {
    return hours + ':' + minutes + ':00';
  } else {
    return hours + ':' + minutes;
  }
}

/*
time = '14:45:55', '19:50'
*/
export function convertTime24to12(time) {
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  if (time.length > 1) {
    time = time.slice(1);
    time[0] = +time[0] % 12 || 12;
    if (time[0] < 10) {
      time[0] = '0' + time[0]
    }
  }
  delete time[time.length - 1];
  return time.join('');
}

/*
time = '14:45:55', '19:50'
*/
export function getAmPm(time) {
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  if (time.length > 1) {
    time = time.slice(1);
    return +time[0] < 12 ? 'AM' : 'PM';
  }
  return null;
}


export function setProfileCompleted(payload) {
  let data = {
    isPetCompleted: payload.data?.is_pet,
    isProfileCompleted: payload.data?.is_profile_completed
  }
  localStorage.setItem("profileStatus", JSON.stringify(data));
}
export function getProfileCompleted() {
  return JSON.parse(localStorage.getItem("profileStatus"));
}




export function appointmentDateFormat(date, toFormat) {
  //console.log(date, toFormat);
  if (date && toFormat) {
    toFormat = toFormat.replace("YYYY", 'yyyy')
    toFormat = toFormat.replace("YYY", 'yyy')
    toFormat = toFormat.replace("YY", 'yy')
    toFormat = toFormat.replace("YY", 'yy')
    toFormat = toFormat.replace("DDD", 'ddd')
    toFormat = toFormat.replace("DD", 'dd')
    toFormat = toFormat.replace("D", 'd')
    toFormat = toFormat.replace("A", 'a')
    toFormat = toFormat.replace("dddd", 'EEEE')
    return format(date, toFormat)
  }


}

export function truncate(str, length, total) {
  return str.length > length ? str.substring(0, total) + "..." : str;
}

export function getLoggedinPreferredClinic() {
  return getUser()?.clinic;
}

export function setLastPetId(id) {
  return localStorage.setItem("lastPetId", id);
}

export function getLastPetId() {
  return localStorage.getItem("lastPetId");
}