# custom-calendar
Визуальный календарь прицепленный к полю input

![image](https://user-images.githubusercontent.com/19924460/210064963-55af3100-56a1-466c-9afb-1b3acbb837f2.png)

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
