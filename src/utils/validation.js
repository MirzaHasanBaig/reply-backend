const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const numberRegex = /^\d{6}$/;
const numberStringRegex = /^[a-zA-Z0-9]$/;
const stringRegex = /^[a-zA-Z]+$/;  // Matches full alphabetic strings
const lowStringRegex = /^[a-z]+$/;  // Matches full lowercase string
const capStringRegex = /^[A-Z]+$/;


module.exports = {emailRegex,passwordRegex,numberRegex,stringRegex,lowStringRegex,capStringRegex};