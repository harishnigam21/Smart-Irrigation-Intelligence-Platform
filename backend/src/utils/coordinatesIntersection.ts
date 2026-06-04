type CoorType = [number, number];
const getMetricMultiplier = (payload: number[]) => {
  const sum = payload.reduce((acc, cur) => acc + cur, 0);
  return (sum / payload.length) * (Math.PI / 180);
};
const getLatitudeLongitudeMultiplier = (
  payload: number[],
): { latitudeMultiplier: number; longitudeMultiplier: number } => {
  const thetaAvg = getMetricMultiplier(payload);
  return {
    latitudeMultiplier: 111132 - 566 * Math.cos(2 * thetaAvg),
    longitudeMultiplier: 111320 * Math.cos(thetaAvg),
  };
};
const get4Point = (C1: CoorType, C2: CoorType, C3: CoorType, C4: CoorType) => {
  const { latitudeMultiplier, longitudeMultiplier } =
    getLatitudeLongitudeMultiplier([C1[0], C2[0], C3[0], C4[0]]);
  const payload = [
    [C1, C1],
    [C2, C1],
    [C3, C1],
    [C4, C1],
  ];
  const result = payload.map((item) => {
    const y = (item[0][0] - item[1][0]) * latitudeMultiplier;
    const x = (item[0][1] - item[1][1]) * longitudeMultiplier;
    return [x, y];
  });
  return result;
};
const getSinglePoint = (C1: CoorType, C2: CoorType) => {
  const { latitudeMultiplier, longitudeMultiplier } =
    getLatitudeLongitudeMultiplier([C1[0], C2[0]]);
  const x = (C2[1] - C1[1]) * longitudeMultiplier;
  const y = (C2[0] - C1[0]) * latitudeMultiplier;
  return [x, y];
};
const checkNewFieldCoordinates = (
  C1: CoorType,
  C2: CoorType,
  C3: CoorType,
  C4: CoorType,
): string | null | CoorType[] => {
  const [a, b, c, d] = get4Point(C1, C2, C3, C4);
  const relate = {
    [a.toString()]: C1,
    [b.toString()]: C2,
    [c.toString()]: C3,
    [d.toString()]: C4,
  };
  const points: string | number[][] = checkPointContinuity([a, b, c, d]);
  if (typeof points === "string" && points.includes("error")) {
    return points;
  }
  if (Array.isArray(points)) {
    return points.map((item) => relate[item.toString()]);
  }
  return [];
};
// checkPointContinuity and return proper sequence of continuous point if possible
const checkPointContinuity = (points: number[][]): string | number[][] => {
  if (points.length < 3) {
    return "error:Less then 3 coordinates";
  }
  //Area for first 3 point
  const area =
    (1 / 2) *
    (points[0][0] * (points[1][1] - points[2][1]) +
      points[1][0] * (points[2][1] - points[0][1]) +
      points[2][0] * (points[0][1] - points[1][1]));
  if (area == 0) {
    return "error:Coordinates is not plane, it is straight line";
  }
  //minimum points at y axis
  let minYpoint = points[0];
  points.forEach((item) => {
    if (item[1] < minYpoint[1]) {
      minYpoint = item;
    }
  });
  const Angle = points
    .filter((item) => item[0] != minYpoint[0] || item[1] != minYpoint[1])
    .map((item) => {
      const deltaX = item[0] - minYpoint[0];
      const deltaY = item[1] - minYpoint[1];
      const result = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      return { point: item, angle: result };
    });
  Angle.sort((a, b) => a.angle - b.angle);
  const result = [minYpoint, ...Angle.map((item) => item.point)];
  return result;
};
export const coordinatesIntersection = (
  payloadA: {
    A: CoorType;
    B: CoorType;
    C: CoorType;
    D: CoorType;
  },
  payloadB: {
    A: CoorType;
    B: CoorType;
    C: CoorType;
    D: CoorType;
  },
): {
  success: boolean;
  message: string;
  alignedCoordinates?: CoorType[];
} => {
  if (Object.keys(payloadA).length != 4 || Object.keys(payloadB).length != 4) {
    return {
      success: false,
      message: `Not All Coordinates allocated`,
    };
  }
  //check if they are same
  const loadA = new Set(
    Object.values(payloadA).map((coord) => `${coord[0]},${coord[1]}`),
  );
  const check = Object.values(payloadB).every((item) =>
    loadA.has(`${item[0]},${item[1]}`),
  );
  if (check) {
    return {
      success: false,
      message: "error:Farm with same Coordinate already exist.",
    };
  }
  //First Check new Coordinates are valid or not
  const N1: CoorType = payloadB.A;
  const N2: CoorType = payloadB.B;
  const N3: CoorType = payloadB.C;
  const N4: CoorType = payloadB.D;
  const checkNewBee = checkNewFieldCoordinates(N1, N2, N3, N4) || [
    N1,
    N2,
    N3,
    N4,
  ]; //later this calculation will be done once at first iteration its aligned coordinate will be stored so that next iteration of same loop can no that this already completed and by pass it
  if (checkNewBee && typeof checkNewBee === "string") {
    return {
      success: false,
      message: checkNewBee,
    };
  }
  //then go for next steps
  const C1: CoorType = payloadA.A;
  const C2: CoorType = payloadA.B;
  const C3: CoorType = payloadA.C;
  const C4: CoorType = payloadA.D;
  const [a, b, c, d] = get4Point(C1, C2, C3, C4);
  const points: string | number[][] = checkPointContinuity([a, b, c, d]);
  if (typeof points === "string" && points.includes("error")) {
    return {
      success: false,
      message: points,
    };
  }
  const checkingCoordinates = Object.values(payloadB);
  if (Array.isArray(points)) {
    let finalpoints: number[][][] = [];
    for (let i = 0; i < points.length; i++) {
      if (i == points.length - 1) {
        finalpoints.push([points[i], points[0]]);
      } else {
        finalpoints.push([points[i], points[i + 1]]);
      }
    }
    let newFieldPoint = [];
    for (let i = 0; i < checkingCoordinates.length; i++) {
      const x = getSinglePoint(C1, checkingCoordinates[i]);
      newFieldPoint.push({ coordinate: checkingCoordinates[i], point: x });
      const result: number[] = finalpoints.map((item) => {
        let condition1 = false;
        let condition2 = false;
        let a;
        let b;
        if (item[0][1] < item[1][1]) {
          a = item[0][1];
          b = item[1][1];
        } else {
          a = item[1][1];
          b = item[0][1];
        }
        condition1 = a <= x[1] && x[1] < b;
        const result =
          item[0][0] +
          ((x[1] - item[0][1]) * (item[1][0] - item[0][0])) /
            (item[1][1] - item[0][1]);
        condition2 = x[0] < result;
        return condition1 && condition2 ? 1 : 0;
      });
      const finalResult = result?.reduce((acc, curr) => acc + curr, 0);
      if (finalResult % 2 !== 0) {
        return {
          success: true,
          message: "inside",
        };
      }
    }
    // Odd total crosses - Inside
    // Even total crosses - Outside
    const returnResult: {
      success: boolean;
      message: string;
      alignedCoordinates?: [number, number][];
    } = {
      success: true,
      message: "outside",
    };
    if (checkNewBee && Array.isArray(checkNewBee)) {
      returnResult.alignedCoordinates = checkNewBee;
    }
    return returnResult;
  } else {
    return {
      success: false,
      message: "error:Issue while calculating point",
    };
  }
};
// const result = coordinatesIntersection(
//   //Existing Field
//   {
//     A: [28.724533903459385, 77.2176415558456],
//     B: [28.724266426610185, 77.21742919555332],
//     C: [28.723808315194358, 77.21896047304601],
//     D: [28.724141573794515, 77.21908788919353],
//   },
//   //new Field

//   //perfect
//   //inside
//   //   {
//   //     A: [28.72427394468865, 77.2181964234403],
//   //     B: [28.72419317296716, 77.21816200564777],
//   //     C: [28.724138880986082, 77.21831029649913],
//   //     D: [28.724228656978244, 77.21834497020171],
//   //   },
//   //outside
//   {
//     A: [28.724073522336102, 77.21747262912622],
//     B: [28.724007274421933, 77.21744058048664],
//     D: [28.723976951509577, 77.21751567750304],
//     C: [28.72404181999924, 77.21754917466069],
//   },
//   //with error
//   //   {
//   //     A: [28.72427394468865, 77.2181964234403],
//   //     B: [28.724138880986082, 77.21831029649913],
//   //     C: [28.724138880986082, 77.21831029649913],
//   //     D: [28.724138880986082, 77.21831029649913],
//   //   },
// );
// console.dir(result, { depth: null });
