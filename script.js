/**
 * @type {HTMLElement}
 */
let mouthBox = document.getElementsByClassName("mouthBox-dayBox")[0];

let addYear=document.getElementById("addYear")
let clearYear=document.getElementById("clearYear")
let clearMouth=document.getElementById("clearMouth")

/**
 * @param {HTMLInputElement} element 
 * @returns {Boolean} Проверяет правильность введеных данных
 */
function checkInput (element){
   let text= element.value
 return  /^\d+$/.test(text)&&Number(text)>1900&&Number(text)<2200;
}

/**
 * @typedef {Function} очищает атрибуты
 * @param {HTMLButtonElement} element 
 * @param {String} string mouth||yaers
 */
function eventClear(element,string){
    if(string=="years"){
        element.setAttribute("years","")
        element.setAttribute("mouth","")
        element.setAttribute("day","")
        return
    }
    element.setAttribute("mouth","")
    element.setAttribute("day","")
    return
}
addYear.onclick=()=>{
    mouthBox = document.getElementsByClassName("mouthBox-dayBox")[0];
    /**
     * @type {HTMLInputElement}
     */
    let yearsInput=document.getElementById("yearsInput")
    if(!checkInput(yearsInput)){
        yearsInput.value=""
        yearsInput.placeholder="Введено неверное значение";
        calendare()
       return
    }
    
    eventClear(mouthBox,"years")
    mouthBox.setAttribute("years",yearsInput.value)

    yearsInput.value=""
    yearsInput.placeholder="Введите год"
    calendare()
}
clearYear.onclick=()=>{
    eventClear(mouthBox,"years")
    calendare()  //перезапустить функцию календаря
}
clearMouth.onclick=()=>{
    eventClear(mouthBox)

    calendare() //перезапустить функцию календаря
}


mouthBox.addEventListener("click", (event) => {
  if (event.target.className == "mouthTd") {
    mouthBox.setAttribute("mouth", Number(event.target.textContent) - 1);
    calendare();
  }

  //Здесь прописать условие для дней
  if(event.target.className == "dayTd"){
    mouthBox.setAttribute("day", event.target.textContent);
    calendare();
  }

});

/**
 * @param {Date} date
 * @returns {number} День недели от 0-6
 */

function dayWeak(date) {
  let weakDays = date.getDay();
  if (weakDays == 0) {
    weakDays = 7;
  }
  return weakDays - 1;
}
/**
 *
 * @param {string} month
 * @param {string} year
 * @returns  {[Date]} ArrDayInMonth
 */
function getDaysInMonth(month, year) {
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}
function calendare() {
  mouthBox = document.getElementsByClassName("mouthBox-dayBox")[0];
  let years = mouthBox.getAttribute("years");
  let moth = mouthBox.getAttribute("mouth");
  let day = mouthBox.getAttribute("day");

  if (years && !moth && !day) {
    mouthBox.innerHTML = `    
<tr class="mouthTr">

<td class="mouthTd">1</td>
<td class="mouthTd">2</td>
<td class="mouthTd">3</td>
<td class="mouthTd">4</td>
<td class="mouthTd">5</td>
<td class="mouthTd">6</td>

</tr>
  
<tr class="mouthTr">
     
<td class="mouthTd">7</td>
<td class="mouthTd">8</td>
<td class="mouthTd">9</td>
<td class="mouthTd">10</td>
<td class="mouthTd">11</td>
<td class="mouthTd">12</td>

</tr>`;
  } else if (years && moth) {
                let date = new Date(years, moth);
                let weakDay = dayWeak(date);

                /**
                 * @type {string} htmlElemnt, при создание блок tr уже открыт
                 */
                let day = '<tr class="dayTr">';

                let lastMouth = Number(moth)
                ? new Date(years, moth - 1)
                : new Date(years - 1, 11);
                
                for (let i = weakDay - 1; i >= 0; i--) {
                    
                    let lastDays = getDaysInMonth(
                        lastMouth.getMonth(),
                        lastMouth.getFullYear()
                ).length;

                day = day + `<td class="lastDayTd">${lastDays - i}</td>`;
                }

                let arrDay=getDaysInMonth(date.getMonth(),date.getFullYear())

                    
                    for (let i = weakDay,k=1; (k <= arrDay.length); i++,k++) {
                        if (i % 7 == 0 && i !=0) {
                        day += `
                        </tr>
                        <tr class="dayTr">
                        `;
                    }

                    day+=`<td class="dayTd">${k}</td>`;

                
                         }


                for(let i=6,k=1;i>dayWeak(arrDay[arrDay.length-1]);i--,k++){
                    day+=`<td class="lastDayTd">${k}</td>`
                }

                day+="</tr>"
                mouthBox.innerHTML = `
            <tr class="weakTr">
                    <td class="weakTd">Пн</td>
                    <td class="weakTd">Вт</td>
                    <td class="weakTd">Ср</td>
                    <td class="weakTd">Чт</td>
                    <td class="weakTd">Пт</td>
                    <td class="weakTd">Суб</td>
                    <td class="weakTd">Вс</td>
            </tr>
            ${day}
            `;
  } else{
    mouthBox.innerHTML=""
  }

// отрисовка сделанного выбора
  let choiseBox=document.getElementById("boxChoice")

choiseBox.innerHTML=`
<div>Выбранный год ${mouthBox.getAttribute("years")} </div>
<div>Выбранный месяц ${mouthBox.getAttribute("mouth")?+mouthBox.getAttribute("mouth")+1:""} </div>
<div>Выбранный день ${mouthBox.getAttribute("day")} </div>
`



if(years && moth && day){

let eventHystoryBox=document.getElementsByClassName("eventHystory-input")[0]
    if(eventHystoryBox.firstChild.className=="boxtext"){eventHystoryBox.firstChild.remove()}

let eventHystory=document.getElementById("eventHystory")

let box=document.createElement("div")

let textArea= document.createElement("textarea")
    textArea.placeholder="Ведите событие"
    textArea.rows="5"
    textArea.classList.add("textArea")

let submit=document.createElement("button")
    submit.textContent="Опубликовать событие"
    submit.classList.add("submitEvent")

    submit.onclick=()=>{
      let parag=  document.createElement("p")
    
        let str=years+"."+moth+"."+day+": "+textArea.value
        
        let deleteEvent=document.createElement("button")
        deleteEvent.textContent="Удалить"
        deleteEvent.onclick=()=>{
          parag.remove()
        }
        parag.append(str)
        parag.append(deleteEvent)


        eventHystory.prepend( parag)

        textArea.value=""
        box.remove()
        calendare()
    }

    
box.append(textArea)
box.append(submit)

box.classList.add("boxtext")


eventHystoryBox.prepend(box)



}



}
calendare();
