# custom-calendar
Визуальный календарь прицепленный к полю <input />

## using
```html
<div id="calendar-name"> </div>
````
```javascript
<script type="module">
import { Calendar } from '/assets/js/libs/calendar.js';
document.addEventListener("DOMContentLoaded", function(event) {
// передаем функцию callback которая будет вызываться при нажатии на дату
    const calendarAll = new Calendar('calendar-name', callback);

//  скрываем поле ввода даты (если нужен только календарь)
    document.querySelector('#calendarAll>input').classList.add("hide");
});

</script>
```