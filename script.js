var input = document.querySelector("#input");
var showBtn = document.querySelector("#submitBtn");
var output = document.querySelector("#output");
var loadDiv = document.querySelector("#loading");

loadDiv.style.display = "none";
function reverseString(str) {
  return str.split("").reverse().join("");
}

function isPalindrome(str) {
  var reverse = reverseString(str);
  return str === reverse;
}

function dateToStr(date) {
  var dateInStr = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateInStr.day = "0" + date.day;
  } else {
    dateInStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateInStr.month = "0" + date.month;
  } else {
    dateInStr.month = date.month.toString();
  }

  dateInStr.year = date.year.toString();
  return dateInStr;
}

function getDateInAllFormats(date) {
  var dateStr = dateToStr(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yyddmm = dateStr.year.slice(-2) + dateStr.day + dateStr.month;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

function checkPalindromeForAllDateFormats(date) {
  var dateFormatList = getDateInAllFormats(date);
  var palindromeList = [];

  var flag = false;

  for (var i = 0; i < dateFormatList.length; i++) {
    if (isPalindrome(dateFormatList[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

function isLeapYear(year) {
  if (year % 400 === 0) return true;

  if (year % 100 === 0) return false;

  if (year % 4 === 0) return true;

  return false;
}

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindromeDate(date) {
  var nextDate = getNextDate(date);
  var count = 0;

  while (1) {
    count++;
    var isPalindrome = checkPalindromeForAllDateFormats(nextDate);

    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [count, nextDate];
}

function clickHandler() {
  var dateStr = input.value;

  if (dateStr !== "") {
    var listOfDate = dateStr.split("-");

    var date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0]),
    };

    var isPalindrome = checkPalindromeForAllDateFormats(date);

    loadDiv.style.display = "block";
    output.style.display = "none";

    setTimeout(() => {
      loadDiv.style.display = "none";
      output.style.display = "block";

      if (isPalindrome) {
        output.innerText = "Yayyy!!! Your Birthday is Palindrome 🤩🤩🤩";
      } else {
        var [count, nextDate] = getNextPalindromeDate(date);
        output.innerText = `The Next Palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${count} days.😯😯😯`;
      }
    }, 2000);
  }
}

showBtn.addEventListener("click", clickHandler);
