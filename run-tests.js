const { spawn } = require('child_process');
const path = require('path');

// Change directory and run command
const cwd = path.resolve(__dirname, 'album-api-v2');
console.log(`Working directory: ${cwd}\n`);

console.log('=== Running Tests ===\n');
const child = spawn('npm', ['test'], {
  cwd,
  shell: true,
  stdio: 'inherit',
  env: { ...process.env, FORCE_COLOR: '1' }
});

child.on('close', (code) => {
  if (code === 0) {
    console.log('\n✓ Tests completed successfully!');
  } else {
    console.error(`\n✗ Tests failed with code ${code}`);
    process.exit(code);
  }
});
