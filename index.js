// Constructor to generate objects that identify orbital elements.
function Trajectory(name, smA, oI, aP, oE, aN, mAe, Sidereal) {
  this.name = name; // name the object
  this.smA = smA; // semi major axis
  this.oI = oI * 0.01745329; // orbital inclination --> convert degrees to radians
  this.aP = aP * 0.01745329; // argument of Perigee --> convert degrees to radians
  this.oE = oE; // orbital eccentricity
  this.aN = aN * 0.01745329; // ascending node --> convert degrees to radians
  this.period = Sidereal; // siderial period as a multiple of Earth's orbital period
  this.epochMeanAnomaly = mAe * 0.01745329; // mean anomaly at epoch
  this.trueAnomoly = 0; // initialize to mean anomaly at epoch
  this.position = [0, 0, 0];
  this.time = 0;
}
//--------------------------------------------
//        Trajectory Propagator
//--------------------------------------------
Trajectory.prototype.propagate = function (uA) {
  // Purpose: Determine a position on an orbital trajectory based on a true anomoly.
  // Used by the traceOrbits function to draw the orbits.
  var pos = [];
  var xdot;
  var ydot;
  var zdot; // velocity coordinates
  var theta = uA; // Update true anomaly.
  var smA = this.smA; // Semi-major Axis
  var oI = this.oI; // Orbital Inclination
  var aP = this.aP; // Get the object's orbital elements.
  var oE = this.oE; // Orbital eccentricity
  var aN = this.aN; // ascending Node
  var sLR = smA * ((1 - oE) ^ 2); // Compute Semi-Latus Rectum.
  var r = sLR / (1 + oE * Math.cos(theta)); // Compute radial distance.

  // Compute position coordinates pos[0] is x, pos[1] is y, pos[2] is z
  pos[0] =
    r *
    (Math.cos(aP + theta) * Math.cos(aN) -
      Math.cos(oI) * Math.sin(aP + theta) * Math.sin(aN));
  pos[1] =
    r *
    (Math.cos(aP + theta) * Math.sin(aN) +
      Math.cos(oI) * Math.sin(aP + theta) * Math.cos(aN));
  pos[2] = r * (Math.sin(aP + theta) * Math.sin(oI));

  return pos;
};
/*----------------------------------------------------------------------------------------------*
 *                            {--- Global variables --}                                         *
 *----------------------------------------------------------------------------------------------*/
var epoch = new Date("December 9, 2014"); // start the calendar
var simSpeed = 1; // value from the scroll control
var solid = false; // start simulation with solid rendering of orbits
var solidLabels = false; // start simulation with solid rendering of Labels

// Specify trajectories' sMA, oI, aP, oE, aN, mAe, Sidereal <-- refer to Trajectory constructor.
// Orbital elements source: http://www.met.rdg.ac.uk/~ross/Astronomy/Planets.html#rates
// Orbital period source: http://en.wikipedia.org/wiki/Orbital_period
// Mean Anomoly at epoch for planets http://farside.ph.utexas.edu/teaching/celestial/celestial/node34.html
// Reminder - Call addNode and scale the sMA in the startUpdate function.
var mercury = new Trajectory(
  "mercury", //name
  0.38709843, //semi-major axis
  7.00559432, //orbital inclination(later converted into radians)
  77.45771895, //argument of Perigee(later converted into radians)
  0.20563661, //orbital eccentricity
  48.33961819, //accending node(later converted into radians)
  252.25, // mean anomaly at epoch
  0.24 // siderial period as a multiple of Earth's orbital period
);
var Venus = new Trajectory(
  "Venus", //name
  0.72333199, //semi-major axis
  3.39471, //orbital inclination(later converted into radians)
  54.9, //argument of Perigee(later converted into radians)
  0.00677323, //orbital eccentricity
  76.7, //accending node(later converted into radians)
  181.98, // mean anomaly at epoch
  0.615 // siderial period as a multiple of Earth's orbital period
);
var Earth = new Trajectory(
  "theEarth",
  1,
  0.00005,
  102.94719,
  0.01671022,
  0,
  100.47,
  1
);
var Mars = new Trajectory(
  "Mars",
  1.52366231,
  1.85061,
  286.5,
  0.09339,
  49.57854,
  355.43,
  1.881
);
var Jupiter = new Trajectory(
  "jupiter",
  5.20248019,
  1.29861416,
  14.27495244,
  0.0485359,
  100.29282654,
  20.02,
  11.86
);
var Saturn = new Trajectory(
  "Saturn",
  9.54149883,
  2.49424102,
  92.86136063,
  0.05550825,
  113.63998702,
  317.02,
  29.46
);
var Uranus = new Trajectory(
  "Uranus",
  19.18797948,
  0.77298127,
  172.43404441,
  0.0468574,
  73.96250215,
  142.239,
  84.01
);
var Neptune = new Trajectory(
  "neptune",
  30.06952752,
  1.7700552,
  46.68158724,
  0.00895439,
  131.78635853,
  259.883,
  164.79
);

// // Source: http://neo.jpl.nasa.gov/cgi-bin/neo_elem?type=PHA;hmax=all;max_rows=20;action=Display%20Table;show=1&sort=moid&sdir=ASC
// var TN1 = new Trajectory("2004TN1", 2.74, 8.4, 233.5, 0.698, 214.0, 66.6, 4.55);
// var SM68 = new Trajectory(
//   "2011SM68",
//   1.4,
//   19.2,
//   109.1,
//   0.664,
//   24.2,
//   292.6,
//   1.65
// );
// var EG45 = new Trajectory(
//   "2014EG45",
//   1.61,
//   25.5,
//   296.2,
//   0.498,
//   164.3,
//   156.4,
//   2.04
// );
// var EE16 = new Trajectory(
//   "2003EE16",
//   1.42,
//   0.6,
//   259.7,
//   0.614,
//   127.0,
//   62.7,
//   1.69
// );
// var TY52 = new Trajectory(
//   "2012TY52",
//   1.66,
//   9.6,
//   252.6,
//   0.553,
//   221.8,
//   323.4,
//   2.15
// );
// var WM1 = new Trajectory(
//   "2009WM1",
//   1.18,
//   25.8,
//   162.6,
//   0.169,
//   240.3,
//   355.3,
//   1.28
// );
// var SU49 = new Trajectory(
//   "2006SU49",
//   1.41,
//   2.5,
//   199.0,
//   0.312,
//   303.2,
//   200.2,
//   1.85
// );
// var SC15 = new Trajectory(
//   "1998SC15",
//   1.27,
//   16.1,
//   277.4,
//   0.415,
//   198.8,
//   27.0,
//   1.8
// );
// var MU112 = new Trajectory(
//   "2010MU112",
//   1.76,
//   48.0,
//   119.2,
//   0.54,
//   261.2,
//   300.5,
//   2.71
// );
// var AG5 = new Trajectory("2011AG5", 1.43, 3.7, 53.5, 0.39, 135.7, 60.8, 1.99);
// var PC1 = new Trajectory(
//   "1994PC1",
//   1.35,
//   33.5,
//   47.6,
//   0.328,
//   117.9,
//   136.5,
//   1.56
// );
// var SW20 = new Trajectory(
//   "2012SW20",
//   2.46,
//   10.2,
//   62.1,
//   0.68,
//   209.8,
//   224.3,
//   3.86
// );
// var PV27 = new Trajectory(
//   "2007PV27",
//   1.27,
//   24.6,
//   107.6,
//   0.371,
//   324.5,
//   324.1,
//   1.44
// );
// var TU24 = new Trajectory(
//   "2007TU24",
//   2.04,
//   5.6,
//   334.2,
//   0.534,
//   127,
//   132.9,
//   2.92
// );
// var XP14 = new Trajectory("2004XP14", 1.05, 33, 273.7, 0.158, 281, 4.5, 1.08);
// var KK = new Trajectory("2009KK", 1.5, 18.2, 247.3, 0.455, 68.2, 328.3, 1.84);
// var JY2 = new Trajectory("2007JY2", 2.2, 1.6, 105.3, 0.687, 225.6, 95.3, 3.26);
// var CU11 = new Trajectory(
//   "2002CU11",
//   1.22,
//   48.8,
//   110.5,
//   0.295,
//   157.8,
//   114.9,
//   1.35
// );
// var EK26 = new Trajectory(
//   "2000EK26",
//   2.41,
//   15.6,
//   305.5,
//   0.659,
//   126.5,
//   10.8,
//   3.73
// );
// var VK5 = new Trajectory(
//   "2001VK5",
//   1.27,
//   19.4,
//   263.9,
//   0.514,
//   54.3,
//   102.9,
//   1.43
// );
// var YU55 = new Trajectory(
//   "2005YU55",
//   1.16,
//   0.3,
//   273.6,
//   0.431,
//   35.9,
//   218.6,
//   1.25
// );
// var DJ = new Trajectory("2008DJ", 1.98, 5.1, 117.8, 0.603, 319.2, 173.9, 2.79);
// var QK130 = new Trajectory(
//   "2000QK130",
//   1.18,
//   4.7,
//   66.3,
//   0.262,
//   173.9,
//   112,
//   1.28
// );
// var JU3 = new Trajectory("1999JU3", 1.19, 5.9, 211.4, 0.19, 251.6, 114.3, 1.3);
// var SR5 = new Trajectory(
//   "2011SR5",
//   1.18,
//   29.1,
//   305.5,
//   0.706,
//   180.2,
//   142.5,
//   1.28
// );
// var XF11 = new Trajectory(
//   "1997XF11",
//   1.44,
//   4.1,
//   102.8,
//   0.484,
//   213.8,
//   24.3,
//   1.73
// );
// var RU9 = new Trajectory("2007RU9", 1.92, 5.7, 285.9, 0.63, 164.4, 230.7, 2.66);
// var Apophis = new Trajectory(
//   "Apophis",
//   0.92,
//   3.3,
//   126.4,
//   0.191,
//   204.5,
//   215.5,
//   0.89
// );

// var NT7 = new Trajectory(
//   "2002NT7",
//   1.74,
//   42.3,
//   300.7,
//   0.529,
//   132.1,
//   94.5,
//   2.29
// );
// var ED28 = new Trajectory(
//   "2013ED28",
//   1.55,
//   4.9,
//   258.4,
//   0.666,
//   153.1,
//   354.5,
//   1.93
// );
// var VB = new Trajectory("1993VB", 1.91, 5.1, 323.1, 0.519, 145.7, 332.8, 2.64);
// var NY40 = new Trajectory("2002NY40", 2.05, 5.9, 269, 0.709, 146.1, 54.5, 2.93);
// var CR20 = new Trajectory("2003CR20", 2.13, 5, 88.7, 0.73, 177.2, 264.4, 3.1);
// var PW59 = new Trajectory(
//   "2014PW59",
//   2.42,
//   2.3,
//   289.4,
//   0.693,
//   301.2,
//   46.6,
//   3.77
// );
// var TO139 = new Trajectory(
//   "2012TO139",
//   2.44,
//   5.4,
//   56.2,
//   0.889,
//   179.3,
//   224.3,
//   3.81
// );
// var JT6 = new Trajectory("1999JT6", 2.14, 9.5, 39.1, 0.578, 78.9, 41.2, 3.12);
// var LW3 = new Trajectory("2005LW3", 1.43, 6.1, 288.1, 0.462, 59.7, 154.4, 1.71);
// var XR2 = new Trajectory("1997XR2", 1.08, 7.2, 84.6, 0.201, 250.8, 153.8, 1.12);
// var BT15 = new Trajectory(
//   "2011BT15",
//   1.29,
//   1.7,
//   308.3,
//   0.303,
//   105.8,
//   254.8,
//   1.47
// );
// var VC17 = new Trajectory(
//   "2004VC17",
//   1.9,
//   20.4,
//   65.1,
//   0.811,
//   229.3,
//   327.8,
//   2.61
// );
// var EZ11 = new Trajectory("2002EZ11", 1.11, 2.4, 317.7, 0.802, 52, 57.7, 1.18);
// var KH = new Trajectory("1993KH", 1.23, 12.8, 293.8, 0.311, 54.4, 183.8, 1.37);
// var EH26 = new Trajectory("2000EH26", 1.85, 0.4, 19, 0.478, 215.3, 278.6, 2.52);
// var TU28 = new Trajectory(
//   "2000TU28",
//   1.07,
//   15.6,
//   280.8,
//   0.183,
//   203,
//   185.7,
//   1.11
// );
// var SC41 = new Trajectory(
//   "2010SC41",
//   1.86,
//   0.2,
//   266.3,
//   0.608,
//   236.8,
//   189.2,
//   2.55
// );
// var OX4 = new Trajectory("1998OX4", 1.58, 4.5, 117.1, 0.486, 299.7, 29.3, 1.99);
// var DV = new Trajectory("2011DV", 0.96, 10.6, 350.7, 0.05, 35.2, 150.1, 0.94);
// var XC25 = new Trajectory("2010XC25", 1.74, 3, 237.1, 0.528, 304.1, 233, 2.3);
// var TL10 = new Trajectory(
//   "2004TL10",
//   2.67,
//   9.2,
//   323.4,
//   0.654,
//   11.5,
//   129.7,
//   4.35
// );
// var UW158 = new Trajectory(
//   "2011UW158",
//   1.62,
//   4.6,
//   8.6,
//   0.375,
//   286.3,
//   253.7,
//   2.06
// );

//http://www.stjarnhimlen.se/comp/ppcomp.html
var Moon = new Trajectory(
  "theMoon",
  0.15,
  5.14,
  318.0634,
  0.0549006,
  125.1228,
  64,
  0.3
);
console.log(mercury);
// Create an array of the heavenly bodies.
var heavenlyBodies = [
  Earth,
  Venus,
  mercury,
  Mars,
  Moon,
  Jupiter,
  Saturn,
  Uranus,
  Neptune,
];
var asteroidLabels = ["2004TN1"];
//------------------------------------- end of global variables -----------------------------------------------------------------

/*--------------------------------------------------------------------------------------------*
 *  Functions for adding and manipulating X3D object to the Document Object Model via X3Dom   *
 *--------------------------------------------------------------------------------------------*/
function addNode(identifier, cR, cG, cB, radius) {
  // Create a shape and append it to the transform associated with the Sun.
  var x = 0;
  var y = 0;
  var z = -5;
  var t = document.createElement("Transform");
  t.setAttribute("translation", x + " " + y + " " + z);
  t.setAttribute("id", identifier);

  var s = document.createElement("Shape"); // Shape node
  var app = document.createElement("Appearance"); // Appearance Node
  var mat = document.createElement("Material"); // Material Node
  mat.setAttribute("id", identifier + "Mat");
  mat.setAttribute("diffuseColor", cR + " " + cG + " " + cB);

  app.appendChild(mat);
  s.appendChild(app);
  t.appendChild(s);

  var b = document.createElement("Sphere");
  b.setAttribute("radius", radius);

  s.appendChild(b);
  var ot = document.getElementById("theSun");
  ot.appendChild(t);

  return false;
}

function addChildNode(cID, pID, cR, cG, cB, radius) {
  // This function could replace addNode.
  var x = 0;
  var y = 0;
  var z = 0;
  var t = document.createElement("Transform");
  t.setAttribute("translation", x + " " + y + " " + z);
  t.setAttribute("id", cID);

  var s = document.createElement("Shape"); // Shape node
  var app = document.createElement("Appearance"); // Appearance Node
  var mat = document.createElement("Material"); // Material Node
  mat.setAttribute("id", cID + "Mat");
  mat.setAttribute("diffuseColor", cR + " " + cG + " " + cB);

  app.appendChild(mat);
  s.appendChild(app);
  t.appendChild(s);

  var b = document.createElement("Sphere");
  b.setAttribute("radius", radius);

  s.appendChild(b);

  var ot = document.getElementById(pID);
  var g = document.createElement("Group"); // Material Node
  ot.appendChild(g);
  g.appendChild(t);

  return false;
}
function addLabel(identifier) {
  // Create a text label and display it above the identified shape.
  var ot = document.getElementById(identifier);
  var tC = ot.getAttribute("translation");

  var t = document.createElement("Transform");
  // Translate up and forward for the label.
  t.setAttribute("translation", tC[0] + " " + tC[1] - 0.1 + " " + tC[2] - 0.1);
  t.setAttribute("id", identifier + "Label");
  var b = document.createElement("Billboard");
  var s = document.createElement("Shape");
  var app = document.createElement("Appearance");
  var mat = document.createElement("Material"); // Material Node
  mat.setAttribute("id", identifier + "LabelMat");
  mat.setAttribute("diffuseColor", 0.3 + " " + 0.2 + " " + 0.5);
  mat.setAttribute("shininess", 0.5);
  mat.setAttribute("specularColor", 0.5 + " " + 0.5 + " " + 0.5);
  app.appendChild(mat);

  var txt = document.createElement("text");
  txt.setAttribute("string", identifier);
  txt.setAttribute("solid", "false");
  var fs = document.createElement("Fontstyle");
  fs.setAttribute("family", "TYPEWRITER");
  fs.setAttribute("style", "BOLDITALIC");
  fs.setAttribute("size", 0.2);
  fs.setAttribute("topToBottom", "FALSE");
  txt.appendChild(fs);
  s.appendChild(app);
  s.appendChild(txt);
  b.appendChild(s);
  t.appendChild(b);
  ot.appendChild(t);
}
/*-------------------------------------------------------------*
 *   Utility functions for true, eccentric and mean anomalies  *
 *-------------------------------------------------------------*/
function trueToEccentricAnomaly(e, f) {
  // http://mmae.iit.edu/~mpeet/Classes/MMAE441/Spacecraft/441Lecture19.pdf slide 7
  var eccentricAnomaly =
    2 * Math.atan(Math.sqrt((1 - e) / (1 + e)) * Math.tan(f / 2));

  return eccentricAnomaly;
}
function meanToEccentricAnomaly(e, M) {
  // Solves for eccentric anomaly, E from a given mean anomaly, M
  // and eccentricty, e.  Performs a simple Newton-Raphson iteration
  // Code derived from Matlab scripts written by Richard Rieber, 1/23/2005
  // http://www.mathworks.com/matlabcentral/fileexchange/6779-calce-m
  var tol = 0.0001; // tolerance
  var eAo = M; // initialize eccentric anomaly with mean anomaly
  var ratio = 1; // set ratio higher than the tolerance
  while (Math.abs(ratio) > tol) {
    var f_E = eAo - e * Math.sin(eAo) - M;
    var f_Eprime = 1 - e * Math.cos(eAo);
    ratio = f_E / f_Eprime;
    if (Math.abs(ratio) > tol) {
      eAo = eAo - ratio;
      // console.log ("ratio  " + ratio) ;
    } else eccentricAnomaly = eAo;
  }
  return eccentricAnomaly;
}
function eccentricToTrueAnomaly(e, E) {
  // http://mmae.iit.edu/~mpeet/Classes/MMAE441/Spacecraft/441Lecture19.pdf slide 8
  var trueAnomaly =
    2 * Math.atan(Math.sqrt((1 + e) / (1 - e)) * Math.tan(E / 2));
  return trueAnomaly;
}
/*
function meanToEccentricAnomaly(ec,m) {
    // Source: http://www.jgiesen.de/kepler/kepler.html
    // arguments:
    // ec=eccentricity, m=mean anomaly,
    // dp=number of decimal places
	var dp =  5 ;

    var pi = Math.PI, K = Math.PI/180.0;
    var maxIter=30, i=0;
    var delta = Math.pow(10,-dp);

    var E, F;
    m= m / 360.0;
    m=2.0*pi*(m-Math.floor(m));
    if (ec < 0.8) E=m; else E=pi;
    F = E - ec * Math.sin(m) - m;

    while ((Math.abs(F) > delta) && (i<maxIter)) {
        E = E - F/(1.0- ec* Math.cos(E));
        F = E - ec * Math.sin(E) - m;
        i = i + 1;
    }
    E=E/K;
    return Math.round(E*Math.pow(10,dp))/Math.pow(10,dp);
} */
/*-------------------------------------------------*
 *        Animate the X3D objects                  *
 *-------------------------------------------------*/
function updatePosition() {
  // With each tick of the clock, propagate the position and set the translation attribute.
  // Update the position for the following array of objects.
  var currentPosition = [];
  var deltaTime = 0;
  for (var hB in heavenlyBodies) {
    var hbTAnomoly = heavenlyBodies[hB].trueAnomoly;
    currentPosition = heavenlyBodies[hB].propagate(hbTAnomoly); // Determine the current position.

    var Xpos = currentPosition[0];
    var Ypos = currentPosition[1];
    var Zpos = currentPosition[2];
    var hBName = heavenlyBodies[hB].name; // get the name of the current object and update translation
    document
      .getElementById(hBName)
      .setAttribute("translation", Xpos + " " + Ypos + " " + Zpos);

    // Calculate mean motion n:
    var n = (2 * Math.PI) / (heavenlyBodies[hB].period * 365.25); // radians per day

    // Calculate Eccentric Anomaly E based on the orbital eccentricity and previous true anomaly:
    var e = heavenlyBodies[hB].oE;
    var f = heavenlyBodies[hB].trueAnomoly; // heavenlyBodies[hB].trueAnomoly ;
    var eA = trueToEccentricAnomaly(e, f); // convert from true anomaly to eccentric anomaly

    // Calculate current Mean Anomaly
    var m0 = eA - e * Math.sin(eA);

    // deltaTime = (Math.abs(m0/n) - heavenlyBodies[hB].time) * simSpeed
    //  deltaTime = Math.abs(m0/n) * simSpeed
    deltaTime = simSpeed * n;

    // Update Mean anomaly by adding the Mean Anomaly at Epoch to the mean motion * delaTime
    var mA = deltaTime + m0;
    // var mA = n + m0

    heavenlyBodies[hB].time = heavenlyBodies[hB].time + deltaTime; // increment timer
    // heavenlyBodies[hB].time = heavenlyBodies[hB].time +  n // increment timer

    //	console.log(hBName + " time = " +  heavenlyBodies[hB].time + "  delta time " + dt)
    //	if (mA >  2 * Math.PI) {
    // This heavenly body has completed an orbital period so subtract 2*Pi
    //	   mA = mA - 2 * Math.PI
    //	   heavenlyBodies[hB].time = heavenlyBodies[hB].epochMeanAnomaly / n  // reset to tau
    // heavenlyBodies[hB].time = n
    //	}

    eA = meanToEccentricAnomaly(e, mA);
    var trueAnomaly = eccentricToTrueAnomaly(e, eA);
    heavenlyBodies[hB].trueAnomoly = trueAnomaly;

    //	console.log(hBName + " time = " +  heavenlyBodies[hB].time + "  delta time " + dt)
    // console.log(hBName + " eccentric anomaly " + E + " sin(f) " + sinf + " cos(f) " + cosf )
    //	console.log(hBName + " mean anomaly " + mA + " eccentric anomaly " + eA )
    // console.log (hBName + " trueAnomaly = " + trueAnomaly + "   true Anomaly  " + heavenlyBodies[hB].trueAnomoly + "  mean motion = " + n) ;
    // console.log(hBName + " eccentricity " + e + " true anomaly " + f + " Eccentric anomaly " + eA + " Mean anomaly " + m0 + " mean motion " + n)
  }
  updateTheDate();
}
/*----------------------------------------------*
 *           Button Handlers                    *
 *----------------------------------------------*/
function toggleOrbits() {
  // Step through a list of orbits and show or hide them via transparency.
  var button = document.getElementById("orbits");
  var opacity = 0;

  solid = !solid;

  if (solid) {
    button.value = "Orbits Off";
    opacity = 1;
  } else {
    button.value = "Orbits On";
    opacity = 0;
  }
  for (var hB in heavenlyBodies) {
    var omat = document.getElementById(heavenlyBodies[hB].name + "OrbitMat");
    omat.setAttribute("transparency", opacity);
  }
}
function toggleLabels() {
  // Step through a list of asteroid labels and show or hide them via transparency.

  var button = document.getElementById("labels");
  var opacity = 0;

  solidLabels = !solidLabels;

  if (solidLabels) {
    button.value = "Labels Off";
    opacity = 1;
  } else {
    button.value = "Labels On";
    opacity = 0;
  }
  for (var hB in asteroidLabels) {
    var omat = document.getElementById(asteroidLabels[hB] + "LabelMat");
    omat.setAttribute("transparency", opacity);
  }
}
//-----------------------------------------------------------------------------------------------------
function traceOrbits() {
  // Generate line segments from points around the trajectory of the orbiting objects.
  // Trace the orbits for the following array of objects.
  for (var hB in heavenlyBodies) {
    var orbPos = [];
    var j = 0; // Initialize the orbit index, which will build the orbIndices list.
    var orbitCoords = ""; // list of orbit coordinates
    var orbIndices = ""; // Offsets into the list of orbit coordinates.
    var i = 0.0;
    while (i <= 6.28) {
      orbPos = heavenlyBodies[hB].propagate(i); // Earth.propagate(i) ;
      orbitCoords =
        orbitCoords +
        orbPos[0].toFixed(2) +
        " " +
        orbPos[1].toFixed(2) +
        " " +
        orbPos[2].toFixed(2) +
        " ";
      orbIndices = orbIndices + j + " ";
      //  i = i + 0.157 ;      // Advance to the next point around the orbit.
      i = i + 0.0785;
      j = j + 1; // Increment the orbit index.
    }
    orbIndices = orbIndices + -1;

    var s = document.createElement("Shape"); // Shape Node
    s.setAttribute("id", heavenlyBodies[hB].name + "Orbit");

    var app = document.createElement("Appearance"); // Appearance Node

    var omat = document.getElementById(heavenlyBodies[hB].name + "Mat");
    var oMatC = omat.getAttribute("diffuseColor");

    var mat = document.createElement("Material"); // Material Node
    // mat.setAttribute("emissiveColor", 1 + " " + 0 + " " + 0.3);
    mat.setAttribute("id", heavenlyBodies[hB].name + "OrbitMat");
    mat.setAttribute("emissiveColor", oMatC);
    app.appendChild(mat);
    s.appendChild(app);

    var line = document.createElement("IndexedLineSet");
    line.setAttribute("coordIndex", orbIndices);
    var coords = document.createElement("Coordinate");
    coords.setAttribute("point", orbitCoords);

    line.appendChild(coords);

    s.appendChild(line);
    var ot = document.getElementById("theSun");
    ot.appendChild(s);
  }
}
function updateTheDate() {
  // Display the simulated date to the right of the model.
  //  epoch.setTime(epoch.getTime() + simSpeed * 86400)
  if (simSpeed == 1) {
    epoch.setDate(epoch.getDate() + 1); // At maximum speed, increment calendar by a day for each clock-cycle.
  } else {
    epoch.setTime(epoch.getTime() + simSpeed * 24 * 3600000);
  } // 24 hours * milliseconds in an hour * simSpeed

  document.getElementById("modelDate").textContent =
    epoch.getMonth() + 1 + "-" + epoch.getDate() + "-" + epoch.getFullYear();
}
function showValue(newValue) {
  // Read a simulation speed setting from a slider control.
  // document.getElementById("range").textContent=newValue;
  simSpeed = newValue * 0.01; // was 0.01
  //simSpeed = newValue
}
/*-------------------------*
 *    Main Function        *
 *-------------------------*/
function startUpdate() {
  // var AUscaler = 3 ;                    // Astronautical Unit scaler.
  var AUscaler = 1; // Astronautical Unit scaler.

  for (var hB in asteroidLabels) {
    heavenlyBodies[hB].smA = heavenlyBodies[hB].smA * AUscaler;
  }

  // Node Parameters -- id, color r, g b, radius
  addNode("mercury", 169, 169, 169, 0.09);
  addNode("Venus", 255, 204, 51, 0.15);
  addNode("theEarth", 0, 0, 255, 0.15);
  addChildNode("theMoon", "theEarth", 0.7, 0.7, 0.7, 0.06);
  addNode("Mars", 255, 0, 0, 0.1);
  addNode("jupiter", 255, 204, 123, 0.7);
  addNode("Saturn", 255, 204, 123, 0.5);
  addNode("Uranus", 104, 204, 255, 0.4);
  addNode("neptune", 51, 51, 255, 0.5);
  addNode("2004TN1", 0.3, 0.3, 0.3, 0.05);
  for (var hB in asteroidLabels) {
    addLabel(asteroidLabels[hB]);
  }

  for (var hB in heavenlyBodies) {
    var n = (2 * Math.PI) / (heavenlyBodies[hB].period * 365.25);
    heavenlyBodies[hB].time = heavenlyBodies[hB].epochMeanAnomaly / n; // time since perigee passage
    var eccAnom = meanToEccentricAnomaly(
      heavenlyBodies[hB].oE,
      heavenlyBodies[hB].epochMeanAnomaly
    );
    var truAnom = eccentricToTrueAnomaly(heavenlyBodies[hB].oE, eccAnom);
    heavenlyBodies[hB].trueAnomoly = truAnom;
  }

  traceOrbits();

  setInterval(function () {
    updatePosition();
  }, 50);
  // updatePosition()
}
