export class Calendar {
    nextMonthBtn;
    prevMonthBtn;
    monthsName = [
        '',
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
    ];
    daysName = [
        '',
        'пн',
        'вт',
        'ср',
        'чт',
        'пт',
        'сб',
        'вс'
    ];
    constructor(id, funcOnSelect) {
        this.block = document.querySelector("#" + id, funcOnSelect);
        this.onSelect = funcOnSelect;
        this.currentDate = new Date();
        this.activeMonth = new Date().getMonth() + 1;
        this.activeYear = new Date().getFullYear();
        if (this.activeMonth > 12) { this.activeMonth = this.activeMonth - 12 };
        this.selectedDate = null;
        this.input = document.createElement('input');
        this.input.type = 'date';
        this.input.name = id;
        this.input.value = this.currentDate;
        
        this.render();
     }
 

    selectDate(day) {
        this.selectedDate = new Date(this.activeYear, this.activeMonth - 1, day);
        let dateFormat = this.activeYear + '-';
        if (this.activeMonth < 10) {
            dateFormat = dateFormat + '0';
        }
        dateFormat = dateFormat + this.activeMonth + '-';
        if (day < 10) {
            dateFormat = dateFormat + '0';
        }
        dateFormat = dateFormat + day;
        this.input.value = dateFormat;
        if (this.onSelect) { this.onSelect() }
    }

    nextMonth() {
        if (this.activeMonth < 12) {
             this.activeMonth++
        }else{
            this.activeMonth = 1; 
            this.activeYear++
        }
        this.render();
    }


    prevMonth() {
        if (this.activeMonth > 1) {
            this.activeMonth--
       }else{
           this.activeMonth = 12; 
           this.activeYear--
       }
        this.render();
    }  


    nextYear() {
    
    }


    prevYear() {
    
    }    

    render() {
        this.block.innerHTML = '';
        this.block.appendChild(this.input);
        this.block.appendChild(this.createPop());
        this.nextMonthBtn.addEventListener('click', e => { this.nextMonth() } );
        this.prevMonthBtn.addEventListener('click', e => { this.prevMonth() });
     }


    createPop() {
        const blockPop = document.createElement("div");
        const title = document.createElement("div");
        const titleMonth = document.createElement("div");
        this.prevMonthBtn = document.createElement("div");
        this.nextMonthBtn = document.createElement("div");
        blockPop.classList.add("calendar--popUp");
        title.classList.add("calendar--title");
        titleMonth.classList.add("calendar--title-month");
        this.prevMonthBtn.classList.add("calendar--prev-month");
        this.nextMonthBtn.classList.add("calendar--next-month");
        titleMonth.textContent = this.monthsName[this.activeMonth];
        title.appendChild(this.prevMonthBtn);
        title.appendChild(titleMonth);
        title.appendChild(this.nextMonthBtn);
        blockPop.appendChild(title);
        blockPop.appendChild(this.createWeekDays());
        blockPop.appendChild(this.createCalendar());
        return blockPop;
    }


    createWeekDays() {
        const weekDays = document.createElement("div");
        weekDays.classList.add("week-days");
        for (let i = 1; i <= 7; i++) {
            let dayName = document.createElement("div");
            dayName.classList.add("week-day");
            dayName.textContent = this.daysName[i];
            weekDays.appendChild(dayName);
        }

        return weekDays;
    }
    

    createCalendar() {
        const calendarDays = document.createElement("div");
        calendarDays.classList.add("calendar-days");
        
        let monthDays = new Date();
        monthDays.setMonth(this.activeMonth - 1); // activeMonth 1-12 setMonth 0-11
        monthDays.setFullYear(this.activeYear);

        let startDay = this.findStartDay(monthDays);
        let activeMonth = monthDays.getMonth();

        monthDays.setMonth(monthDays.getMonth() - 1);  
        monthDays.setDate(startDay);

        for (let i = 1; i <= 6; i++) {
            const calendarLine = document.createElement("div");
            calendarLine.classList.add("calendar-line");

            for (let j = 1; j <= 7; j++) {
                monthDays.setDate(monthDays.getDate() + 1);
                let day = document.createElement("div");
                day.classList.add("calendar-day");
                if ( j == 6 || j == 7 ) {
                    day.classList.add("calendar-day__week-end");
                }
                if (activeMonth !== monthDays.getMonth() ) {
                    day.classList.add("calendar-day__grey");
                }
                if (monthDays.getDate() == new Date().getDate() && monthDays.getMonth() == new Date().getMonth() && monthDays.getFullYear() == new Date().getFullYear()) {
                    day.classList.add("calendar-day__today");
                }
                if (this.selectedDate && monthDays.getDate() == this.selectedDate.getDate() && monthDays.getMonth() ==this.selectedDate.getMonth() && monthDays.getFullYear() == this.selectedDate.getFullYear()) {
                    day.classList.add("calendar-day__select");
                }
                day.textContent = monthDays.getDate();
                day.dataset.day = monthDays.getDate();
                day.dataset.month = monthDays.getMonth();
                day.dataset.year = monthDays.getFullYear();
                calendarLine.appendChild(day);
                day.addEventListener('click', e => { 
                    // делаем не кликабельными серые дни
                    if (day.classList.contains("calendar-day__grey")) {
                        return;
                    }
                    document.querySelectorAll('.calendar-day__select').forEach ( el => {
                        el.classList.remove('calendar-day__select');
                    });
                    day.classList.add('calendar-day__select');
                    this.selectDate(day.dataset.day) 
                });
            }

            calendarDays.appendChild(calendarLine);
        }

        return calendarDays;
    }


    findStartDay(date) { 
        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        if (firstDay == 0) {
            firstDay = 7;
        }
        let prevMonthCountDays = new Date(date);
        prevMonthCountDays.setDate(-0); // last day in previous month
        let lastDay = prevMonthCountDays.getDate();
        return (firstDay == 1) ? ( lastDay - 7 ) : ( lastDay - (firstDay - 1) );
    }

}