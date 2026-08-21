export interface FormulaCard {
  id: string
  title: string
  category: string
  formulas: { label?: string; latex: string }[]
  note?: string
  steps?: string[]
}

export const cheatSheet: FormulaCard[] = [
  {
    id: "dda",
    title: "DDA Line Algorithm",
    category: "Line Drawing",
    formulas: [
      { label: "Steps", latex: "\\text{steps} = \\max(|\\Delta x|,\\ |\\Delta y|)" },
      { label: "Increments", latex: "x_{inc} = \\frac{\\Delta x}{\\text{steps}}, \\quad y_{inc} = \\frac{\\Delta y}{\\text{steps}}" },
      { label: "Iterate", latex: "x_{k+1} = x_k + x_{inc}, \\quad y_{k+1} = y_k + y_{inc}" },
    ],
    steps: [
      "Compute dx = x2 - x1 and dy = y2 - y1",
      "steps = max(|dx|, |dy|)",
      "Compute x and y increments by dividing by steps",
      "Plot round(x), round(y) at each step",
    ],
    note: "Uses floating-point arithmetic and rounding — simpler but slower than Bresenham.",
  },
  {
    id: "bresenham-line",
    title: "Bresenham Line Algorithm",
    category: "Line Drawing",
    formulas: [
      { label: "Initial decision (|m| < 1)", latex: "p_0 = 2\\Delta y - \\Delta x" },
      { label: "If \\(p_k < 0\\)", latex: "p_{k+1} = p_k + 2\\Delta y" },
      { label: "If \\(p_k \\geq 0\\)", latex: "p_{k+1} = p_k + 2\\Delta y - 2\\Delta x,\\ y_{k+1}=y_k+1" },
    ],
    steps: [
      "Plot the first endpoint (x1, y1)",
      "Compute dx, dy, and p0 = 2dy - dx",
      "At each step increment x; if p < 0 keep y, else increment y",
      "Update p accordingly and repeat until x2",
    ],
    note: "Integer-only arithmetic — fast and exact for raster displays.",
  },
  {
    id: "bresenham-circle",
    title: "Midpoint Circle Algorithm",
    category: "Circle & Ellipse",
    formulas: [
      { label: "Initial decision", latex: "p_0 = \\tfrac{5}{4} - r \\approx 1 - r" },
      { label: "If \\(p_k < 0\\)", latex: "p_{k+1} = p_k + 2x_{k+1} + 1" },
      { label: "Else", latex: "p_{k+1} = p_k + 2x_{k+1} + 1 - 2y_{k+1}" },
    ],
    steps: [
      "Start at (0, r) with p0 = 1 - r",
      "Compute one octant, then use 8-way symmetry",
      "If p < 0 choose E pixel, else choose SE pixel",
      "Stop when x >= y",
    ],
    note: "Exploits 8-way symmetry: one octant generates the whole circle.",
  },
  {
    id: "midpoint-ellipse",
    title: "Midpoint Ellipse Algorithm",
    category: "Circle & Ellipse",
    formulas: [
      { label: "Region 1 init", latex: "p1_0 = r_y^2 - r_x^2 r_y + \\tfrac{1}{4}r_x^2" },
      { label: "Region 2 init", latex: "p2_0 = r_y^2(x+\\tfrac12)^2 + r_x^2(y-1)^2 - r_x^2 r_y^2" },
      { label: "Region switch when", latex: "2r_y^2 x \\geq 2r_x^2 y" },
    ],
    note: "Two regions handle the change in slope. Uses 4-way symmetry.",
  },
  {
    id: "translation",
    title: "2D Translation",
    category: "Transformations",
    formulas: [
      { label: "Point form", latex: "x' = x + t_x, \\quad y' = y + t_y" },
      { label: "Matrix (homogeneous)", latex: "\\begin{bmatrix} x' \\\\ y' \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} 1 & 0 & t_x \\\\ 0 & 1 & t_y \\\\ 0 & 0 & 1 \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\\\ 1 \\end{bmatrix}" },
    ],
  },
  {
    id: "rotation",
    title: "2D Rotation",
    category: "Transformations",
    formulas: [
      { label: "About origin", latex: "x' = x\\cos\\theta - y\\sin\\theta, \\quad y' = x\\sin\\theta + y\\cos\\theta" },
      { label: "Matrix", latex: "R = \\begin{bmatrix} \\cos\\theta & -\\sin\\theta & 0 \\\\ \\sin\\theta & \\cos\\theta & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}" },
    ],
    note: "Positive theta rotates counter-clockwise. Rotate about a pivot by translating to origin first.",
  },
  {
    id: "scaling",
    title: "2D Scaling",
    category: "Transformations",
    formulas: [
      { label: "Point form", latex: "x' = x \\cdot s_x, \\quad y' = y \\cdot s_y" },
      { label: "Matrix", latex: "S = \\begin{bmatrix} s_x & 0 & 0 \\\\ 0 & s_y & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}" },
    ],
    note: "Scaling is about the origin; sx = sy gives uniform scaling.",
  },
  {
    id: "reflection",
    title: "Reflection",
    category: "Transformations",
    formulas: [
      { label: "About x-axis", latex: "\\begin{bmatrix} 1 & 0 \\\\ 0 & -1 \\end{bmatrix}" },
      { label: "About y-axis", latex: "\\begin{bmatrix} -1 & 0 \\\\ 0 & 1 \\end{bmatrix}" },
      { label: "About y = x", latex: "\\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}" },
    ],
  },
  {
    id: "cohen-sutherland",
    title: "Cohen–Sutherland Clipping",
    category: "Clipping",
    formulas: [
      { label: "Region code (TBRL)", latex: "\\text{code} = [\\,\\text{Top}\\ \\text{Bottom}\\ \\text{Right}\\ \\text{Left}\\,]" },
      { label: "Trivially accept", latex: "\\text{code}_1 \\lor \\text{code}_2 = 0" },
      { label: "Trivially reject", latex: "\\text{code}_1 \\land \\text{code}_2 \\neq 0" },
    ],
    steps: [
      "Assign 4-bit region codes to both endpoints",
      "Accept if both codes are 0000",
      "Reject if bitwise AND is non-zero",
      "Else clip against a boundary and repeat",
    ],
  },
  {
    id: "bezier",
    title: "Bézier Curve",
    category: "Curves",
    formulas: [
      { label: "Cubic", latex: "B(t) = (1-t)^3 P_0 + 3(1-t)^2 t P_1 + 3(1-t)t^2 P_2 + t^3 P_3" },
      { label: "General (Bernstein)", latex: "B(t) = \\sum_{i=0}^{n} \\binom{n}{i}(1-t)^{n-i} t^i P_i" },
    ],
    note: "t ranges from 0 to 1. Curve passes through P0 and Pn only.",
  },
]
