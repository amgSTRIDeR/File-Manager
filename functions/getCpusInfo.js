import os from 'os';
import showMessage from './showMessage.js';

export default function getCpusInfo() {
  const cpus = os.cpus();

  showMessage(`overall amount of CPUS: ${cpus.length}`, 'yellow');

  cpus.forEach((cpu, index) => {
    showMessage(
      `CPU ${index + 1}: ${cpu.model} - ${cpu.speed / 1000} GHz`,
      'yellow'
    );
  });
}
