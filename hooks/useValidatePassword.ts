export default function validatePassword(password) {
  if (/[A-Z]/.test(password) === false) {
    return false
  }
  else if (/[0-9]/.test(password) === false) {
    return false
  }
  else if (/[!@#$%^&*]/.test(password) === false) {
    return false
  }
  else {
    return true
  }
}