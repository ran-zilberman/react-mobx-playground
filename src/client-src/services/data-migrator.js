/**
 * Created by Ran_Zilberman on 17/05/2016.
 */

import { Parser } from 'xml2js'

// ============================================================================
// Private methods
// ============================================================================

const unCamelCase = (str) => {
  return str
  // insert a space between lower & upper
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    // space before last upper in a sequence followed by lower
    .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
    // uppercase the first character
    .replace(/^./, function(str){ return str.toUpperCase(); })
};

const toHumanReadableObject = (data) => {
  if(!data) return data;

  const result = Array.isArray(data) ? [] : {};

  Object.entries(data).forEach(([key, value]) => {
    let hrValue = value;
    if(Array.isArray(value) || typeof value == 'object'){
      hrValue = toHumanReadableObject(value);
    }
    result[unCamelCase(key)] = hrValue
  });

  return result;
};

class DataMigrator {

  getReadableData(data) {
    return toHumanReadableObject(data);
  }

}

export default new DataMigrator();
