
class Point {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }
}

let points = [
  new Point(0, 10), 
  new Point(0, 0), 
  new Point(20, 10),
  new Point(10, 10), 
  new Point(10, 0), 
  new Point(20, 0),
  new Point(5, 2)
];


let squares = combinations(points, [], 0);

squares.forEach(square => {
  let dataPermutations = permutations(square);
  
  //If we want to check a square which is rotated we just need to use 
  //pythagorean theorem to verify if there is a right angle on each vertex.
  
  let isSquare = dataPermutations.some(per =>
      per[0].x == per[1].x && per[2].x == per[3].x
      && per[0].y == per[2].y && per[1].y == per[3].y);
      
  if (isSquare) {
    console.log('Square ' + JSON.stringify(square));
  }
});
  

function combinations(alphabet, combination, index) {
  if (combination.length == 4) {
    return [combination];
  } else {
    let result = [];
    for (let i=index; i<alphabet.length; i++) {
        let partialResult = combinations(alphabet, [...combination, alphabet[i]], i + 1);
        partialResult.forEach(el => result.push(el));
    }
    return result;
  }
}

function permutations(data) {
  if (data.length == 1) {
    return [data];
  } else {
    let result = [];
    for (let i=0; i<data.length; i++) {
      let copy = [...data.slice(0, i), ...data.slice(i + 1)];
      let partialResult = permutations(copy);
      partialResult
        .map(p => [data[i], ...p])
        .forEach(p => result.push(p));
    }
    return result;
  }
}
