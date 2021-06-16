import React, { useState, useEffect } from "react";
import ReactGA, { OutboundLink } from "react-ga";
import TextTransition, { presets } from "react-text-transition";
import moment from "moment";

ReactGA.initialize('G-WMK4HE7N2W');

function App() {
  const endDate = moment([2023, 4, 29]);
  const [countDown, setCountDown] = useState(
    moment.duration(endDate.diff(moment()))
  );

  useEffect(() => {
    if (typeof window !== `undefined`) {
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setCountDown(moment.duration(endDate.diff(moment())));
    }, 1000);
    return () => clearInterval(id);
  }, [endDate]);

  const getValue = (duration, unit) => {
    const time = duration.toString().length < 2 ? `0${duration}` : duration;
    const idealUnit = duration !== 1 ? `${unit}s` : unit;
    return (
      <>
        <TextTransition
          text={time}
          spring={presets.noWobble}
          className="time"
        />

        <span className="unit">{idealUnit}</span>
      </>
    );
  };

  return (
    <div className="app">
      {moment().isSameOrBefore(endDate) ? (
        <h1 className="heading">Buhari's Tenure Will be Over in</h1>
      ) : (
        <h1 className="heading">
          Buhari's Tenure is Over!!{" "}
          <span role="img" aria-label="confetti ball">
            🎉🎉🎉
          </span>
        </h1>
      )}
      <div className="countdown">
        <div className="time__unit">{getValue(countDown.years(), "Year")}</div>
        <div className="time__unit">
          {getValue(countDown.months(), "Month")}
        </div>
        <div className="time__unit">{getValue(countDown.days(), "Day")}</div>
        <div className="time__unit">{getValue(countDown.hours(), "Hour")}</div>
        <div className="time__unit">
          {getValue(countDown.minutes(), "Minute")}
        </div>
        <div className="time__unit">
          {getValue(countDown.seconds(), "Second")}
        </div>
      </div>
      <div className="bottom__emoji">
        {moment().isSameOrBefore(endDate) && (
          <span role="img" aria-label="unamused">
            😒😒😒
          </span>
        )}
      </div>
      <footer className="footer">
        <p>
          Made with{" "}
          <span role="img" aria-label="love">
            ❤️
          </span>{" "}
          by{" "}
          <OutboundLink
            className="footer__link"
            eventLabel="visitNaz"
            target="_blank"
            to="https://twitter.com/codenaz"
          >
            codenaz
          </OutboundLink>{" "}
          &{" "}
          <OutboundLink
            className="footer__link"
            eventLabel="visitCas"
            target="_blank"
            to="https://twitter.com/remiilekun"
          >
            casper
          </OutboundLink>
          .
        </p>
      </footer>
    </div>
  );
}

export default App;
