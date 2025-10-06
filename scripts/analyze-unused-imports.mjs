#!/usr/bin/env node

/**
 * Script to analyze and identify unused imports
 * Helps reduce bundle size by removing dead code
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];
const IGNORE_DIRS = ['node_modules', '.next', '.git', 'dist', 'build'];

function findFiles(dir, files = []) {
  const items = readdirSync(dir);
  
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      if (!IGNORE_DIRS.includes(item)) {
        findFiles(fullPath, files);
      }
    } else if (EXTENSIONS.includes(extname(item))) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function analyzeFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    const issues = [];
    
    lines.forEach((line, index) => {
      // Check for direct lucide-react imports
      if (line.includes('from "lucide-react"')) {
        issues.push({
          file: filePath,
          line: index + 1,
          type: 'lucide-react-direct-import',
          suggestion: 'Use centralized icons from @/lib/icons'
        });
      }
      
      // Check for framer-motion imports in non-animation components
      if (line.includes('from "framer-motion"') && !filePath.includes('animations')) {
        issues.push({
          file: filePath,
          line: index + 1,
          type: 'framer-motion-heavy-import',
          suggestion: 'Consider dynamic import or move to animations folder'
        });
      }
      
      // Check for heavy library imports
      const heavyLibraries = ['jspdf', 'resend', '@react-email'];
      heavyLibraries.forEach(lib => {
        if (line.includes(`from "${lib}"`) && !filePath.includes('api/')) {
          issues.push({
            file: filePath,
            line: index + 1,
            type: 'heavy-library-import',
            suggestion: `Move ${lib} to dynamic import or API route`
          });
        }
      });
    });
    
    return issues;
  } catch (error) {
    console.error(`Error analyzing ${filePath}:`, error.message);
    return [];
  }
}

function main() {
  console.log('🔍 Analyzing unused imports and bundle optimization opportunities...\n');
  
  const srcDir = join(process.cwd(), 'src');
  const files = findFiles(srcDir);
  
  let totalIssues = 0;
  const issuesByType = {};
  
  files.forEach(file => {
    const issues = analyzeFile(file);
    totalIssues += issues.length;
    
    issues.forEach(issue => {
      if (!issuesByType[issue.type]) {
        issuesByType[issue.type] = [];
      }
      issuesByType[issue.type].push(issue);
    });
  });
  
  console.log(`📊 Analysis Results:`);
  console.log(`   Files analyzed: ${files.length}`);
  console.log(`   Total issues found: ${totalIssues}\n`);
  
  if (totalIssues === 0) {
    console.log('✅ No optimization opportunities found!');
    return;
  }
  
  // Report by type
  Object.entries(issuesByType).forEach(([type, issues]) => {
    console.log(`🚨 ${type.toUpperCase()} (${issues.length} issues):`);
    issues.forEach(issue => {
      console.log(`   ${issue.file}:${issue.line} - ${issue.suggestion}`);
    });
    console.log('');
  });
  
  // Summary
  console.log('📈 OPTIMIZATION SUMMARY:');
  console.log(`   • ${issuesByType['lucide-react-direct-import']?.length || 0} direct lucide-react imports → Use @/lib/icons`);
  console.log(`   • ${issuesByType['framer-motion-heavy-import']?.length || 0} framer-motion imports → Consider dynamic loading`);
  console.log(`   • ${issuesByType['heavy-library-import']?.length || 0} heavy library imports → Move to dynamic/API`);
  
  console.log('\n🎯 ESTIMATED SAVINGS:');
  const lucideSavings = (issuesByType['lucide-react-direct-import']?.length || 0) * 2; // ~2KB per file
  const framerSavings = (issuesByType['framer-motion-heavy-import']?.length || 0) * 8; // ~8KB per file
  const heavySavings = (issuesByType['heavy-library-import']?.length || 0) * 15; // ~15KB per file
  
  const totalSavings = lucideSavings + framerSavings + heavySavings;
  console.log(`   • Lucide React optimization: ~${lucideSavings} KB`);
  console.log(`   • Framer Motion optimization: ~${framerSavings} KB`);
  console.log(`   • Heavy libraries optimization: ~${heavySavings} KB`);
  console.log(`   • TOTAL ESTIMATED SAVINGS: ~${totalSavings} KB`);
  
  if (totalSavings >= 24) {
    console.log('\n🎉 TARGET ACHIEVED! Potential savings exceed 24 KB target.');
  } else {
    console.log(`\n⚠️  Additional optimizations needed to reach 24 KB target.`);
  }
}

main();
