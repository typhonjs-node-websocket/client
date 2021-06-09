export function getTime()
{
   const date = new Date();
   return { hour: date.getHours(), min: date.getMinutes(), sec: date.getSeconds(), ms: date.getMilliseconds() };
}

export function getTimeString()
{
   const data = getTime();

   /* c8 ignore next 3 */
   data.hour = data.hour < 10 ? data.hour = `0${data.hour}` : data.hour.toString();
   data.min = data.min < 10 ? data.min = `0${data.min}` : data.min.toString();
   data.sec = data.sec < 10 ? data.sec = `0${data.sec}` : data.sec.toString();

   return `[${data.hour}:${data.min}:${data.sec}.${data.ms}]`;
}
