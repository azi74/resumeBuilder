export const formatDate = (date: Date | string): string => {
  if (!date) return 'Present'
  const d = new Date(date)
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export const getDuration = (startDate: Date | string, endDate?: Date | string): string => {
  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : new Date()
  
  const years = end.getFullYear() - start.getFullYear()
  const months = end.getMonth() - start.getMonth()
  
  let duration = ''
  if (years > 0) duration += `${years} ${years === 1 ? 'yr' : 'yrs'} `
  if (months > 0) duration += `${months} ${months === 1 ? 'mo' : 'mos'}`
  
  return duration.trim() || '0 mos'
}