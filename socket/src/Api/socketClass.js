// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');
import io from 'socket.io-client';
const ENDPOINT = "wss://dev.picnicapp.link/";
const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmYzNWM1YzE5OThhNWNjNjgyYWJlNjYiLCJjdXJyZW50RW52IjoiZGV2ZWxvcG1lbnQiLCJpYXQiOjE2NjgwODQ5NDMsImV4cCI6MTY3MDY3Njk0M30.9bhtd7Ot6LOWM5SsQ3ZkqUuk_xy8UKEfKy017dNYN0A"
var socket = io(ENDPOINT, {
    extraHeaders: {
        Authorization: authToken ? ("Bearer " + authToken) : "",
        'Accept-Language': "en",
        version: '1'
    }
});socket.connect();

class SocketClass {
	constructor(std, roll, firstName, lastName, subjects) {
	  this._std = std;
	  this._roll = roll;
	  this._firstName = firstName;
	  this._lastName = lastName;
	  this._subjects = subjects;
	}
  
	get std() {
	  return this._std;
	}
  
	get roll() {
	  return this._roll;
	}
  
	get firstName() {
	  return this._firstName;
	}
  
	get subjects() {
	  return this._subjects;
	}
  
	get lastName() {
	  return this._lastName;
	}
  
	set firstName(firstName) {
	  this._firstName = firstName.toUpperCase();
	}
  
	set std(stdValue) {
	  this._std = stdValue;
	}
  
	set subjects(subjects) {
	  this._subjects = subjects.charAt(0).toUpperCase() + subjects.slice(1);
	}
  
	set roll(rollValue) {
	  this._roll = rollValue;
	}
  
	set lastName(rollValue) {
	  this._lastName = rollValue;
	}
  }
  