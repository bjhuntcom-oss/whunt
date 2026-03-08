const fs = require('fs');
const path = require('path');

// Fix critical number to string conversion errors in controllers
function fixControllerFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Fix specific patterns for analytics and automation controllers
    const patterns = [
      // Fix channelId: number to string
      {
        regex: /channelId:\s*(\d+)/g,
        replacement: (match, num) => {
          modified = true;
          return `channelId: ${num}.toString()`;
        }
      },
      // Fix userId: number to string  
      {
        regex: /userId:\s*(\d+)/g,
        replacement: (match, num) => {
          modified = true;
          return `userId: ${num}.toString()`;
        }
      },
      // Fix function parameters expecting string but receiving number
      {
        regex: /\.(\w+)\((\d+)\)/g,
        replacement: (match, method, num) => {
          if (method.includes('Id') || method.includes('id')) {
            modified = true;
            return `.${method}(${num}.toString())`;
          }
          return match;
        }
      }
    ];
    
    patterns.forEach(pattern => {
      const original = content;
      content = content.replace(pattern.regex, pattern.replacement);
      if (original !== content) modified = true;
    });
    
    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`Fixed: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error.message);
    return false;
  }
}

// Fix specific controller files
const filesToFix = [
  './server/controllers/analytics.controller.ts',
  './server/controllers/automation.controller.ts',
  './server/controllers/channels.controller.ts',
  './server/controllers/contacts.controller.ts',
  './server/controllers/messages.controller.ts'
];

let fixedCount = 0;
filesToFix.forEach(file => {
  if (fs.existsSync(file) && fixControllerFile(file)) {
    fixedCount++;
  }
});

console.log(`\nFixed ${fixedCount} controller files with critical TypeScript errors`);

// Verify the fixes
const { execSync } = require('child_process');
try {
  console.log('\nChecking remaining TypeScript errors...');
  const result = execSync('npx tsc --noEmit --skipLibCheck 2>&1 | findstr /i "server.*error" | find /c /v ""', { 
    encoding: 'utf8',
    stdio: 'pipe'
  });
  const errorCount = parseInt(result.trim());
  console.log(`Remaining server TypeScript errors: ${errorCount}`);
} catch (error) {
  console.log('TypeScript check completed');
}

console.log('Critical TypeScript error fixing completed!');
