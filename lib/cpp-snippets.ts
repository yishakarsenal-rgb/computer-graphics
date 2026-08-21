export type SimId =
  | 'dda'
  | 'line'
  | 'circle'
  | 'circleMidpoint'
  | 'ellipse'
  | 'car'
  | 'movingCar'
  | 'bouncingBall'
  | 'flag'
  | 'arrowKey'
  | 'rectangle'
  | 'primitive'
  | 'none'

export type CppSnippet = {
  id: string
  name: string
  category: 'Primitives' | 'Line Algorithms' | 'Circle & Ellipse' | 'Animation' | 'Interaction'
  description: string
  sim: SimId
  interactive?: boolean
  code: string
}

export const cppSnippets: CppSnippet[] = [
  {
    id: 'dda',
    name: 'dda.cpp',
    category: 'Line Algorithms',
    description:
      'Digital Differential Analyzer line algorithm. Steps along the axis of greatest change, incrementing by fractional slope to plot each pixel of a line. Here it draws a box with diagonals.',
    sim: 'dda',
    code: `#include<iostream>
#include<conio.h>
#include<graphics.h>
#include<stdlib.h>

using namespace std;

int gd=0,gm;
int p = 0;
long x,x1,x2,dx,xinc,step;
long y,y1,y2,dy,yinc;

void mydda(double x1, double y1, double x2, double y2,int c)
{
    p = 0;
    dx = x2 - x1;
    dy = y2 - y1;

    if(abs(dx) > abs(dy)){
        step = abs(dx);
    } else
        step = abs(dy);

    xinc = dx / step;
    yinc = dy / step;

    x = x1;
    y = y1;
    putpixel(x,y,4);

    do{
        x = x + xinc;
        y = y + yinc;
        putpixel(x,y,c);
        delay(20);
        p++;
    } while (p <= step);
}

int main()
{
    initgraph(&gd,&gm,"..\\\\bgi");
    mydda(300,100,400,100,3);
    mydda(400,100,400,200,6);
    mydda(400,200,300,200,10);
    mydda(300,200,300,100,2);
    mydda(300,100,400,200,5);
    mydda(400,100,300,200,6);
    getch();
}`,
  },
  {
    id: 'line',
    name: 'line.cpp',
    category: 'Line Algorithms',
    description:
      'Uses the BGI line() primitive inside a kbhit() loop to sweep three coloured lines across the screen, clearing the device each frame for an animation effect.',
    sim: 'line',
    code: `#include<iostream>
#include<conio.h>
#include<graphics.h>
#include<stdlib.h>

using namespace std;

int main()
{
    int gd=0,gm,x,y,i=0;
    initgraph(&gd,&gm,"..//bgi");

    while(!kbhit())
    {
        setcolor(6);
        line(10+i,10,60+i,10);
        delay(10);

        setcolor(5);
        line(10,10+i,10,60+i);
        delay(10);

        setcolor(3);
        line(10+i,10+i,60+i,60+i);
        delay(10);
        cleardevice();
        i++;
    }
    getch();
}`,
  },
  {
    id: 'circle',
    name: 'circle.cpp',
    category: 'Circle & Ellipse',
    description:
      'The simplest program: initialise the graphics driver and draw one circle centered at (200,200) with radius 150 using the built-in circle() routine.',
    sim: 'circle',
    code: `#include<graphics.h>
int main()
{
    int gd=DETECT , gm;
    initgraph(&gd,&gm,(char*)"");
    circle(200, 200, 150);
    getch();
    closegraph();
    return 0;
}`,
  },
  {
    id: 'circle_algorithm',
    name: 'circle_algorithm.cpp',
    category: 'Circle & Ellipse',
    description:
      'Midpoint Circle Algorithm from scratch. Uses the decision parameter d = 1 - R and 8-way symmetry, plotting each of the eight octant reflections with putpixel().',
    sim: 'circleMidpoint',
    code: `#include<iostream>
#include<graphics.h>
#include<stdlib.h>
#include<conio.h>

using namespace std;
int main()
{
    int gd=0,gm,x,y,R=150,d;
    initgraph(&gd,&gm,"...\\\\bgi");
    d = 1 - R;
    x = 0;
    y = R;

    while (x < y)
    {
        if (d < 0)
        {
            d = d + 2 * x + 3;
        } else {
            d = d + 2 * x - 2 * y + 5;
            y = y - 1;
        }
        x = x + 1;
        putpixel(x + 320, y + 240, 14);
        putpixel(y + 320, x + 240, 4);
        putpixel(x + 320, -y + 240, 2);
        putpixel(y + 320, -x + 240, 3);
        putpixel(-y + 320, -x + 240, 5);
        putpixel(-x + 320, -y + 240, 1);
        putpixel(-x + 320, y + 240, 7);
        putpixel(-y + 320, x + 240, 6);
    }
    getch();
}`,
  },
  {
    id: 'ellipse',
    name: 'Ellipse.cpp',
    category: 'Circle & Ellipse',
    description:
      'Demonstrates fillellipse(), ellipse() with start/end angles, and sector(). Shows a filled ellipse, an outline ellipse, and a pie sector side by side.',
    sim: 'ellipse',
    code: `#include<iostream>
#include<graphics.h>
#include<conio.h>
#include<stdlib.h>

using namespace std;

int main()
{
    int gd=0,gm;
    initgraph(&gd,&gm,"...\\\\bgi");

    setcolor(4);
    setfillstyle(7,14);
    // fillellipse(int xc, int yc, int xRadius, int yRadius)
    fillellipse(100,100,80,50);

    // ellipse(xc, yc, startAngle, endAngle, xRadius, yRadius)
    ellipse(300,100,0,360,80,50);

    setfillstyle(5,3);
    // sector(xc, yc, startAngle, endAngle, xRadius, yRadius)
    sector(500,100,10,80,80,50);

    getch();
}`,
  },
  {
    id: 'primitive',
    name: 'primitive.cpp',
    category: 'Primitives',
    description:
      'Basic output primitives: setbkcolor(), setcolor(), line(), and a moveto()/lineto() polyline forming a small square.',
    sim: 'primitive',
    code: `#include<iostream>
#include<conio.h>
#include<graphics.h>
#include<stdlib.h>

using namespace std;

int main()
{
    int gd=0,gm,x,y,c;
    initgraph(&gd,&gm,(char*)"");
    setbkcolor(10);

    setcolor(8);
    line(200,150,400,300);

    setcolor(14);
    line(600,200,400,100);

    moveto(50,50);
    lineto(100,50);
    lineto(100,100);
    lineto(50,100);
    lineto(50,50);

    getch();
}`,
  },
  {
    id: 'rectangle',
    name: 'rectangle.cpp',
    category: 'Animation',
    description:
      'Explores rectangle(), setlinestyle(), setfillstyle() and floodfill(). The active loop moves a patterned square up and down the screen by redrawing and erasing it each frame.',
    sim: 'rectangle',
    code: `#include<iostream>
#include<graphics.h>
#include<conio.h>
#include<stdlib.h>

using namespace std;

int main()
{
    int gd=0,gm,i=0;
    initgraph(&gd,&gm,"...\\\\bgi");

    while (!kbhit())
    {
        while (i < 240)
        {
            setcolor(5);
            setfillstyle(8,14);
            rectangle(10,10+i,40,40+i);
            floodfill(11,11+i,5);
            delay(5);

            setcolor(0);
            setfillstyle(0,0);
            rectangle(10,10+i,40,40+i);
            floodfill(11,11+i,0);
            delay(5);
            i++;
        }
        while (i > 0)
        {
            setcolor(5);
            setfillstyle(8,14);
            rectangle(10,10+i,40,40+i);
            floodfill(11,11+i,5);
            delay(5);

            setcolor(0);
            setfillstyle(0,0);
            rectangle(10,10+i,40,40+i);
            floodfill(11,11+i,0);
            delay(5);
            i--;
        }
    }
    getch();
}`,
  },
  {
    id: 'car',
    name: 'car.cpp',
    category: 'Animation',
    description:
      'Builds a car silhouette out of moveto()/lineto() segments, then translates it to the right every frame inside a kbhit() loop to animate it driving across the screen.',
    sim: 'car',
    code: `#include<iostream>
#include<graphics.h>
#include<stdlib.h>
#include<conio.h>

using namespace std;
int main()
{
    int gd=0,gm;
    initgraph(&gd,&gm,"...\\\\bgi");

    moveto(80,50);
    lineto(180,50);
    lineto(220,90);
    lineto(260,90);
    lineto(260,140);
    lineto(50,140);
    lineto(50,80);
    lineto(80,50);

    int i=0;
    while (!kbhit())
    {
        moveto(80+i,50);
        lineto(180+i,50);
        lineto(220+i,90);
        lineto(260+i,90);
        lineto(260+i,140);
        lineto(50+i,140);
        lineto(50+i,80);
        lineto(80+i,50);
        delay(50);
        setcolor(3);
        i++;
    }
    getch();
}`,
  },
  {
    id: 'movingcar',
    name: 'movingcar.cpp',
    category: 'Animation',
    description:
      'Reads the car outline vertices from an external car.txt file with ifstream, then animates it across the screen, clearing the device each frame for smooth motion.',
    sim: 'movingCar',
    code: `#include<graphics.h>
#include<iostream>
#include<fstream>
#include<direct.h>

using namespace std;

int main()
{
    int gd=0,gm,x,y,i=0;
    initgraph(&gd,&gm,"...\\\\bgi");
    ifstream in;
    while (!kbhit())
    {
        setcolor(14);
        in.open("car.txt");
        moveto(80+i,50);
        while (!in.eof())
        {
            in>>x>>y;
            lineto(x+i,y);
        }
        in.close();
        delay(10);
        cleardevice();
        i++;
    }
    getch();
}`,
  },
  {
    id: 'bouncing_ball',
    name: 'Bouncing_ball.cpp',
    category: 'Animation',
    description:
      'A filled ellipse falls to a floor line and bounces back up repeatedly. Drawing then erasing (colour 0) the ball each step produces the animation.',
    sim: 'bouncingBall',
    code: `#include<iostream>
#include<graphics.h>
#include<conio.h>
#include<stdlib.h>

using namespace std;

int main()
{
    int gd=0,gm,xc=320,yc=240,i=0;
    initgraph(&gd,&gm,"...\\\\bgi");

    setcolor(8);
    setlinestyle(0,0,3);
    line(xc-50,yc+200,xc+50,yc+200);

    while (!kbhit())
    {
        i = 0;
        while (i < 187)
        {
            setcolor(4);
            setfillstyle(1,BLUE);
            fillellipse(xc,yc+i,10,10);
            delay(20);

            setcolor(0);
            setfillstyle(0,0);
            fillellipse(xc,yc+i,10,10);
            i++;
        }
        while (i > 0)
        {
            setcolor(4);
            setfillstyle(1,BLUE);
            fillellipse(xc,yc+i,10,10);
            delay(20);

            setcolor(0);
            setfillstyle(0,0);
            fillellipse(xc,yc+i,10,10);
            i--;
        }
    }
    getch();
}`,
  },
  {
    id: 'flag',
    name: 'flag.cpp',
    category: 'Animation',
    description:
      'Plots random pixels within three horizontal bands to gradually "paint in" a green / yellow / red tricolour flag using putpixel() and rand().',
    sim: 'flag',
    code: `#include"x.h"
int main()
{
    initgraph(&gd,&gm,"..\\\\bgi");
    while (!kbhit())
    {
        x = rand()%250 + 100;
        y = rand()%40 + 100;
        putpixel(x,y,2);
        putpixel(x,y+40,14);
        putpixel(x,y+80,4);
        delay(5);
    }
    getch();
}`,
  },
  {
    id: 'arrowkey',
    name: 'arrowkey.cpp',
    category: 'Interaction',
    description:
      'Reads arrow keys with getch() and draws connected line segments with lineto(), letting the user steer a "pen" around the canvas. Press Esc to exit.',
    sim: 'arrowKey',
    interactive: true,
    code: `#include<iostream>
#include<graphics.h>
#include<stdlib.h>
#include<conio.h>
#include<direct.h>

using namespace std;

#define keyup 72
#define keyleft 75
#define keydown 80
#define keyright 77
#define keyenter 13
#define keyspace 32
#define keyesc 27

int main()
{
    int x=50, y=50;
    char key;
    int gd=0,gm;
    initgraph(&gd,&gm,"...\\\\bgi");
    cout<<"\\nPress arrow keys to draw (Esc to Exit): ";
    do
    {
        key=getch();
        switch (key)
        {
        case keyup:    y = y - 20; break;
        case keydown:  y = y + 20; break;
        case keyleft:  x = x - 20; break;
        case keyright: x = x + 20; break;
        case keyspace: x = x + 20; break;
        case keyenter: y = y + 20; break;
        case keyesc: exit(0);
        default:;
        }
        lineto(x,y);
    } while (key!=keyesc);
    getch();
}`,
  },
]

export const cppCategories = [
  'Primitives',
  'Line Algorithms',
  'Circle & Ellipse',
  'Animation',
  'Interaction',
] as const
