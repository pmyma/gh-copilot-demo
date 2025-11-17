const { execSync } = require('child_process');
const path = require('path');

const apiDir = path.join(__dirname, 'album-api-v2');

console.log('Building album-api-v2...');
try {
  execSync('npm run build', { cwd: apiDir, stdio: 'inherit' });
  console.log('✓ Build successful\n');
  
  console.log('Running tests...');
  execSync('npm test', { cwd: apiDir, stdio: 'inherit' });
  console.log('\n✓ All tests passed!');
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
