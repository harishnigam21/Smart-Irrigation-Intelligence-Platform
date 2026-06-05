interface Point {
  lat: number;
  lng: number;
}

export const analyzePolygonDimensions = (points: number[][]) => {
  if (points.length !== 4) {
    throw new Error("Exactly 4 sequential points are required.");
  }
  const getDistance = (p1: number[], p2: number[]) => {
    return Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2));
  };

  const s1 = getDistance(points[0], points[1]);
  const s2 = getDistance(points[1], points[2]);
  const s3 = getDistance(points[2], points[3]);
  const s4 = getDistance(points[3], points[0]);

  const d1 = getDistance(points[0], points[2]);
  const d2 = getDistance(points[1], points[3]);

  const perimeter = s1 + s2 + s3 + s4;

  const area =
    Math.abs(
      points[0][0] * points[1][1] +
        points[1][0] * points[2][1] +
        points[2][0] * points[3][1] +
        points[3][0] * points[0][1] -
        (points[0][1] * points[1][0] +
          points[1][1] * points[2][0] +
          points[2][1] * points[3][0] +
          points[3][1] * points[0][0]),
    ) / 2;

  const epsilon = 0.00001;
  const oppositeSidesEqual =
    Math.abs(s1 - s3) < epsilon && Math.abs(s2 - s4) < epsilon;
  const diagonalsEqual = Math.abs(d1 - d2) < epsilon;

  if (oppositeSidesEqual && diagonalsEqual) {
    return {
      shapeType: Math.abs(s1 - s2) < epsilon ? "Square" : "Rectangle",
      area,
      perimeter,
      dimensions: {
        length: Math.max(s1, s2),
        width: Math.min(s1, s2),
      },
    };
  } else {
    let type = "Quadrilateral";
    if (oppositeSidesEqual) type = "Parallelogram";
    if (
      Math.abs(s1 - s2) < epsilon &&
      Math.abs(s2 - s3) < epsilon &&
      Math.abs(s3 - s4) < epsilon
    )
      type = "Rhombus";

    return {
      shapeType: type,
      area,
      perimeter,
      dimensions: { s1, s2, s3, s4 },
    };
  }
};
