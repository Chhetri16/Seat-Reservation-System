
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  totalSeats: number = 80;                                 //Total no of seats
  seatsPerRow: number = 7;                                  // Per row seats
  lastRowSeats: number = 3;                                 //Seats no in last row
  rows: number = Math.floor(this.totalSeats / this.seatsPerRow);
  seats: any[][] = [];
  bookedSeats: Set<number> = new Set();

  constructor() {
    this.initializeSeats();
    /* Mark first 3 seats as booked by default, 
    this code will by default reserve first three seats which are booked as per our assumption*/

    for (let i = 1; i <= 3; i++) {
      this.bookedSeats.add(i);
      this.seats[0][i - 1].booked = true;
    }
  }

  initializeSeats() {
    let seatNumber = 1;
    for (let i = 0; i < this.rows; i++) {
      let rowSeats: any[] = [];
      for (let j = 0; j < this.seatsPerRow; j++) {
        rowSeats.push({ number: seatNumber, booked: false });
        seatNumber++;
      }
      this.seats.push(rowSeats);
    }
    // Last row with fewer seats
    let lastRow: any[] = [];
    for (let k = 0; k < this.lastRowSeats; k++) {
      lastRow.push({ number: seatNumber, booked: false });
      seatNumber++;
    }
    this.seats.push(lastRow);
  }
 // Each time the booked button in press the loop here works in a stack manner in a sequence.
  reserveSeats(numSeats: number) {
    let seatsToBook: number[] = [];
    let availableSeats: number[] = [];
    this.seats.forEach(row => {
      row.forEach(seat => {
        if (!seat.booked) {
          availableSeats.push(seat.number);
        }
      });
    });

    //If the legth is greater then zero then loop works otherwise it will indicate there no more seats are available.
    for (let i = 0; i < numSeats; i++) {
      if (availableSeats.length > 0) { 
        seatsToBook.push(availableSeats.shift()!);
      } else {
        console.log("No more seats available!");
        break;
      }
    }

    seatsToBook.forEach(seat => {               
      this.bookedSeats.add(seat);
      this.seats.forEach(row => {
        row.forEach(s => {
          if (s.number === seat) {        //This loop will iterate to if the identity condition is true.
            s.booked = true;
          }
        });
      });
    });

    console.log("Booked Seats:", seatsToBook);   //This will return the seat no in array form which can tell that how seats are booked
  }
}
