import { useEffect, useState } from "react";
import PropsType from "prop-types";
const Clock = ({ deadline }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(125);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const getTimeUntil = (deadline) => {
    const time = Date.parse(deadline) - Date.parse(new Date());
    if (time < 0) {
      setDays(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    } else {
      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    }
  };

  useEffect(() => {
    let interval = setInterval(() => getTimeUntil(deadline), 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  return (
    <>
      {days ? days + ":" : ""}
      {hours ? hours + ":" : ""}
      {minutes ? minutes + ":" : ""}
      {seconds ? seconds : 0}
    </>
  );
};

Clock.propTypes = {
  deadline: PropsType.string.isRequired,
};

export default Clock;