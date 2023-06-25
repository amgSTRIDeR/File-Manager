export default function greetings () {
  const commandLineArgs = process.argv.slice(2);
  const userName = commandLineArgs.filter(arg => arg.startsWith('--username=')).map(arg => arg.slice(11))[0] || 'Unknown User';
  console.log(`Welcome to the File Manager, ${userName}!`);
}