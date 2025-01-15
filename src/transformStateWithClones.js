'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let modyState = { ...state };

  function removeProp(obj, properties) {
    for (const property of properties) {
      delete obj[property];
    }
  }

  function clear(obj) {
    for (const key of Object.keys(obj)) {
      delete obj[key];
    }
  }

  function addProp(obj, properties) {
    Object.assign(obj, properties);
  }

  for (const action of actions) {
    const newObj = { ...modyState };

    switch (action.type) {
      case 'addProperties':
        addProp(newObj, action.extraData);
        break;

      case 'removeProperties':
        removeProp(newObj, action.keysToRemove);
        break;

      case 'clear':
        clear(newObj);
    }

    result.push(newObj);
    modyState = newObj;
  }

  return result;
}

module.exports = transformStateWithClones;
