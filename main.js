// ---- Get today and yesterday for inp Date ----

let Data_Agent = false;
var password_agent = false;

var error_date = false;

// دالة لتحويل التاريخ إلى تنسيق YYYY-MM-DD
function formatDateToYMD(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // إضافة 1 لأن الأشهر تبدأ من 0
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// احصل على التاريخ الحالي بدون الاعتماد على UTC
const today = new Date();
const todayString = formatDateToYMD(today);

// احسب تاريخ الأمس
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);
const yesterdayString = formatDateToYMD(yesterday);

// اطبع القيم للتحقق
console.log("Today: " + todayString);
console.log("Yesterday: " + yesterdayString);

// تعيين الحدين الأدنى والأقصى في حقل التاريخ
const dateInput = document.getElementById("date");
dateInput.min = yesterdayString;
dateInput.max = todayString;

// اطبع القيم بعد التعيين
console.log("Date input min: " + dateInput.min);
console.log("Date input max: " + dateInput.max);

dateInput.addEventListener("change", function () {
  const selectedDate = dateInput.value;

  // تحقق مما إذا كان التاريخ المحدد هو اليوم أو الأمس
  if (selectedDate !== todayString && selectedDate !== yesterdayString) {
    document.getElementById("error_msg_date").style.display = "inline";
    dateInput.setCustomValidity("يجب اختيار تاريخ اليوم أو اليوم السابق فقط !");
    error_date = false;
    dateInput.classList.add("ac_error");
  } else {
    document.getElementById("error_msg_date").style.display = "none";
    dateInput.setCustomValidity("");
    dateInput.classList.remove("ac_error");
    error_date = true;
  }

  dat_check();
});


// input Agent Name Add to Local Storge

document.addEventListener("DOMContentLoaded", function () {
  const selectElement = document.getElementById("name");

  const storedAgentName = localStorage.getItem("agentName");
  if (storedAgentName) {
    selectElement.value = storedAgentName;

    add_phone_number(storedAgentName);
    
  }

  selectElement.addEventListener("change", function () {
    const selectedAgentName = selectElement.value;

    if (selectedAgentName) {
      localStorage.setItem("agentName", selectedAgentName);

      add_phone_number(selectedAgentName);

    }
  });

  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((agent) => {
        Data_Agent = data;

        const option = document.createElement("option");
        option.value = agent.name;
        option.textContent = agent.name;
        selectElement.appendChild(option);
      });

      if (storedAgentName) {
        selectElement.value = storedAgentName;
      }
    });
});




// Add Required to Phones_Agent if pirce need not empty

const price_Need = document.querySelector(".price_Need");
const phones_agent = document.querySelector(".phones_agent");

price_Need.addEventListener("input", (e) => {
  if (price_Need.value != "" && phones_agent.value == "") {
    phones_agent.setAttribute("required", true);
    phones_agent.classList.add("ac_error");
  } else {
    phones_agent.removeAttribute("required");
    phones_agent.classList.remove("ac_error");
  }
});

phones_agent.addEventListener("input", (e) => {
  if (phones_agent.value != "") {
    phones_agent.classList.remove("ac_error");
  } else {
    phones_agent.classList.add("ac_error");
  }
});


const price_Need2  = document.querySelector(".price_Need2");
const phones_agent2 = document.querySelector(".phones_agent2");

price_Need2.addEventListener("input", (e) => {
  if (price_Need2.value != "" && phones_agent2.value == "") {
    phones_agent2.setAttribute("required", true);
    phones_agent2.classList.add("ac_error");
  } else {
    phones_agent2.removeAttribute("required");
    phones_agent2.classList.remove("ac_error");
  }
});

phones_agent.addEventListener("input", (e) => {
  if (phones_agent2.value != "") {
    phones_agent2.classList.remove("ac_error");
  } else {
    phones_agent2.classList.add("ac_error");
  }
});






// toggleInputs / open and close dev

function toggleInputs(id_Dev, id_checkbox, clas_inp1, clas_inp2) {
  var inputContainer = document.getElementById(`${id_Dev}`);

  var inp11 = document.getElementById(`${clas_inp1}`)
  var inp22 = document.getElementById(`${clas_inp2}`)

  if (document.getElementById(`${id_checkbox}`).checked) {
    inputContainer.classList.add('show');
  } else {
    inputContainer.classList.remove('show');

    inp11.value = ""
    inp22.value = ""
  }
}

var scriptURL = "https://script.google.com/macros/s/AKfycbyXx7BWYi6yj369orbCATzxNlrcpG73nu6X6cM9Vg3tBUaBWACL6Vr8hjINegKpHItusA/exec";

let hiddenInput = document.querySelector('input[name="formId"]');
hiddenInput.value = "form1";


function toggleInputs2(id_Dev, id_checkbox, clas_inp1, clas_inp2) {
  var inputContainer = document.getElementById(`${id_Dev}`);

  var show_sec_for_all = document.querySelector(".show_sec_for_all");

  var inp11 = document.getElementById(`${clas_inp1}`)
  var inp22 = document.getElementById(`${clas_inp2}`)

  if (document.getElementById(`${id_checkbox}`).checked) {
    inputContainer.classList.add('show');
    show_sec_for_all.classList.add('show2');
    console.log("1" + scriptURL);

    hiddenInput.value = "form2";
    console.log(hiddenInput.value);
    
  } else {
    inputContainer.classList.remove('show');
    show_sec_for_all.classList.remove('show2');
    console.log("2" + scriptURL);
    hiddenInput.value = "form1";
    console.log(hiddenInput.value);
    inp11.value = ""
    inp22.value = ""
  }
}





let password_input = document.querySelector(".password_inp");


let form = document.forms["Marketing_Form"];

let btn_subm = document.getElementById("submitBtn");

let errorMessage = document.getElementById("eror");


function dat_check() {
  if (!error_date) {
    errorMessage.innerHTML = "ادخل تاريخ صحيح !"
  }
  else if (error_date){
    errorMessage.innerHTML = ""
    
  }
}






form.addEventListener("submit", (e) => {

  e.preventDefault();


    const priceInputs = document.querySelectorAll(".price");
  let sum = 0;

  // جمع القيم الموجودة في حقول price
  priceInputs.forEach(input => {
    sum += parseFloat(input.value) || 0;  // إضافة القيمة إذا كانت رقمية، وإلا نضيف 0
  });

  // الحصول على قيمة حقل total_price
  const totalPriceInput = document.querySelector(".total_price");



  const totalPrice = parseFloat(totalPriceInput.value) || 0;


  if (sum === totalPrice) {
    
    if (password_agent && password_agent == password_input.value) {
    btn_subm.classList.add("disable");
    btn_subm.innerHTML = `
        <div class="dot-spinner">
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
        </div>
    `;

    fetch(scriptURL, {
      method: "POST",
      body: new FormData(form),
    })
      .then((response) => {
        window.location.href = "thanks.html";
      })
      .catch((error) => console.error("Error!", error.message));
  } else {


    errorMessage.innerHTML = "تأكد من الأسم الخاص بك او الرقم السري";
  }

  } else {
     errorMessage.innerHTML = "اجمالي المصروفات ليس مساوي للمصروفات";
  }
});


// Add Number Phone To Input Phone

function add_phone_number(Name_Ag) {
  var phones_Number = document.querySelector(".phones_agent");
  var phones_Number2 = document.querySelector(".phones_agent2");
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((agent) => {
        if (Name_Ag == agent.name) {
          password_agent = agent.passowrd;

          const phone1 = agent.phone1 ? `<option value="${agent.phone1}">${agent.phone1}</option> ` : "";
          const phone2 = agent.phone2 ? `<option value="${agent.phone2}">${agent.phone2}</option> ` : "";
          const phone3 = agent.phone3 ? `<option value="${agent.phone3}">${agent.phone3}</option> ` : "";
          const phone4 = agent.phone4 ? `<option value="${agent.phone4}">${agent.phone4}</option> ` : "";
          const phone5 = agent.phone5 ? `<option value="${agent.phone5}">${agent.phone5}</option> ` : "";

          phones_Number.innerHTML = `
                  <option value="" disabled selected>  Number Wallet  </option>
                    ${phone1}
                    ${phone2}
                    ${phone3}
                    ${phone4}
                    ${phone5}
                `;

                phones_Number2.innerHTML = `
                  <option value="" disabled selected>  Number Wallet  </option>
                    ${phone1}
                    ${phone2}
                    ${phone3}
                    ${phone4}
                    ${phone5}
                `;

        }
      });

// add name to anthore agent for transfare

let list_Name_Agent_send = document.querySelectorAll(".name_Agent2");

list_Name_Agent_send.forEach((slct) => {

  slct.innerHTML = `<option value="" disabled selected> Agent Name</option>`

  data.forEach((agent) => {
    if (agent.name != Name_Ag) {
      slct.innerHTML += `
                  <option value="${agent.name}">${agent.name}</option>
                  `;
    }
  });
});

      
    });
}





