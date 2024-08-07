var blocks = [
    {
      "gym": false,
      "school": true,
      "store": false
    }, {
      "gym": true,
      "school": false,
      "store": false
    }, {
      "gym": true,
      "school": true,
      "store": true
    }, {
      "gym": false,
      "school": true,
      "store": false
    }, {
      "gym": false,
      "school": true,
      "store": true
    }];
var reqs = ["gym", "school", "store"];

const MAX_VALUE = 1000;
var leftCounters = {};
reqs.forEach(prop => {
  leftCounters[prop] = MAX_VALUE;
});

let [current, maximums] = findBestApartment(reqs, blocks, 0, leftCounters);
let result = maximums
  .map((el, index) => [el, index])
  .reduce((prev, next) => prev[0] < next[0] ? prev : next);
console.log("apartment index = " + result[1]);


function findBestApartment(reqs, blocks, index, leftCounters) {
  if (index >= blocks.length) {
    let response = {};
    reqs.forEach(prop => {
      response[prop] = MAX_VALUE;
    });
    return [response, []];
  } else {
    
    let current = {};
    reqs.forEach(prop => {
      if (blocks[index][prop]) {
        current[prop] = 0;
      } else {
        current[prop] = leftCounters[prop] + 1;
      }
    })
    
    console.log(current);
    
    var [rightCounters, maximums] = findBestApartment(reqs, blocks, index + 1, {...current});
    
    reqs.forEach(prop => {
      current[prop] = Math.min(current[prop], rightCounters[prop] + 1);
    });
    
    /*
    The longest we need to walk to a facility, that will be the rank assigned to an apartment.
    The less is better.
    */
    let maxPath = -1;
    reqs.forEach(prop => {
      maxPath = Math.max(maxPath, current[prop]);
    });
    
    
    let result = [current, [maxPath, ...maximums]];
    console.log(result);
    return result;
  }
}
