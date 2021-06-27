import { Component, Event, EventEmitter, h, State, Prop, Watch } from '@stencil/core';
export interface ObjDates {
  day: number;
  class: string;
}
@Component({
  tag: 'cb-calendar',
  styleUrl: 'calendar.scss'
})
export class Calendar {
  @State() days = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
  @State() monthsList = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  @State() date = new Date();
  @State() year = Number(this.date.getFullYear());
  @State() monthPosition = Number(this.date.getMonth());
  @State() blankDaysLeft = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
  @State() currentDay = Number(String(this.date.getDate()).padStart(2, '0'));
  @State()  daysInMonth = new Date(this.year, this.monthPosition + 1, 0). getDate();
  @State() formatDays : ObjDates[] = [];
  private calendarContainer?: HTMLDivElement;
  private calendarNumberSelected?: HTMLDivElement;
  @Event() valueChanged: EventEmitter<string>;
  @Prop({reflect: true, mutable: true}) ctrlValue: string = null;
  @State() dayMarked?: boolean;
  @State() totalRecords = this.daysInMonth + this.blankDaysLeft > 35 ? 42 : 35;
  @State() dayByClickCalendar : boolean;
  private getDaysInMonth() {
    this.formatDays = [];  
    for (let index = 0; index < this.totalRecords; index++) {      
      // class for calendar
      let classCalendar = '';  
      if (this.currentDay  + this.blankDaysLeft === index +1) {
        classCalendar = 'calendar__number--current';
      }

      // null items
      let item = index + 1 - this.blankDaysLeft;
      if (index < this.blankDaysLeft || index + 1 - this.blankDaysLeft >= this.daysInMonth + 1) {
        item = null;
        classCalendar = 'days-disabled';
      }
      
      this.formatDays[index] = {
        'day': item,
        'class': classCalendar
      }
    }
  }

  private previousMonth() {
    this.monthPosition = this.monthPosition > 0 ? this.monthPosition - 1 : 11;
    if (this.monthPosition === 11) {
      this.year -= 1;
    }
    
    this.newformatDays();

  }
  private nextMonth() {
    this.monthPosition = this.monthPosition < 11 ? this.monthPosition + 1 : 0;
    if (this.monthPosition === 0) {
      this.year += 1;
    }
    this.newformatDays();
  }
  private newformatDays() {    

    this.removeMarkedDays(); 
    this.updateCalendarVars(true);  
    this.getDaysInMonth();

    this.updateSelectedDate();
    
  }

  private updateSelectedDate(ctrlValue?: string) {
    
    if (!ctrlValue && this.ctrlValue) {
      const arrDate = this.ctrlValue.split('-');
      const mm = Number(arrDate[1]);
      const yy = Number(arrDate[2]);  
      // If user selected a date, marked again when return
      if (this.monthPosition+1 === mm && this.year === yy ) {
        this.calendarNumberSelected.classList.add('calendar__number--market');
      }      
    } else {
      const findIndex = this.formatDays.findIndex(ob => ob.day === Number(ctrlValue.split('-')[0]));      
      this.calendarContainer.querySelectorAll('.calendar__number').forEach((element: HTMLDivElement, index) => {
         if (findIndex === index)  {
          element.classList.add('calendar__number--market');
          this.calendarNumberSelected = element;
         } else {
          element.classList.remove('calendar__number--market');
         }
      });
    }
  }
  private getCurrentDiv(index: number, event: MouseEvent) {
    this.dayByClickCalendar = true;
    // Remove all marked days first
    this.removeMarkedDays(index);

    // Selected day
    this.calendarNumberSelected = event.target as HTMLDivElement;    
    this.calendarNumberSelected.classList.toggle('calendar__number--market');
    
    // Get value for calendar
    if (this.calendarNumberSelected.classList.contains('calendar__number--market')) {
      this.ctrlValue = `${this.calendarNumberSelected.innerText}-${this.monthPosition + 1}-${this.year}`;
    } else {
      this.ctrlValue = null;
    }
    this.valueChanged.emit(this.ctrlValue);
    this.dayMarked = true;
  }

  private removeMarkedDays(index?: number) {
    
    this.calendarContainer.querySelectorAll('.calendar__number').forEach((element, key) => {
      if (index !== key){
        element.classList.remove('calendar__number--market');
      }    
    });

  }

  private checkToMarkChangedDay(newValue: string) {  
    const arrDate = this.ctrlValue.split('-');
    const dd = Number(arrDate[0]);
    const mm = Number(arrDate[1]);
    const yy = Number(arrDate[2]); 
    
    const daysInMonth = new Date(yy, mm, 0).getDate();    
    if (dd <= daysInMonth && mm <= 12 || String(yy).length !== 4) {      
      this.updateCalendarVars(false, newValue);
      this.getDaysInMonth();
      this.updateSelectedDate(newValue);
      return true;
    } else {
      return false;
    }
    
  }

  private updateCalendarVars(mmYYUpdated?: boolean, newValue?: string) {
    // convert ctrlValue to array 
    const arrDate = this.ctrlValue ? this.ctrlValue.split('-') : [''];
    this.monthPosition = mmYYUpdated ? this.monthPosition : Number(arrDate[1]) - 1;
    this.year = mmYYUpdated ? this.year : Number(arrDate[2]); 

    // Check if ctrlValue has the current day
    if (mmYYUpdated) {
      if (this.monthPosition === this.date.getMonth() && this.date.getFullYear() === this.year) {
        this.currentDay = Number(String(this.date.getDate()).padStart(2, '0'));
      } else {
      this.currentDay = null;
      } 
    } else {
      if (newValue) {        
        const currentDay = Number(String(this.date.getDate()).padStart(2, '0'));
        const yy = Number(this.date.getFullYear());
        const mm = Number(this.date.getMonth());
        this.currentDay = Number(newValue.split('-')[1]) - 1 === mm 
        && Number(newValue.split('-')[2]) === yy ? 
        currentDay : null;
      } else {
        this.currentDay = this.date.getMonth() === this.monthPosition 
        && this.date.getFullYear() === this.year ? 
        this.currentDay : null;
      }
      
    }


    // Update other vars
    this.blankDaysLeft = new Date(this.year, this.monthPosition).getDay();
    this.daysInMonth = new Date(this.year, this.monthPosition + 1, 0). getDate();
    this.totalRecords = this.daysInMonth + this.blankDaysLeft > 35 ? 42 : 35;
  }

  private markCtrlValue() {
    const arrDate = this.ctrlValue ? this.ctrlValue.split('-') : ['-'];
    const dd = Number(arrDate[0]);
    this.calendarContainer.querySelectorAll('.calendar__number').forEach((element: HTMLDivElement) => {
      if (Number(element.innerHTML) === dd) {
        element.classList.add('calendar__number--market');
        this.calendarNumberSelected = element;
      }
    });
  }

  @Watch('ctrlValue')
  _ctrlValueHandler(newValue: string, oldValue: string) {   
    if (newValue !== oldValue) {
      if (!newValue || newValue.split('-').length !== 3) {        
        return false;
      } else {        
        const updated = this.checkToMarkChangedDay(newValue);
        if (updated && !this.dayByClickCalendar) {
          this.valueChanged.emit(newValue);
        }
      }
      
    }
    this.dayByClickCalendar = false;
  }

  connectedCallback() {
    if (this.ctrlValue) {
      this.updateCalendarVars();
    }
    this.getDaysInMonth(); 
  }
  componentDidLoad() {
    this.markCtrlValue()
  }
  render() {                
    return (
      <div class="calendar">
        <div class="calendar-buttons">
          <a class="previous" onClick= {this.previousMonth.bind(this)}>&#8249;</a>
            <label> {this.monthsList[this.monthPosition]} - {this.year} </label>
          <a class="next" onClick= {this.nextMonth.bind(this)}>&#8250;</a>
        </div>
        <div class="calendar__date"                 
        ref={el => this.calendarContainer = el as HTMLDivElement}>
          {this.days.map(day => 
             (
              <div class="calendar__day"> {day.toUpperCase()} </div>
            )
          )}
          {
            this.formatDays.map((fday, index) => 
              (
                <div class={`calendar__number ${fday.class}`}           
                onClick= {this.getCurrentDiv.bind(this, index)}
                > {fday.day} </div>
                )
           )
          }
        </div>
      </div>  
      );
  }
}