/**
 * Core factory functionality module.
 * 
 * This module provides the essential functions for the mock data generation system.
 * It handles path resolution, data structure creation, and key management
 * for the factory system. It serves as the backbone for all data generation
 * operations, ensuring consistency across the mock server.
 */

import path from 'path';
import { fileURLToPath } from 'url';
import * as fileUtils from '../utils/fileUtils.js';

// Constants
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '..');
const FACTORY_FOLDER = path.join(PROJECT_ROOT, 'factory');
const DB_DIR = path.join(PROJECT_ROOT, 'db');
const OUTPUT_FILE = path.join(PROJECT_ROOT, 'db.json');

/**
 * Create mock data based on configuration and template
 * @param {Object} config - Configuration with _key and _repeat options
 * @param {Function} templateFn - Template function that generates data
 * @returns {Object} Created data with appropriate key
 * @throws {Error} If _repeat value is negative
 * @throws {Error} If _key is missing, empty, null or undefined
 */
export const createMockData = (config, templateFn) => {
  // Validate key
  if (!('_key' in config)) {
    throw new Error('_key must be specified in configuration');
  }
  
  if (typeof config._key !== 'string' || config._key.trim() === '') {
    throw new Error('_key cannot be empty or non-string value');
  }
  
  const hasExplicitRepeat = '_repeat' in config;
  const count = config._repeat || 1;
  
  // Validate repeat count
  if (count < 0) {
    throw new Error(`_repeat value cannot be negative (received ${count})`);
  }
  
  const key = config._key;
  const dataKey = config._dataKey || key;
  const paginationKey = config._paginationKey;
  const paginationData = config._paginationData;
  
  let data;
  if (hasExplicitRepeat || count > 1) {
    data = Array.from({ length: count }, (_, i) => {
      const item = { ...templateFn(i) };
      delete item._repeat;
      if (config.noId) {
        return { ...item };
      } else {
        const id = i + 1;
        return { id, ...item };
      }
    });
  } else {
    const item = { ...templateFn(0) };
    delete item._repeat;
    if (config.noId) {
      data = { ...item };
    } else {
      const id = 1;
      data = { id, ...item };
    }
  }

  // Compose result object
  const result = { [dataKey]: data };
  if (paginationKey && paginationData) {
    result[paginationKey] = paginationData;
  }

  return { key, data: result };
};

/**
 * Extract keys from factory files
 * @returns {Promise<Set<string>>} Set of keys found in factory files
 */
export const extractFactoryKeys = async () => {
  try {
    const jsFiles = await fileUtils.readDirectoryFiles(FACTORY_FOLDER, /\.js$/);
    const keys = new Set();

    for (const file of jsFiles) {
      const filePath = path.join(FACTORY_FOLDER, file);
      const fileContent = await import('fs').then(fs => 
        fs.promises.readFile(filePath, 'utf8'));
      
      // Extract _key
      const matchKey = fileContent.match(/_key:\s*["']([^"']+)["']/);
      if (matchKey) {
        keys.add(matchKey[1]);
      }
      // Extract _dataKey
      const matchDataKey = fileContent.match(/_dataKey:\s*["']([^"']+)["']/);
      if (matchDataKey) {
        keys.add(matchDataKey[1]);
      }
    }

    return keys;
  } catch (error) {
    console.error('Error extracting keys:', error);
    throw error;
  }
};

/**
 * Get paths to important directories and files
 * @returns {Object} Object containing paths
 */
export const getPaths = () => ({
  factoryFolder: FACTORY_FOLDER,
  dbDir: DB_DIR,
  outputFile: OUTPUT_FILE
});
