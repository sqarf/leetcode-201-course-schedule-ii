/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
const findOrder = (numCourses, prerequisites) => {
  // Initialize result array
  const result = new Array(numCourses).fill(0)
  const inDegree = new Array(numCourses).fill(0);

  for (const pre of prerequisites) {
    inDegree[pre[0]]++
  }

  const zeroDegree = [];

  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      zeroDegree.push(i);
    }
  }

  // Topological sort not possible
  if (zeroDegree.length === 0) return []

  let i = 0
  while (zeroDegree.length) {
    const course = zeroDegree.pop()
    // Add course to the result array
    result[i++] = course
    for (const pre of prerequisites) {
      if (course === pre[1]) {
        inDegree[pre[0]]--
        if (inDegree[pre[0]] === 0) {
          zeroDegree.push(pre[0])
        }
      }
    }
  }

  // Topological sort not possible
  for (const num of inDegree) {
    if (num !== 0) return []
  }

  return result;
};

// Ex.1
console.log(
  findOrder(2, [[1,0]])
)

// Ex.2
console.log(
  findOrder(4, [[1,0],[2,0],[3,1],[3,2]])
)

// Ex.3
console.log(
  findOrder(1, [])
)
