enum EStatusLogging {
  Info = 'INFO',
  Error = 'ERROR',
}
const logging = {
  info: (msg: string) => {
    console.info(`[${EStatusLogging.Info}] ${msg}`);
  },
  error: (msg: string) => {
    console.error(`[${EStatusLogging.Error}] ${msg}`);
  },
};

export default logging;
