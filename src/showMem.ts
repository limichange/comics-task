import * as fs from 'fs-extra'

export function showMem() {
  const mem = process.memoryUsage()
  const format = function (bytes) {
    return (bytes / 1024 / 1024).toFixed(2) + 'MB'
  }
  const info =
    'Process1: heapTotal ' +
    format(mem.heapTotal) +
    ' heapUsed ' +
    format(mem.heapUsed) +
    ' rss ' +
    format(mem.rss) +
    '\n'

  fs.appendFile('mem.txt', info)
}
