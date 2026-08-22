export type QType = "mcq" | "tf" | "output";
export type Category =
  | "Overview & Hardware"
  | "Line Algorithms"
  | "Circle & Ellipse"
  | "2D Transforms & Clipping"
  | "3D & Projections";

export type Question = {
  id: number;
  type: QType;
  category: Category;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

const TF = ["True", "False"];

const bank: Omit<Question, "id">[] = [
  // Overview and Hardware
  {
    type: "mcq",
    category: "Overview & Hardware",
    question:
      "Which device is the primary output device in a traditional graphics system?",
    options: ["Plotter", "Video monitor", "Keyboard", "Digitizer"],
    answer: 1,
    explanation:
      "The video monitor (historically a CRT) is the primary output device that displays generated images.",
  },
  {
    type: "mcq",
    category: "Overview & Hardware",
    question: "In a refresh CRT, why must the picture be redrawn repeatedly?",
    options: [
      "The electron gun overheats",
      "Phosphor light decays quickly",
      "The frame buffer is too small",
      "The beam loses focus",
    ],
    answer: 1,
    explanation:
      "Phosphor emits light only briefly, so the image must be refreshed (typically 60+ times/sec) to avoid fading.",
  },
  {
    type: "mcq",
    category: "Overview & Hardware",
    question:
      "The number of horizontal and vertical points that can be displayed is called the:",
    options: ["Aspect ratio", "Persistence", "Resolution", "Refresh rate"],
    answer: 2,
    explanation:
      "Resolution is the maximum number of points that can be displayed without overlap.",
  },
  {
    type: "mcq",
    category: "Overview & Hardware",
    question: "Aspect ratio refers to the ratio of:",
    options: [
      "Refresh rate to persistence",
      "Horizontal to vertical points for equal-length lines",
      "Pixels to bit planes",
      "Frame rate to resolution",
    ],
    answer: 1,
    explanation:
      "Aspect ratio is the number of horizontal points to vertical points needed to produce equal-length lines in both directions.",
  },
  {
    type: "mcq",
    category: "Overview & Hardware",
    question: "In a raster-scan display, the picture is stored in a:",
    options: [
      "Display file",
      "Frame (refresh) buffer",
      "Cache line",
      "Vector list",
    ],
    answer: 1,
    explanation:
      "Raster systems store pixel intensity values in a frame buffer / refresh buffer.",
  },
  {
    type: "mcq",
    category: "Overview & Hardware",
    question: "Random-scan (vector) displays are best suited for:",
    options: [
      "Photographs",
      "Filled area scenes",
      "Line drawings",
      "Video playback",
    ],
    answer: 2,
    explanation:
      "Vector displays draw lines directly between endpoints, ideal for smooth line drawings/wireframes.",
  },
  {
    type: "mcq",
    category: "Overview & Hardware",
    question:
      "Which colour CRT method uses three electron guns and a perforated metal plate?",
    options: ["Beam-penetration", "Shadow-mask", "Interlacing", "Dithering"],
    answer: 1,
    explanation:
      "The shadow-mask method uses R, G, B guns and a mask so each beam hits only its phosphor dot.",
  },
  {
    type: "mcq",
    category: "Overview & Hardware",
    question: "The beam-penetration method is typically used with:",
    options: [
      "Raster-scan monitors",
      "Random-scan monitors",
      "LCD panels",
      "Plasma panels",
    ],
    answer: 1,
    explanation:
      "Beam-penetration is a low-cost technique used mainly in random-scan (vector) monitors and produces only a few colours.",
  },
  {
    type: "mcq",
    category: "Overview & Hardware",
    question: "Which is NOT a flat-panel display technology?",
    options: ["LCD", "Plasma", "LED", "CRT"],
    answer: 3,
    explanation:
      "CRT is a bulky vacuum-tube display, not a flat panel. LCD, LED and Plasma are flat-panel types.",
  },
  {
    type: "mcq",
    category: "Overview & Hardware",
    question: "CAD stands for:",
    options: [
      "Computer-Aided Design",
      "Colour Adjusted Display",
      "Central Access Device",
      "Computed Analog Data",
    ],
    answer: 0,
    explanation:
      "CAD = Computer-Aided Design, a major application area of computer graphics.",
  },
  {
    type: "mcq",
    category: "Overview & Hardware",
    question:
      "Turning large numeric or scientific data sets into charts and plots is called:",
    options: [
      "Rasterization",
      "Data visualization",
      "Clipping",
      "Rendering equation",
    ],
    answer: 1,
    explanation:
      "Data visualization converts numeric/scientific data into visual form to reveal patterns.",
  },
  {
    type: "mcq",
    category: "Overview & Hardware",
    question: "In an LCD panel, the liquid-crystal cells act as:",
    options: [
      "Electron guns",
      "Light valves",
      "Phosphor dots",
      "Capacitors only",
    ],
    answer: 1,
    explanation:
      "LCD cells control the passage of light like valves, depending on the applied voltage.",
  },
  {
    type: "tf",
    category: "Overview & Hardware",
    question:
      "Persistence is defined as the time it takes the emitted light from a phosphor to decay to one-tenth of its initial intensity.",
    options: TF,
    answer: 0,
    explanation:
      "Correct — persistence is the phosphor decay time to 1/10 of initial intensity.",
  },
  {
    type: "tf",
    category: "Overview & Hardware",
    question: "Raster-scan displays cannot render filled areas or photographs.",
    options: TF,
    answer: 1,
    explanation:
      "False — raster displays excel at filled areas and photographic images; vector displays cannot.",
  },
  {
    type: "tf",
    category: "Overview & Hardware",
    question:
      "A black-and-white raster system needs only one bit per pixel in the frame buffer.",
    options: TF,
    answer: 0,
    explanation:
      "True — one bit per pixel (on/off) suffices for monochrome; colour needs multiple bit planes.",
  },

  //  Line Algorithms
  {
    type: "mcq",
    category: "Line Algorithms",
    question: "DDA stands for:",
    options: [
      "Direct Draw Algorithm",
      "Digital Differential Analyzer",
      "Dual Draw Approximation",
      "Discrete Data Array",
    ],
    answer: 1,
    explanation:
      "DDA = Digital Differential Analyzer, an incremental line-drawing method.",
  },
  {
    type: "mcq",
    category: "Line Algorithms",
    question: "The main disadvantage of the DDA algorithm is:",
    options: [
      "It cannot draw vertical lines",
      "Floating-point operations and round-off error",
      "It requires a frame buffer",
      "It only works for circles",
    ],
    answer: 1,
    explanation:
      "DDA uses floating-point additions and rounding at each step, which is slow and accumulates error.",
  },
  {
    type: "mcq",
    category: "Line Algorithms",
    question: "In the DDA algorithm, the number of steps is chosen as:",
    options: [
      "|Δx| + |Δy|",
      "max(|Δx|, |Δy|)",
      "min(|Δx|, |Δy|)",
      "|Δx| × |Δy|",
    ],
    answer: 1,
    explanation:
      "Steps = max(|Δx|, |Δy|) so the sampled axis moves by one unit each step.",
  },
  {
    type: "mcq",
    category: "Line Algorithms",
    question:
      "For a line with slope |m| < 1, the DDA samples unit steps in which coordinate?",
    options: ["x", "y", "both", "neither"],
    answer: 0,
    explanation:
      "When |m| < 1 the line is more horizontal, so x is stepped by 1 and y incremented by m.",
  },
  {
    type: "mcq",
    category: "Line Algorithms",
    question:
      "Bresenham's line algorithm is preferred over DDA because it uses:",
    options: [
      "Only floating point",
      "Only integer arithmetic",
      "Matrix multiplication",
      "Recursion",
    ],
    answer: 1,
    explanation:
      "Bresenham's algorithm uses only integer add/subtract/shift, making it faster and exact.",
  },
  {
    type: "mcq",
    category: "Line Algorithms",
    question:
      "For 0 < m < 1, the initial decision parameter in Bresenham's algorithm is:",
    options: ["Δx − 2Δy", "2Δy − Δx", "Δy − Δx", "2Δx − Δy"],
    answer: 1,
    explanation:
      "p0 = 2Δy − Δx is the standard initial decision parameter for gentle slopes.",
  },
  {
    type: "mcq",
    category: "Line Algorithms",
    question: "In Bresenham's algorithm (0<m<1), if p_k < 0 the next pixel is:",
    options: ["(x_k+1, y_k)", "(x_k+1, y_k+1)", "(x_k, y_k+1)", "(x_k−1, y_k)"],
    answer: 0,
    explanation:
      "A negative decision parameter means the lower pixel (x_k+1, y_k) is closer to the true line.",
  },
  {
    type: "mcq",
    category: "Line Algorithms",
    question:
      "In Bresenham's algorithm (0<m<1), when p_k < 0 the parameter updates as:",
    options: ["p_k + 2Δy", "p_k + 2Δy − 2Δx", "p_k − 2Δx", "p_k + Δx"],
    answer: 0,
    explanation: "p_{k+1} = p_k + 2Δy when p_k < 0.",
  },
  {
    type: "mcq",
    category: "Line Algorithms",
    question: "The slope m of a line from (x1,y1) to (x2,y2) is:",
    options: [
      "(x2−x1)/(y2−y1)",
      "(y2−y1)/(x2−x1)",
      "(y2+y1)/(x2+x1)",
      "(x2+x1)/(y2+y1)",
    ],
    answer: 1,
    explanation: "Slope m = Δy/Δx = (y2−y1)/(x2−x1).",
  },
  {
    type: "output",
    category: "Line Algorithms",
    question:
      "A DDA draws from (2,2) to (5,5). How many pixels (including both endpoints) are plotted?",
    options: ["3", "4", "5", "6"],
    answer: 1,
    explanation: "steps = max(|3|,|3|) = 3, so 3+1 = 4 pixels are plotted.",
  },
  {
    type: "output",
    category: "Line Algorithms",
    question: "For a DDA line from (0,0) to (10,4), what are xinc and yinc?",
    options: ["1 and 0.4", "0.4 and 1", "1 and 1", "2.5 and 1"],
    answer: 0,
    explanation: "steps = max(10,4) = 10, xinc = 10/10 = 1, yinc = 4/10 = 0.4.",
  },
  {
    type: "tf",
    category: "Line Algorithms",
    question:
      "Bresenham’s algorithm can be generalised to draw circles as well as lines.",
    options: TF,
    answer: 0,
    explanation:
      "True — a midpoint/Bresenham-style decision approach also draws circles.",
  },
  {
    type: "tf",
    category: "Line Algorithms",
    question: "The DDA algorithm is completely free of rounding operations.",
    options: TF,
    answer: 1,
    explanation:
      "False — DDA rounds each computed coordinate to the nearest integer to plot a pixel.",
  },

  // Circle & Ellipse
  {
    type: "mcq",
    category: "Circle & Ellipse",
    question: "The midpoint circle algorithm exploits how many-way symmetry?",
    options: ["2-way", "4-way", "8-way", "16-way"],
    answer: 2,
    explanation:
      "A circle has 8-way symmetry, so one octant determines the whole circle.",
  },
  {
    type: "mcq",
    category: "Circle & Ellipse",
    question:
      "The initial decision parameter for the midpoint circle algorithm (starting at (0,r)) is:",
    options: ["1 − r", "r − 1", "5/4 − r", "2r"],
    answer: 0,
    explanation:
      "Using the integer form, p0 = 1 − r (the real form is 5/4 − r rounded).",
  },
  {
    type: "mcq",
    category: "Circle & Ellipse",
    question:
      "If a point (x, y) lies on a circle centred at origin, which is ALSO on the circle by symmetry?",
    options: ["(x, y+1)", "(y, x)", "(2x, 2y)", "(x+r, y)"],
    answer: 1,
    explanation: "(y, x) is one of the 8 symmetric reflections of (x, y).",
  },
  {
    type: "mcq",
    category: "Circle & Ellipse",
    question: "The midpoint circle algorithm processes the octant until:",
    options: ["x = 0", "x ≥ y", "y = 0", "x = r"],
    answer: 1,
    explanation:
      "It plots until x ≥ y, covering one 45° octant; symmetry gives the rest.",
  },
  {
    type: "mcq",
    category: "Circle & Ellipse",
    question: "An ellipse exhibits how many-way symmetry?",
    options: ["2-way", "4-way", "8-way", "None"],
    answer: 1,
    explanation:
      "An ellipse is symmetric about both axes, giving 4-way symmetry (not 8, since rx ≠ ry).",
  },
  {
    type: "mcq",
    category: "Circle & Ellipse",
    question:
      "The midpoint ellipse algorithm divides the first quadrant into how many regions?",
    options: ["1", "2", "3", "4"],
    answer: 1,
    explanation: "Two regions, split where the tangent slope equals −1.",
  },
  {
    type: "mcq",
    category: "Circle & Ellipse",
    question: "The standard equation of an ellipse centred at the origin is:",
    options: [
      "x² + y² = r²",
      "x²/rx² + y²/ry² = 1",
      "x·rx + y·ry = 1",
      "x² − y² = r²",
    ],
    answer: 1,
    explanation:
      "x²/rx² + y²/ry² = 1 is the standard axis-aligned ellipse equation.",
  },
  {
    type: "mcq",
    category: "Circle & Ellipse",
    question:
      "In the BGI function ellipse(xc, yc, sa, ea, xr, yr), sa and ea are:",
    options: [
      "scale factors",
      "start and end angles",
      "x and y radii",
      "colours",
    ],
    answer: 1,
    explanation:
      "sa and ea are the starting and ending angles of the elliptical arc.",
  },
  {
    type: "output",
    category: "Circle & Ellipse",
    question:
      "circle(200, 200, 150) draws a circle whose topmost point is at approximately:",
    options: ["(200, 50)", "(50, 200)", "(200, 350)", "(350, 200)"],
    answer: 0,
    explanation:
      "Top point = centre y minus radius = (200, 200−150) = (200, 50).",
  },
  {
    type: "output",
    category: "Circle & Ellipse",
    question: "Which BGI call fills an ellipse solidly?",
    options: [
      "ellipse(...)",
      "fillellipse(...)",
      "arc(...)",
      "sector fill only",
    ],
    answer: 1,
    explanation: "fillellipse(xc, yc, xr, yr) draws and fills an ellipse.",
  },
  {
    type: "tf",
    category: "Circle & Ellipse",
    question: "A circle is a special case of an ellipse where rx = ry.",
    options: TF,
    answer: 0,
    explanation:
      "True — when both radii are equal the ellipse becomes a circle.",
  },
  {
    type: "tf",
    category: "Circle & Ellipse",
    question:
      "The midpoint circle algorithm requires computing square roots for each pixel.",
    options: TF,
    answer: 1,
    explanation:
      "False — the decision-parameter approach avoids square roots, using only integer additions.",
  },

  // ---------- 2D Transforms & Clipping ----------
  {
    type: "mcq",
    category: "2D Transforms & Clipping",
    question: "Translating a point (x,y) by (tx,ty) gives:",
    options: ["(x·tx, y·ty)", "(x+tx, y+ty)", "(x−tx, y−ty)", "(tx/x, ty/y)"],
    answer: 1,
    explanation: "Translation adds the offsets: x' = x+tx, y' = y+ty.",
  },
  {
    type: "mcq",
    category: "2D Transforms & Clipping",
    question: "Which transformation changes the size of an object?",
    options: ["Translation", "Rotation", "Scaling", "Reflection about origin"],
    answer: 2,
    explanation:
      "Scaling multiplies coordinates by scale factors, changing size.",
  },
  {
    type: "mcq",
    category: "2D Transforms & Clipping",
    question: "Homogeneous coordinates represent a 2D point (x, y) as:",
    options: ["(x, y)", "(x, y, 0)", "(x, y, 1)", "(x, y, z)"],
    answer: 2,
    explanation:
      "The point is written (x, y, 1) so translation becomes a matrix multiply.",
  },
  {
    type: "mcq",
    category: "2D Transforms & Clipping",
    question:
      "2D transformation matrices in homogeneous coordinates are of size:",
    options: ["2×2", "3×3", "4×4", "2×3"],
    answer: 1,
    explanation: "2D homogeneous transforms use 3×3 matrices.",
  },
  {
    type: "mcq",
    category: "2D Transforms & Clipping",
    question: "For a rotation about the origin by θ, x′ equals:",
    options: [
      "x·cosθ + y·sinθ",
      "x·cosθ − y·sinθ",
      "x·sinθ − y·cosθ",
      "x + y·tanθ",
    ],
    answer: 1,
    explanation: "x′ = x·cosθ − y·sinθ for counter-clockwise rotation.",
  },
  {
    type: "mcq",
    category: "2D Transforms & Clipping",
    question: "To rotate about an arbitrary pivot point, the correct order is:",
    options: [
      "Rotate, then translate to pivot",
      "Translate pivot to origin, rotate, translate back",
      "Scale, rotate, scale back",
      "Rotate twice",
    ],
    answer: 1,
    explanation:
      "M = T(xr,yr)·R(θ)·T(−xr,−yr): move pivot to origin, rotate, move back.",
  },
  {
    type: "mcq",
    category: "2D Transforms & Clipping",
    question: "Matrix multiplication for composite transforms is:",
    options: [
      "Commutative",
      "Associative but not commutative",
      "Neither",
      "Always commutative for rotations",
    ],
    answer: 1,
    explanation:
      "Order matters (not commutative) but grouping does not (associative).",
  },
  {
    type: "mcq",
    category: "2D Transforms & Clipping",
    question: "Cohen–Sutherland line clipping assigns each endpoint a:",
    options: [
      "3-bit region code",
      "4-bit region outcode",
      "Colour index",
      "Slope value",
    ],
    answer: 1,
    explanation:
      "Each endpoint gets a 4-bit outcode (Top, Bottom, Right, Left).",
  },
  {
    type: "mcq",
    category: "2D Transforms & Clipping",
    question: "In Cohen–Sutherland, a line is trivially accepted when:",
    options: [
      "Both outcodes are 0000",
      "The AND of outcodes ≠ 0",
      "The OR of outcodes ≠ 0",
      "Both outcodes equal 1111",
    ],
    answer: 0,
    explanation:
      "If both endpoints have outcode 0000 the line is fully inside — trivially accepted.",
  },
  {
    type: "mcq",
    category: "2D Transforms & Clipping",
    question: "In Cohen–Sutherland, a line is trivially rejected when:",
    options: [
      "Both outcodes are 0000",
      "The bitwise AND of the two outcodes is non-zero",
      "The OR of the outcodes is 0000",
      "One outcode is 1000",
    ],
    answer: 1,
    explanation:
      "A non-zero AND means both endpoints are outside the same boundary — trivially rejected.",
  },
  {
    type: "mcq",
    category: "2D Transforms & Clipping",
    question:
      "The Liang–Barsky algorithm is based on the ____ representation of a line.",
    options: ["Polar", "Parametric", "Implicit", "Matrix"],
    answer: 1,
    explanation: "Liang–Barsky uses the parametric form P = P1 + t(P2 − P1).",
  },
  {
    type: "output",
    category: "2D Transforms & Clipping",
    question: "Scaling the point (3,4) by (sx,sy) = (2,2) yields:",
    options: ["(5,6)", "(6,8)", "(1.5,2)", "(3,4)"],
    answer: 1,
    explanation: "x' = 3·2 = 6, y' = 4·2 = 8.",
  },
  {
    type: "output",
    category: "2D Transforms & Clipping",
    question: "Translating (10,10) by (−4, 6) gives:",
    options: ["(6,16)", "(14,4)", "(6,4)", "(14,16)"],
    answer: 0,
    explanation: "x' = 10−4 = 6, y' = 10+6 = 16.",
  },
  {
    type: "tf",
    category: "2D Transforms & Clipping",
    question: "Liang–Barsky is generally more efficient than Cohen–Sutherland.",
    options: TF,
    answer: 0,
    explanation:
      "True — the parametric approach avoids repeated intersection computations.",
  },
  {
    type: "tf",
    category: "2D Transforms & Clipping",
    question:
      "Rotation and translation always commute (order does not matter).",
    options: TF,
    answer: 1,
    explanation:
      "False — transformation order matters; rotating then translating differs from the reverse.",
  },

  // ---------- 3D & Projections ----------
  {
    type: "mcq",
    category: "3D & Projections",
    question:
      "3D transformations in homogeneous coordinates use matrices of size:",
    options: ["2×2", "3×3", "4×4", "4×3"],
    answer: 2,
    explanation: "3D homogeneous transforms use 4×4 matrices.",
  },
  {
    type: "mcq",
    category: "3D & Projections",
    question: "A 3D point in homogeneous coordinates is written as:",
    options: ["(x, y)", "(x, y, z)", "(x, y, z, 1)", "(x, y, 1)"],
    answer: 2,
    explanation: "A 3D homogeneous point is (x, y, z, 1).",
  },
  {
    type: "mcq",
    category: "3D & Projections",
    question: "In parallel projection, the projectors are:",
    options: [
      "Converging to a point",
      "Parallel to each other",
      "Perpendicular to the object",
      "Random",
    ],
    answer: 1,
    explanation:
      "Parallel projection uses parallel projectors, preserving relative dimensions.",
  },
  {
    type: "mcq",
    category: "3D & Projections",
    question: "Which projection produces vanishing points?",
    options: ["Orthographic", "Oblique", "Perspective", "Axonometric"],
    answer: 2,
    explanation:
      "Perspective projection has converging projectors, producing 1, 2 or 3 vanishing points.",
  },
  {
    type: "mcq",
    category: "3D & Projections",
    question: "Orthographic projection is a type of:",
    options: [
      "Perspective projection",
      "Parallel projection",
      "Oblique perspective",
      "Central projection",
    ],
    answer: 1,
    explanation:
      "Orthographic is a parallel projection with projectors perpendicular to the view plane.",
  },
  {
    type: "mcq",
    category: "3D & Projections",
    question: "Isometric projection is a special case of:",
    options: [
      "Oblique projection",
      "Axonometric projection",
      "Perspective projection",
      "Orthographic front view",
    ],
    answer: 1,
    explanation:
      "Isometric is an axonometric (parallel) projection where all three axes are equally foreshortened.",
  },
  {
    type: "mcq",
    category: "3D & Projections",
    question: "Which projection type is most realistic, matching human vision?",
    options: ["Parallel", "Perspective", "Orthographic", "Cabinet"],
    answer: 1,
    explanation:
      "Perspective projection mimics how the eye sees — distant objects appear smaller.",
  },
  {
    type: "mcq",
    category: "3D & Projections",
    question: "Cavalier and cabinet projections are subtypes of:",
    options: ["Orthographic", "Oblique", "Perspective", "Isometric"],
    answer: 1,
    explanation: "Cavalier and cabinet are oblique parallel projections.",
  },
  {
    type: "mcq",
    category: "3D & Projections",
    question: "How many vanishing points can a perspective projection have?",
    options: ["Exactly 1", "Only 2", "1, 2, or 3", "Unlimited, always"],
    answer: 2,
    explanation:
      "Perspective projections use one, two, or three vanishing points depending on orientation.",
  },
  {
    type: "tf",
    category: "3D & Projections",
    question:
      "Parallel projection preserves the relative dimensions of objects.",
    options: TF,
    answer: 0,
    explanation:
      "True — because projectors are parallel, size is preserved regardless of distance.",
  },
  {
    type: "tf",
    category: "3D & Projections",
    question:
      "In perspective projection, parallel lines never appear to converge.",
    options: TF,
    answer: 1,
    explanation:
      "False — parallel lines converge at vanishing points in perspective projection.",
  },
  {
    type: "tf",
    category: "3D & Projections",
    question: "A 4×4 translation matrix stores tx, ty, tz in its last column.",
    options: TF,
    answer: 0,
    explanation:
      "True — the translation components occupy the last column of the 4×4 matrix.",
  },
];

// Duplicate-and-vary the bank up to 100 questions so the engine can sample a full set.
export function buildQuestionBank(): Question[] {
  const withIds: Question[] = bank.map((q, i) => ({ ...q, id: i + 1 }));
  return withIds;
}

export const TOTAL_POOL = bank.length;

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Return exactly `count` questions, sampling with repetition if the pool is smaller,
// re-tagging repeats with fresh ids so React keys stay unique.
export function sampleQuestions(count: number): Question[] {
  const pool = buildQuestionBank();
  const result: Question[] = [];
  let id = 1;
  while (result.length < count) {
    const batch = shuffle(pool);
    for (const q of batch) {
      if (result.length >= count) break;
      result.push({ ...q, id: id++ });
    }
  }
  return result;
}
