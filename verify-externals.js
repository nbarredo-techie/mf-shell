// Quick verification script to check bundle externalization
const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, 'dist', 'terraboost-mf-shell.js');

try {
  const bundleContent = fs.readFileSync(bundlePath, 'utf8');
  
  console.log('🔍 Bundle Analysis:');
  console.log(`📦 Bundle Size: ${(fs.statSync(bundlePath).size / 1024).toFixed(2)} KB`);
  // Check for external imports (ES module format)
  const hasReactExternal = bundleContent.includes('from"react"');
  const hasReactDOMExternal = bundleContent.includes('from"react-dom') || bundleContent.includes('from"react-dom/client"');
  const hasSharedUIExternal = bundleContent.includes('from"shared-ui"');
  const hasJSXRuntime = bundleContent.includes('from"react/jsx-runtime"');
    console.log('\n🔗 External Dependencies:');
  console.log(`✅ React externalized: ${hasReactExternal ? 'YES' : 'NO'}`);
  console.log(`✅ ReactDOM externalized: ${hasReactDOMExternal ? 'YES' : 'NO'}`);
  console.log(`✅ SharedUI externalized: ${hasSharedUIExternal ? 'YES' : 'NO'}`);
  console.log(`✅ JSX Runtime externalized: ${hasJSXRuntime ? 'YES' : 'NO'}`);
  
  // Check if React code is bundled (should be minimal)
  const hasReactCode = bundleContent.includes('createElement') && bundleContent.length > 50000;
  console.log(`❌ React code bundled: ${hasReactCode ? 'YES (Problem!)' : 'NO (Good!)'}`);
  
  if (hasReactExternal && hasReactDOMExternal && hasSharedUIExternal && hasJSXRuntime) {
    console.log('\n🎉 React Externalization: SUCCESS!');
    console.log('The micro-frontend is now properly configured to use external React dependencies.');
  } else {
    console.log('\n⚠️  Some dependencies may not be properly externalized.');
  }
  
} catch (error) {
  console.error('❌ Error reading bundle:', error.message);
}
