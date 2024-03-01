import Debug from 'debug'

export const logger = {
  log: Debug('app:log'),
  error: Debug('app:error'),
  warn: Debug('app:warn'),
  info: Debug('app:info'),
  debug: Debug('app:debug'),
  trace: Debug('app:trace'),
}
