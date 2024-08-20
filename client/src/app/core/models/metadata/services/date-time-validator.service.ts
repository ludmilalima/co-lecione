import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DateTimeValidatorService {
    private static regex: RegExp = /^\d{4}(-\d{2}(-\d{2}(T\d{2}(:\d{2}(:\d{2}(\.\d+)?(Z|[+-]\d{2}(:\d{2})?)?)?)?)?)?)?$/;

    constructor() { }

    public isValidDateTime(dateTimeString: string): boolean {
        // First check if it matches the regex pattern
        if (!DateTimeValidatorService.regex.test(dateTimeString)) {
            return false;
        }

        // Split the date-time string into its components
        const dateTimeParts = dateTimeString.split('T');
        const datePart = dateTimeParts[0];
        const timePart = dateTimeParts[1] || '';

        // Validate the date part
        const dateComponents = datePart.split('-').map(Number);
        if (!this.isValidDate(dateComponents)) {
            return false;
        }

        // Validate the time part (if present)
        if (timePart) {
            const timeComponents = this.extractTimeComponents(timePart);
            if (!this.isValidTime(timeComponents)) {
                return false;
            }
        }

        return true;
    }

    private isValidDate([year, month, day]: number[]): boolean {
        if (year < 1 || month < 1 || month > 12) {
            return false; // Year must be ≥ 0001 and month must be 01-12
        }

        // Check for valid days in the month
        const daysInMonth = this.getDaysInMonth(year, month);
        return day >= 1 && day <= daysInMonth;
    }

    private getDaysInMonth(year: number, month: number): number {
        const monthDays = [31, (this.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return monthDays[month - 1]; // Months are 1-indexed in the input
    }

    private isLeapYear(year: number): boolean {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    private extractTimeComponents(timeString: string): number[] {
        const timeParts = timeString.split(':').map(Number);
        return timeParts.map((part, index) => (index < 3 && isNaN(part)) ? 0 : part); // Default to 0 for missing components
    }

    private isValidTime([hh, mm = 0, ss = 0]: number[]): boolean {
        // Validate hours, minutes, and seconds
        return (
            hh >= 0 && hh <= 23 &&
            mm >= 0 && mm <= 59 &&
            ss >= 0 && ss <= 59
        );
    }
}
