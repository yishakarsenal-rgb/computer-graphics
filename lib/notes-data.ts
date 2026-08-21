export type NoteBlock =
  | { type: 'p'; text: string }
  | { type: 'h'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'formula'; latex: string; caption?: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'callout'; title: string; text: string }

export type Topic = {
  id: string
  title: string
  summary: string
  blocks: NoteBlock[]
}

export type Chapter = {
  id: string
  number: string
  title: string
  tagline: string
  topics: Topic[]
}

export const chapters: Chapter[] = [
  {
    id: 'ch1',
    number: '01',
    title: 'Overview & Applications of Computer Graphics',
    tagline: 'What computer graphics is, where it is used, and the hardware that displays it.',
    topics: [
      {
        id: 'ch1-apps',
        title: 'Applications of Computer Graphics',
        summary: 'The major domains that rely on generated imagery.',
        blocks: [
          {
            type: 'p',
            text: 'Computer graphics is the field concerned with generating images with the aid of computers. Modern applications span nearly every discipline.',
          },
          {
            type: 'list',
            items: [
              'Computer-Aided Design (CAD): design of buildings, automobiles, aircraft, circuits and other products; engineers manipulate wireframe and solid models.',
              'Virtual Reality (VR): immersive environments where users interact with 3D scenes through head-mounted displays and tracked input.',
              'Data Visualization: turning large numeric/scientific data sets into charts, graphs, contour plots and volume renderings to reveal patterns.',
              'Graphical User Interfaces (GUI): windows, icons, menus and pointers that let users interact with software visually.',
              'Computer Art: paint programs, generative and algorithmic art, and commercial illustration.',
              'Entertainment: films, animation, television effects and video games.',
              'Education & Training: simulators (flight, driving, surgery) and interactive teaching tools.',
              'Image Processing: enhancing, restoring and analysing existing images (distinct from synthesising new ones).',
            ],
          },
        ],
      },
      {
        id: 'ch1-crt',
        title: 'Video Display Devices — Refresh CRT',
        summary: 'How the cathode-ray tube produces a picture.',
        blocks: [
          {
            type: 'p',
            text: 'The primary output device in a graphics system is the video monitor, historically based on the Cathode-Ray Tube (CRT).',
          },
          {
            type: 'list',
            items: [
              'An electron gun emits a beam of electrons accelerated toward a phosphor-coated screen.',
              'Focusing and deflection systems direct the beam to a chosen screen position.',
              'The beam strikes the phosphor, which emits a small spot of light whose brightness depends on beam intensity.',
              'Phosphor light decays quickly, so the picture must be redrawn (refreshed) repeatedly — this is a refresh CRT.',
              'Refresh rate is typically 60 frames per second or higher to avoid flicker; persistence is the time for emitted light to decay to 1/10 of its initial intensity.',
            ],
          },
          {
            type: 'callout',
            title: 'Key terms',
            text: 'Resolution = number of points per centimetre that can be plotted horizontally and vertically. Aspect ratio = ratio of horizontal to vertical points needed to produce equal-length lines in both directions.',
          },
        ],
      },
      {
        id: 'ch1-scan',
        title: 'Raster-Scan vs Random-Scan Displays',
        summary: 'The two fundamental refresh architectures.',
        blocks: [
          {
            type: 'table',
            headers: ['Feature', 'Raster-Scan', 'Random-Scan (Vector)'],
            rows: [
              ['Drawing method', 'Beam sweeps every row (scan line) top to bottom', 'Beam moves directly to line endpoints'],
              ['Picture storage', 'Frame buffer / refresh buffer of pixel intensities', 'Display file of line-drawing commands'],
              ['Image type', 'Can draw filled areas and photographs', 'Best for line drawings / wireframes'],
              ['Resolution', 'Limited by pixel grid; can show jagged edges', 'Very high — smooth lines'],
              ['Cost / usage', 'Inexpensive, dominant today (TVs, monitors)', 'Historically for CAD, now rare'],
            ],
          },
          {
            type: 'p',
            text: 'In raster systems the screen is a rectangular array of pixels; the frame buffer stores intensity for each pixel. For a black-and-white system one bit per pixel is enough; colour systems use additional bits per pixel (bit planes).',
          },
        ],
      },
      {
        id: 'ch1-flat',
        title: 'Flat-Panel & Colour CRT Methods',
        summary: 'LCD/LED/Plasma displays and how colour CRTs work.',
        blocks: [
          {
            type: 'list',
            items: [
              'Flat-panel displays: thinner, lighter, lower power than CRTs — includes LCD (liquid crystal), LED, and Plasma panels.',
              'LCD: light passes through liquid-crystal cells whose molecular alignment is controlled by voltage, acting as light valves.',
              'Plasma: cells of gas emit light when energised; each cell is a tiny fluorescent lamp.',
            ],
          },
          {
            type: 'h',
            text: 'Colour CRT methods',
          },
          {
            type: 'table',
            headers: ['Method', 'How it works', 'Trade-off'],
            rows: [
              [
                'Beam-Penetration',
                'Two phosphor layers (red & green); beam speed/energy controls how deep it penetrates, mixing colour.',
                'Only a few colours; used in random-scan monitors; inexpensive.',
              ],
              [
                'Shadow-Mask',
                'Three electron guns (R, G, B) and a shadow mask so each beam hits only its phosphor dot triad.',
                'Millions of colours; used in raster systems; higher quality.',
              ],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'ch2',
    number: '02',
    title: 'Line, Circle & Primitive Drawing Algorithms',
    tagline: 'Scan-converting the basic primitives with integer-friendly algorithms.',
    topics: [
      {
        id: 'ch2-dda',
        title: 'DDA Line Algorithm',
        summary: 'Digital Differential Analyzer — incremental line drawing.',
        blocks: [
          {
            type: 'p',
            text: 'The DDA samples the line at unit intervals along one coordinate and computes the corresponding value of the other coordinate using the slope.',
          },
          { type: 'formula', latex: 'm = \\dfrac{y_2 - y_1}{x_2 - x_1}', caption: 'Slope of the line' },
          {
            type: 'p',
            text: 'Choose the number of steps as the larger of |Δx| and |Δy|, then step with the increments below.',
          },
          {
            type: 'formula',
            latex: '\\text{steps} = \\max(|\\Delta x|,\\ |\\Delta y|)',
          },
          {
            type: 'formula',
            latex: 'x_{k+1} = x_k + \\dfrac{\\Delta x}{\\text{steps}}, \\quad y_{k+1} = y_k + \\dfrac{\\Delta y}{\\text{steps}}',
          },
          {
            type: 'list',
            items: [
              'For |m| < 1: sample x in unit steps, increment y by m each step.',
              'For |m| > 1: sample y in unit steps, increment x by 1/m each step.',
              'Round each computed coordinate to the nearest integer to plot the pixel.',
            ],
          },
          {
            type: 'callout',
            title: 'Drawback',
            text: 'DDA uses floating-point addition and rounding at every step, which is slow and can accumulate round-off error for long line segments.',
          },
        ],
      },
      {
        id: 'ch2-bres',
        title: "Bresenham's Line Algorithm",
        summary: 'Integer-only line drawing using a decision parameter.',
        blocks: [
          {
            type: 'p',
            text: "Bresenham's algorithm uses only integer addition, subtraction and bit shifting, making it faster and exact. At each step it decides between two candidate pixels using a decision parameter p.",
          },
          {
            type: 'formula',
            latex: 'p_0 = 2\\Delta y - \\Delta x',
            caption: 'Initial decision parameter (for 0 < m < 1)',
          },
          {
            type: 'formula',
            latex: 'p_{k+1} = \\begin{cases} p_k + 2\\Delta y & \\text{if } p_k < 0 \\\\ p_k + 2\\Delta y - 2\\Delta x & \\text{if } p_k \\ge 0 \\end{cases}',
          },
          {
            type: 'list',
            items: [
              'If p_k < 0: the next point is (x_k + 1, y_k).',
              'If p_k ≥ 0: the next point is (x_k + 1, y_k + 1).',
              'No floating point, no rounding — the decision parameter tracks which pixel is closer to the true line.',
            ],
          },
        ],
      },
      {
        id: 'ch2-circle',
        title: 'Midpoint Circle Algorithm',
        summary: '8-way symmetry and an integer decision variable.',
        blocks: [
          {
            type: 'p',
            text: 'A circle is highly symmetric: computing one octant (45°) gives the other seven by reflection. The midpoint algorithm tests the midpoint between two candidate pixels against the circle boundary.',
          },
          { type: 'formula', latex: 'p_0 = 1 - r', caption: 'Initial decision parameter, starting at (0, r)' },
          {
            type: 'formula',
            latex: 'p_{k+1} = \\begin{cases} p_k + 2x_{k+1} + 1 & p_k < 0 \\\\ p_k + 2x_{k+1} + 1 - 2y_{k+1} & p_k \\ge 0 \\end{cases}',
          },
          {
            type: 'callout',
            title: '8-way symmetry',
            text: 'For each computed (x, y): also plot (y, x), (-x, y), (-y, x), (x, -y), (y, -x), (-x, -y), (-y, -x) — all mirrored about the circle centre.',
          },
        ],
      },
      {
        id: 'ch2-ellipse',
        title: 'Midpoint Ellipse Algorithm',
        summary: '4-way symmetry split into two regions.',
        blocks: [
          {
            type: 'p',
            text: 'An ellipse has 4-way symmetry (about both axes). The midpoint ellipse algorithm processes the first quadrant in two regions where the slope of the curve is respectively > -1 and < -1.',
          },
          {
            type: 'formula',
            latex: '\\dfrac{x^2}{r_x^2} + \\dfrac{y^2}{r_y^2} = 1',
            caption: 'Standard ellipse equation centred at the origin',
          },
          {
            type: 'formula',
            latex: 'p1_0 = r_y^2 - r_x^2 r_y + \\tfrac{1}{4} r_x^2',
            caption: 'Initial decision parameter, Region 1',
          },
          {
            type: 'formula',
            latex: 'p2_0 = r_y^2 (x + \\tfrac{1}{2})^2 + r_x^2 (y - 1)^2 - r_x^2 r_y^2',
            caption: 'Initial decision parameter, Region 2',
          },
        ],
      },
    ],
  },
  {
    id: 'ch3',
    number: '03',
    title: '2D Transformations & Clipping',
    tagline: 'Moving, rotating and scaling objects, and trimming them to a window.',
    topics: [
      {
        id: 'ch3-basic',
        title: 'Basic Transformations',
        summary: 'Translation, rotation and scaling.',
        blocks: [
          { type: 'formula', latex: "x' = x + t_x, \\quad y' = y + t_y", caption: 'Translation by (tx, ty)' },
          {
            type: 'formula',
            latex: "x' = x\\cos\\theta - y\\sin\\theta, \\quad y' = x\\sin\\theta + y\\cos\\theta",
            caption: 'Rotation about the origin by θ',
          },
          { type: 'formula', latex: "x' = s_x \\cdot x, \\quad y' = s_y \\cdot y", caption: 'Scaling by (sx, sy)' },
        ],
      },
      {
        id: 'ch3-homog',
        title: 'Homogeneous Coordinates & Matrices',
        summary: 'Unifying all transforms as 3×3 matrix multiplications.',
        blocks: [
          {
            type: 'p',
            text: 'Representing 2D points as (x, y, 1) lets translation, rotation and scaling all be expressed as 3×3 matrix multiplication, so composite transforms are single matrix products.',
          },
          {
            type: 'formula',
            latex: 'T = \\begin{bmatrix} 1 & 0 & t_x \\\\ 0 & 1 & t_y \\\\ 0 & 0 & 1 \\end{bmatrix}',
            caption: 'Translation matrix',
          },
          {
            type: 'formula',
            latex: 'R = \\begin{bmatrix} \\cos\\theta & -\\sin\\theta & 0 \\\\ \\sin\\theta & \\cos\\theta & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}',
            caption: 'Rotation matrix',
          },
          {
            type: 'formula',
            latex: 'S = \\begin{bmatrix} s_x & 0 & 0 \\\\ 0 & s_y & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}',
            caption: 'Scaling matrix',
          },
        ],
      },
      {
        id: 'ch3-composite',
        title: 'Composite Transformations',
        summary: 'Pivot-point rotation and fixed-point scaling.',
        blocks: [
          {
            type: 'p',
            text: 'To rotate about an arbitrary pivot (xr, yr): translate the pivot to the origin, rotate, then translate back. The composite matrix is M = T(xr, yr) · R(θ) · T(-xr, -yr).',
          },
          {
            type: 'p',
            text: 'Fixed-point scaling about (xf, yf) follows the same idea: M = T(xf, yf) · S(sx, sy) · T(-xf, -yf). Matrix multiplication is associative but not commutative — order matters.',
          },
        ],
      },
      {
        id: 'ch3-clip',
        title: 'Line Clipping',
        summary: 'Cohen–Sutherland and Liang–Barsky.',
        blocks: [
          {
            type: 'h',
            text: 'Cohen–Sutherland',
          },
          {
            type: 'list',
            items: [
              'Assigns a 4-bit region outcode to each endpoint (Top, Bottom, Right, Left) relative to the clip window.',
              'Trivially accept if both outcodes are 0000; trivially reject if the bitwise AND of the two outcodes is non-zero.',
              'Otherwise clip against a boundary and repeat until accept or reject.',
            ],
          },
          {
            type: 'h',
            text: 'Liang–Barsky',
          },
          {
            type: 'p',
            text: 'A parametric method that expresses the line as P = P1 + t·(P2 − P1) and solves the four inequalities t·pk ≤ qk to find the entry/exit parameters, clipping without repeated intersection tests. It is generally more efficient than Cohen–Sutherland.',
          },
        ],
      },
    ],
  },
  {
    id: 'ch4',
    number: '04',
    title: '3D Graphics & Projections',
    tagline: 'Extending transforms to three dimensions and flattening them to a screen.',
    topics: [
      {
        id: 'ch4-transforms',
        title: '3D Transformations (4×4 Matrices)',
        summary: 'Translation, scaling and rotation in homogeneous 3D.',
        blocks: [
          {
            type: 'p',
            text: '3D points become (x, y, z, 1) and every transform is a 4×4 matrix. Rotation now happens about the x, y or z axis.',
          },
          {
            type: 'formula',
            latex: 'T = \\begin{bmatrix} 1 & 0 & 0 & t_x \\\\ 0 & 1 & 0 & t_y \\\\ 0 & 0 & 1 & t_z \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}',
            caption: '3D translation',
          },
          {
            type: 'formula',
            latex: 'R_z = \\begin{bmatrix} \\cos\\theta & -\\sin\\theta & 0 & 0 \\\\ \\sin\\theta & \\cos\\theta & 0 & 0 \\\\ 0 & 0 & 1 & 0 \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}',
            caption: 'Rotation about the z-axis',
          },
        ],
      },
      {
        id: 'ch4-proj',
        title: 'Projections',
        summary: 'Parallel vs perspective projection.',
        blocks: [
          {
            type: 'table',
            headers: ['Aspect', 'Parallel Projection', 'Perspective Projection'],
            rows: [
              ['Projectors', 'Parallel to each other', 'Converge to a centre of projection'],
              ['Size preservation', 'Preserves relative dimensions', 'Distant objects appear smaller'],
              ['Realism', 'Less realistic; good for CAD', 'Realistic; matches human vision'],
              ['Vanishing points', 'None', 'One, two or three vanishing points'],
            ],
          },
          {
            type: 'list',
            items: [
              'Parallel — Orthographic: projectors perpendicular to the view plane (front, top, side views).',
              'Parallel — Axonometric: view plane not aligned to a principal face (isometric, dimetric, trimetric).',
              'Parallel — Oblique: projectors not perpendicular to the view plane (cavalier, cabinet).',
              'Perspective: uses a centre of projection; parallel lines converge at vanishing points.',
            ],
          },
        ],
      },
    ],
  },
]
