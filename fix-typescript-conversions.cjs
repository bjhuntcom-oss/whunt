const fs = require('fs');
const path = require('path');

// Fix number to string conversion errors
const fixes = [
  {
    pattern: /\.toString\(\)/g,
    replacement: '.toString()'
  }
];

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Fix number to string conversions by adding .toString()
    content = content.replace(/(\w+)\.(\w+)\((\d+)\)/g, (match, obj, method, num) => {
      if (method.includes('Id') || method.includes('Id') || method.includes('id')) {
        modified = true;
        return `${obj}.${method}(${num}.toString())`;
      }
      return match;
    });
    
    // Fix specific patterns for analytics and automation controllers
    content = content.replace(/channelId: (\d+)/g, (match, num) => {
      modified = true;
      return `channelId: ${num}.toString()`;
    });
    
    content = content.replace(/userId: (\d+)/g, (match, num) => {
      modified = true;
      return `userId: ${num}.toString()`;
    });
    
    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`Fixed: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error.message);
  }
}

// Fix specific controller files
const filesToFix = [
  './server/controllers/analytics.controller.ts',
  './server/controllers/automation.controller.ts'
];

filesToFix.forEach(file => {
  if (fs.existsSync(file)) {
    fixFile(file);
  }
});

console.log('TypeScript conversion fixing completed!');
