const fs = require('fs');

function fixPanelConfig() {
  const filePath = './server/controllers/panel.config.controller.ts';
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Fix null to undefined conversions
    const fixes = [
      {
        pattern: /logoPath = (.*?);/g,
        replacement: (match, value) => {
          if (value.includes('null')) {
            modified = true;
            return `logoPath = ${value.replace('null', 'undefined')};`;
          }
          return match;
        }
      },
      {
        pattern: /faviconPath = (.*?);/g,
        replacement: (match, value) => {
          if (value.includes('null')) {
            modified = true;
            return `faviconPath = ${value.replace('null', 'undefined')};`;
          }
          return match;
        }
      },
      {
        pattern: /logo2Path = (.*?);/g,
        replacement: (match, value) => {
          if (value.includes('null')) {
            modified = true;
            return `logo2Path = ${value.replace('null', 'undefined')};`;
          }
          return match;
        }
      }
    ];
    
    fixes.forEach(fix => {
      const original = content;
      content = content.replace(fix.pattern, fix.replacement);
      if (original !== content) modified = true;
    });
    
    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`Fixed panel.config.controller.ts`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error fixing panel.config.controller.ts:`, error.message);
    return false;
  }
}

fixPanelConfig();
