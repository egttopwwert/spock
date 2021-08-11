class Timer {
  constructor(prefix, duration, callbacks) {
    this.prefix = prefix;
    this.duration = duration;
    this.isRunning = false;

    if (callbacks) {
      let { timerDidUpdate, timerDidDestroy } = callbacks;

      this.timerDidUpdate = timerDidUpdate;
      this.timerDidDestroy = timerDidDestroy;
    }

    this.timer = null;
    this.startTime = null;
    this.elapsedTime = null;
    this.timeLeft = duration;
  }

  start = () => {
    this.isRunning = true;
    console.log(`${this.prefix} The timer was created.`);

    this.timer = setInterval(this.update);
    this.startTime = new Date();
  };

  destroy = () => {
    this.isRunning = false;
    console.log(`${this.prefix} The timer was destroyed.`);

    clearInterval(this.timer);

    if (this.timerDidDestroy) {
      this.timerDidDestroy();
    }

    this.timer = null;
    this.startTime = null;
    this.timeLeft = this.duration;
  };

  update = () => {
    this.elapsedTime = this.calcElapsedTime(this.startTime);
    this.timeLeft = this.calcTimeLeft(this.duration, this.elapsedTime);

    if (this.timerDidUpdate) {
      this.timerDidUpdate();
    }

    if (!this.timeLeft) {
      this.destroy();
    }
  };

  calcElapsedTime = (startTime) => {
    const currentTime = new Date();
    return (currentTime - startTime) / 1000;
  };

  calcTimeLeft = (duration, elapsedTime) => {
    const timeLeft = duration - elapsedTime;
    return timeLeft > 0 ? timeLeft : 0;
  };
}

export default Timer;