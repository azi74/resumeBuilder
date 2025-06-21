import handlebars from 'handlebars'

export const registerHandlebarsHelpers = () => {
  handlebars.registerHelper('formatDate', (date) => {
    if (!date) return 'Present'
    const d = new Date(date)
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  })

  handlebars.registerHelper('join', (array, separator) => {
    return array.join(separator)
  })

  handlebars.registerHelper('times', (n, block) => {
    let accum = ''
    for (let i = 1; i <= n; i++) {
      accum += block.fn(i)
    }
    return accum
  })

  handlebars.registerHelper('lte', (a, b) => {
    return a <= b
  })
}