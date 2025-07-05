enum EStatusLogging {
  Info = 'INFO',
  Error = 'ERROR',
}
const log = {
  info: (msg: string, data?: any) => {
    console.info(
      `[${EStatusLogging.Info}] ${msg} ${data ? JSON.stringify(data) : ''}`
    );
  },
  error: (msg: string, data?: any) => {
    console.error(
      `[${EStatusLogging.Error}] ${msg} ${data ? JSON.stringify(data) : ''}`
    );
  },
};

export default log;
