export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validatePhone = (phone: string): boolean => {
  const re = /^\+?[\d\s-]{10,}$/
  return re.test(phone)
}

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0
}