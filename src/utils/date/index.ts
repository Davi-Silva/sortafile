class DateFormatter {
  private date: Date;
  private month: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  constructor(date: Date) {
    this.date = date;
  }

  stringifyDate() {
    const day = this.date.getDate();
    const month = this.getMonth(this.date.getMonth());
    const year = this.date.getFullYear();

    return [day, month, year].join(' ');
  }

  private getMonth(month: number) {
    return this.month[month];
  }
}

export default DateFormatter;
