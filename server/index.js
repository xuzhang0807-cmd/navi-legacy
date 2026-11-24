import { createNaviServer } from './app.js';

function start() {
  const { server, database, host, port } = createNaviServer();
  let stopping = false;
  function stop() {
    if (stopping) return;
    stopping = true;
    server.close(() => database.close());
  }
  server.once('error', error => {
    console.error('Navi server failed:', error.code || error.name);
    process.exitCode = 1;
    stop();
  });
  server.listen(port, host, () => {
    const address = server.address();
    const boundHost = address.family === 'IPv6' ? `[${address.address}]` : address.address;
    console.log(`Navi listening on http://${boundHost}:${address.port}`);
  });
  for (const signal of ['SIGTERM', 'SIGINT']) process.once(signal, stop);
}

try {
  start();
} catch (error) {
  console.error('Navi startup failed:', error.message);
  process.exitCode = 1;
}
