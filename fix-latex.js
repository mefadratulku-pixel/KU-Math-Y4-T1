const fs = require('fs');

function normalizeFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    let result = '';
    let inString = false;
    let stringContent = '';
    
    for (let i = 0; i < content.length; i++) {
        const c = content[i];
        
        if (c === '`' && (i === 0 || content[i-1] !== '\\')) {
            if (!inString) {
                inString = true;
                result += c;
                stringContent = '';
            } else {
                inString = false;
                
                // Use [\\s\\S] to match ANY character including newline
                let normalized = stringContent.replace(/\\+([\s\S])/g, (match, char) => {
                    let count = match.length - 1;
                    
                    if (char === '`') return '\\`';
                    if (char === '$') return '\\\\$';
                    if (/[a-zA-Z]/.test(char)) return '\\\\' + char;
                    if ('{},;%_&#'.includes(char)) return '\\\\' + char;
                    if (/\s/.test(char)) {
                        if (count > 1) return '\\\\\\\\' + char;
                        else return '\\' + char;
                    }
                    if ('()[]'.includes(char)) return '\\\\' + char;
                    
                    return '\\\\' + char;
                });
                
                normalized = normalized.replace(/'\+'/g, '+');
                
                result += normalized;
                result += c;
            }
        } else {
            if (inString) {
                stringContent += c;
            } else {
                result += c;
            }
        }
    }
    
    fs.writeFileSync(filePath, result, 'utf8');
    console.log("File normalized successfully!");
}

normalizeFile('src/data/courses.ts');
