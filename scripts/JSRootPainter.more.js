/// @file JSRootPainter.more.js
/// Part of JavaScript ROOT graphics with more classes like TEllipse, TLine, ...
/// Such classes are rarely used and therefore loaded only on demand

(function( factory ) {
   if ( typeof define === "function" && define.amd ) {
      // AMD. Register as an anonymous module.
      define( ['JSRootPainter', 'd3', 'JSRootMath'], factory );
   } else
   if (typeof exports === 'object' && typeof module !== 'undefined') {
       factory(require("./JSRootCore.js"), require("./d3.min.js"), require("./JSRootMath.js"));
   } else {

      if (typeof d3 != 'object')
         throw new Error('This extension requires d3.v3.js', 'JSRootPainter.more.js');

      if (typeof JSROOT == 'undefined')
         throw new Error('JSROOT is not defined', 'JSRootPainter.more.js');

      if (typeof JSROOT.Painter != 'object')
         throw new Error('JSROOT.Painter not defined', 'JSRootPainter.more.js');

      // Browser globals
      factory(JSROOT, d3);
   }
} (function(JSROOT, d3) {

   JSROOT.sources.push("more2d");

   JSROOT.ToolbarIcons.th2color = {
       recs: [{x:0,y:256,w:13,h:39,f:'rgb(38,62,168)'},{x:13,y:371,w:39,h:39},{y:294,h:39},{y:256,h:39},{y:218,h:39},{x:51,y:410,w:39,h:39},{y:371,h:39},{y:333,h:39},{y:294},{y:256,h:39},{y:218,h:39},{y:179,h:39},{y:141,h:39},{y:102,h:39},{y:64},{x:90,y:448,w:39,h:39},{y:410},{y:371,h:39},{y:333,h:39,f:'rgb(22,82,205)'},{y:294},{y:256,h:39,f:'rgb(16,100,220)'},{y:218,h:39},{y:179,h:39,f:'rgb(22,82,205)'},{y:141,h:39},{y:102,h:39,f:'rgb(38,62,168)'},{y:64},{y:0,h:27},{x:128,y:448,w:39,h:39},{y:410},{y:371,h:39},{y:333,h:39,f:'rgb(22,82,205)'},{y:294,f:'rgb(20,129,214)'},{y:256,h:39,f:'rgb(9,157,204)'},{y:218,h:39,f:'rgb(14,143,209)'},{y:179,h:39,f:'rgb(20,129,214)'},{y:141,h:39,f:'rgb(16,100,220)'},{y:102,h:39,f:'rgb(22,82,205)'},{y:64,f:'rgb(38,62,168)'},{y:26,h:39},{y:0,h:27},{x:166,y:486,h:14},{y:448,h:39},{y:410},{y:371,h:39,f:'rgb(22,82,205)'},{y:333,h:39,f:'rgb(20,129,214)'},{y:294,f:'rgb(82,186,146)'},{y:256,h:39,f:'rgb(179,189,101)'},{y:218,h:39,f:'rgb(116,189,129)'},{y:179,h:39,f:'rgb(82,186,146)'},{y:141,h:39,f:'rgb(14,143,209)'},{y:102,h:39,f:'rgb(16,100,220)'},{y:64,f:'rgb(38,62,168)'},{y:26,h:39},{x:205,y:486,w:39,h:14},{y:448,h:39},{y:410},{y:371,h:39,f:'rgb(16,100,220)'},{y:333,h:39,f:'rgb(9,157,204)'},{y:294,f:'rgb(149,190,113)'},{y:256,h:39,f:'rgb(244,198,59)'},{y:218,h:39},{y:179,h:39,f:'rgb(226,192,75)'},{y:141,h:39,f:'rgb(13,167,195)'},{y:102,h:39,f:'rgb(18,114,217)'},{y:64,f:'rgb(22,82,205)'},{y:26,h:39,f:'rgb(38,62,168)'},{x:243,y:448,w:39,h:39},{y:410},{y:371,h:39,f:'rgb(18,114,217)'},{y:333,h:39,f:'rgb(30,175,179)'},{y:294,f:'rgb(209,187,89)'},{y:256,h:39,f:'rgb(251,230,29)'},{y:218,h:39,f:'rgb(249,249,15)'},{y:179,h:39,f:'rgb(226,192,75)'},{y:141,h:39,f:'rgb(30,175,179)'},{y:102,h:39,f:'rgb(18,114,217)'},{y:64,f:'rgb(38,62,168)'},{y:26,h:39},{x:282,y:448,h:39},{y:410},{y:371,h:39,f:'rgb(18,114,217)'},{y:333,h:39,f:'rgb(14,143,209)'},{y:294,f:'rgb(149,190,113)'},{y:256,h:39,f:'rgb(226,192,75)'},{y:218,h:39,f:'rgb(244,198,59)'},{y:179,h:39,f:'rgb(149,190,113)'},{y:141,h:39,f:'rgb(9,157,204)'},{y:102,h:39,f:'rgb(18,114,217)'},{y:64,f:'rgb(38,62,168)'},{y:26,h:39},{x:320,y:448,w:39,h:39},{y:410},{y:371,h:39,f:'rgb(22,82,205)'},{y:333,h:39,f:'rgb(20,129,214)'},{y:294,f:'rgb(46,183,164)'},{y:256,h:39},{y:218,h:39,f:'rgb(82,186,146)'},{y:179,h:39,f:'rgb(9,157,204)'},{y:141,h:39,f:'rgb(20,129,214)'},{y:102,h:39,f:'rgb(16,100,220)'},{y:64,f:'rgb(38,62,168)'},{y:26,h:39},{x:358,y:448,h:39},{y:410},{y:371,h:39,f:'rgb(22,82,205)'},{y:333,h:39},{y:294,f:'rgb(16,100,220)'},{y:256,h:39,f:'rgb(20,129,214)'},{y:218,h:39,f:'rgb(14,143,209)'},{y:179,h:39,f:'rgb(18,114,217)'},{y:141,h:39,f:'rgb(22,82,205)'},{y:102,h:39,f:'rgb(38,62,168)'},{y:64},{y:26,h:39},{x:397,y:448,w:39,h:39},{y:371,h:39},{y:333,h:39},{y:294,f:'rgb(22,82,205)'},{y:256,h:39},{y:218,h:39},{y:179,h:39,f:'rgb(38,62,168)'},{y:141,h:39},{y:102,h:39},{y:64},{y:26,h:39},{x:435,y:410,h:39},{y:371,h:39},{y:333,h:39},{y:294},{y:256,h:39},{y:218,h:39},{y:179,h:39},{y:141,h:39},{y:102,h:39},{y:64},{x:474,y:256,h:39},{y:179,h:39}]
   };

   JSROOT.ToolbarIcons.th2colorz = {
      recs: [{x:128,y:486,w:256,h:26,f:'rgb(38,62,168)'},{y:461,f:'rgb(22,82,205)'},{y:435,f:'rgb(16,100,220)'},{y:410,f:'rgb(18,114,217)'},{y:384,f:'rgb(20,129,214)'},{y:358,f:'rgb(14,143,209)'},{y:333,f:'rgb(9,157,204)'},{y:307,f:'rgb(13,167,195)'},{y:282,f:'rgb(30,175,179)'},{y:256,f:'rgb(46,183,164)'},{y:230,f:'rgb(82,186,146)'},{y:205,f:'rgb(116,189,129)'},{y:179,f:'rgb(149,190,113)'},{y:154,f:'rgb(179,189,101)'},{y:128,f:'rgb(209,187,89)'},{y:102,f:'rgb(226,192,75)'},{y:77,f:'rgb(244,198,59)'},{y:51,f:'rgb(253,210,43)'},{y:26,f:'rgb(251,230,29)'},{y:0,f:'rgb(249,249,15)'}]
   };

   JSROOT.ToolbarIcons.th2draw3d = {
       path: "M172.768,0H51.726C23.202,0,0.002,23.194,0.002,51.712v89.918c0,28.512,23.2,51.718,51.724,51.718h121.042   c28.518,0,51.724-23.2,51.724-51.718V51.712C224.486,23.194,201.286,0,172.768,0z M177.512,141.63c0,2.611-2.124,4.745-4.75,4.745   H51.726c-2.626,0-4.751-2.134-4.751-4.745V51.712c0-2.614,2.125-4.739,4.751-4.739h121.042c2.62,0,4.75,2.125,4.75,4.739 L177.512,141.63L177.512,141.63z "+
             "M460.293,0H339.237c-28.521,0-51.721,23.194-51.721,51.712v89.918c0,28.512,23.2,51.718,51.721,51.718h121.045   c28.521,0,51.721-23.2,51.721-51.718V51.712C512.002,23.194,488.802,0,460.293,0z M465.03,141.63c0,2.611-2.122,4.745-4.748,4.745   H339.237c-2.614,0-4.747-2.128-4.747-4.745V51.712c0-2.614,2.133-4.739,4.747-4.739h121.045c2.626,0,4.748,2.125,4.748,4.739 V141.63z "+
             "M172.768,256.149H51.726c-28.524,0-51.724,23.205-51.724,51.726v89.915c0,28.504,23.2,51.715,51.724,51.715h121.042   c28.518,0,51.724-23.199,51.724-51.715v-89.915C224.486,279.354,201.286,256.149,172.768,256.149z M177.512,397.784   c0,2.615-2.124,4.736-4.75,4.736H51.726c-2.626-0.006-4.751-2.121-4.751-4.736v-89.909c0-2.626,2.125-4.753,4.751-4.753h121.042 c2.62,0,4.75,2.116,4.75,4.753L177.512,397.784L177.512,397.784z "+
             "M460.293,256.149H339.237c-28.521,0-51.721,23.199-51.721,51.726v89.915c0,28.504,23.2,51.715,51.721,51.715h121.045   c28.521,0,51.721-23.199,51.721-51.715v-89.915C512.002,279.354,488.802,256.149,460.293,256.149z M465.03,397.784   c0,2.615-2.122,4.736-4.748,4.736H339.237c-2.614,0-4.747-2.121-4.747-4.736v-89.909c0-2.626,2.121-4.753,4.747-4.753h121.045 c2.615,0,4.748,2.116,4.748,4.753V397.784z"
   };

   JSROOT.Painter.CreateDefaultPalette = function() {

      function HLStoRGB(h, l, s) {
         var r, g, b;
         if (s < 1e-300) {
            r = g = b = l; // achromatic
         } else {
            function hue2rgb(p, q, t) {
               if (t < 0) t += 1;
               if (t > 1) t -= 1;
               if (t < 1 / 6) return p + (q - p) * 6 * t;
               if (t < 1 / 2) return q;
               if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
               return p;
            }
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
         }
         return 'rgb(' + Math.round(r * 255) + ',' + Math.round(g * 255) + ',' + Math.round(b * 255) + ')';
      }

      var palette = [], saturation = 1, lightness = 0.5, maxHue = 280, minHue = 0, maxPretty = 50;
      for (var i = 0; i < maxPretty; ++i) {
         var hue = (maxHue - (i + 1) * ((maxHue - minHue) / maxPretty)) / 360.0;
         var rgbval = HLStoRGB(hue, lightness, saturation);
         palette.push(rgbval);
      }
      return palette;
   }

   JSROOT.Painter.CreateGrayPalette = function() {
      var palette = [];
      for (var i = 0; i < 50; ++i) {
         var code = Math.round((i+2)/60 * 255 );
         palette.push('rgb('+code+','+code+','+code+')');
      }
      return palette;
   }

   JSROOT.Painter.CreateGradientColorTable = function(Stops, Red, Green, Blue, NColors, alpha) {
      // skip all checks
       var palette = [];

       for (var g = 1; g < Stops.length; g++) {
          // create the colors...
          var nColorsGradient = parseInt(Math.floor(NColors*Stops[g]) - Math.floor(NColors*Stops[g-1]));
          for (var c = 0; c < nColorsGradient; c++) {
             var col = Math.round(Red[g-1] + c * (Red[g] - Red[g-1])/nColorsGradient) + "," +
                       Math.round(Green[g-1] + c * (Green[g] - Green[g-1])/ nColorsGradient) + "," +
                       Math.round(Blue[g-1] + c * (Blue[g] - Blue[g-1])/ nColorsGradient);
             palette.push("rgb("+col+")");
          }
       }

       return palette;
   }

   JSROOT.Painter.GetColorPalette = function(col,alfa) {
      if ((col===null) || (col===0)) col = JSROOT.gStyle.Palette;
      if ((col>0) && (col<10)) return JSROOT.Painter.CreateGrayPalette();
      if (col < 51) return JSROOT.Painter.CreateDefaultPalette();
      if (col > 112) col = 57;
      var red, green, blue,
          stops = [ 0.0000, 0.1250, 0.2500, 0.3750, 0.5000, 0.6250, 0.7500, 0.8750, 1.0000 ];
      switch(col) {

         // Deep Sea
         case 51:
            red   = [ 0,  9, 13, 17, 24,  32,  27,  25,  29];
            green = [ 0,  0,  0,  2, 37,  74, 113, 160, 221];
            blue  = [ 28, 42, 59, 78, 98, 129, 154, 184, 221];
            break;

         // Grey Scale
         case 52:
            red = [ 0, 32, 64, 96, 128, 160, 192, 224, 255];
            green = [ 0, 32, 64, 96, 128, 160, 192, 224, 255];
            blue = [ 0, 32, 64, 96, 128, 160, 192, 224, 255];
            break;

         // Dark Body Radiator
         case 53:
            red = [ 0, 45, 99, 156, 212, 230, 237, 234, 242];
            green = [ 0,  0,  0,  45, 101, 168, 238, 238, 243];
            blue = [ 0,  1,  1,   3,   9,   8,  11,  95, 230];
            break;

         // Two-color hue (dark blue through neutral gray to bright yellow)
         case 54:
            red = [  0,  22, 44, 68, 93, 124, 160, 192, 237];
            green = [  0,  16, 41, 67, 93, 125, 162, 194, 241];
            blue = [ 97, 100, 99, 99, 93,  68,  44,  26,  74];
            break;

         // Rain Bow
         case 55:
            red = [  0,   5,  15,  35, 102, 196, 208, 199, 110];
            green = [  0,  48, 124, 192, 206, 226,  97,  16,   0];
            blue = [ 99, 142, 198, 201,  90,  22,  13,   8,   2];
            break;

         // Inverted Dark Body Radiator
         case 56:
            red = [ 242, 234, 237, 230, 212, 156, 99, 45, 0];
            green = [ 243, 238, 238, 168, 101,  45,  0,  0, 0];
            blue = [ 230,  95,  11,   8,   9,   3,  1,  1, 0];
            break;

         // Bird
         case 57:
            red = [ 0.2082*255, 0.0592*255, 0.0780*255, 0.0232*255, 0.1802*255, 0.5301*255, 0.8186*255, 0.9956*255, 0.9764*255];
            green = [ 0.1664*255, 0.3599*255, 0.5041*255, 0.6419*255, 0.7178*255, 0.7492*255, 0.7328*255, 0.7862*255, 0.9832*255];
            blue = [ 0.5293*255, 0.8684*255, 0.8385*255, 0.7914*255, 0.6425*255, 0.4662*255, 0.3499*255, 0.1968*255, 0.0539*255];
            break;

         // Cubehelix
         case 58:
            red = [ 0.0000, 0.0956*255, 0.0098*255, 0.2124*255, 0.6905*255, 0.9242*255, 0.7914*255, 0.7596*255, 1.0000*255];
            green = [ 0.0000, 0.1147*255, 0.3616*255, 0.5041*255, 0.4577*255, 0.4691*255, 0.6905*255, 0.9237*255, 1.0000*255];
            blue = [ 0.0000, 0.2669*255, 0.3121*255, 0.1318*255, 0.2236*255, 0.6741*255, 0.9882*255, 0.9593*255, 1.0000*255];
            break;

         // Green Red Violet
         case 59:
            red = [13, 23, 25, 63, 76, 104, 137, 161, 206];
            green = [95, 67, 37, 21,  0,  12,  35,  52,  79];
            blue = [ 4,  3,  2,  6, 11,  22,  49,  98, 208];
            break;

         // Blue Red Yellow
         case 60:
            red = [0,  61,  89, 122, 143, 160, 185, 204, 231];
            green = [0,   0,   0,   0,  14,  37,  72, 132, 235];
            blue = [0, 140, 224, 144,   4,   5,   6,   9,  13];
            break;

         // Ocean
         case 61:
            red = [ 14,  7,  2,  0,  5,  11,  55, 131, 229];
            green = [105, 56, 26,  1, 42,  74, 131, 171, 229];
            blue = [  2, 21, 35, 60, 92, 113, 160, 185, 229];
            break;

         // Color Printable On Grey
         case 62:
            red = [ 0,   0,   0,  70, 148, 231, 235, 237, 244];
            green = [ 0,   0,   0,   0,   0,  69,  67, 216, 244];
            blue = [ 0, 102, 228, 231, 177, 124, 137,  20, 244];
            break;

         // Alpine
         case 63:
            red = [ 50, 56, 63, 68,  93, 121, 165, 192, 241];
            green = [ 66, 81, 91, 96, 111, 128, 155, 189, 241];
            blue = [ 97, 91, 75, 65,  77, 103, 143, 167, 217];
            break;

         // Aquamarine
         case 64:
            red = [ 145, 166, 167, 156, 131, 114, 101, 112, 132];
            green = [ 158, 178, 179, 181, 163, 154, 144, 152, 159];
            blue = [ 190, 199, 201, 192, 176, 169, 160, 166, 190];
            break;

         // Army
         case 65:
            red = [ 93,   91,  99, 108, 130, 125, 132, 155, 174];
            green = [ 126, 124, 128, 129, 131, 121, 119, 153, 173];
            blue = [ 103,  94,  87,  85,  80,  85, 107, 120, 146];
            break;

         // Atlantic
         case 66:
            red = [ 24, 40, 69,  90, 104, 114, 120, 132, 103];
            green = [ 29, 52, 94, 127, 150, 162, 159, 151, 101];
            blue = [ 29, 52, 96, 132, 162, 181, 184, 186, 131];
            break;

         // Aurora
         case 67:
            red = [ 46, 38, 61, 92, 113, 121, 132, 150, 191];
            green = [ 46, 36, 40, 69, 110, 135, 131,  92,  34];
            blue = [ 46, 80, 74, 70,  81, 105, 165, 211, 225];
            break;

         // Avocado
         case 68:
            red = [ 0,  4, 12,  30,  52, 101, 142, 190, 237];
            green = [ 0, 40, 86, 121, 140, 172, 187, 213, 240];
            blue = [ 0,  9, 14,  18,  21,  23,  27,  35, 101];
            break;

         // Beach
         case 69:
            red = [ 198, 206, 206, 211, 198, 181, 161, 171, 244];
            green = [ 103, 133, 150, 172, 178, 174, 163, 175, 244];
            blue = [  49,  54,  55,  66,  91, 130, 184, 224, 244];
            break;

         // Black Body
         case 70:
            red = [ 243, 243, 240, 240, 241, 239, 186, 151, 129];
            green = [ 0,  46,  99, 149, 194, 220, 183, 166, 147];
            blue = [ 6,   8,  36,  91, 169, 235, 246, 240, 233];
            break;

         // Blue Green Yellow
         case 71:
            red = [ 22, 19,  19,  25,  35,  53,  88, 139, 210];
            green = [ 0, 32,  69, 108, 135, 159, 183, 198, 215];
            blue = [ 77, 96, 110, 116, 110, 100,  90,  78,  70];
            break;

         // Brown Cyan
         case 72:
            red = [ 68, 116, 165, 182, 189, 180, 145, 111,  71];
            green = [ 37,  82, 135, 178, 204, 225, 221, 202, 147];
            blue = [ 16,  55, 105, 147, 196, 226, 232, 224, 178];
            break;

         // CMYK
         case 73:
            red = [ 61,  99, 136, 181, 213, 225, 198, 136, 24];
            green = [ 149, 140,  96,  83, 132, 178, 190, 135, 22];
            blue = [ 214, 203, 168, 135, 110, 100, 111, 113, 22];
            break;

         // Candy
         case 74:
            red = [ 76, 120, 156, 183, 197, 180, 162, 154, 140];
            green = [ 34,  35,  42,  69, 102, 137, 164, 188, 197];
            blue = [ 64,  69,  78, 105, 142, 177, 205, 217, 198];
            break;

         // Cherry
         case 75:
            red = [ 37, 102, 157, 188, 196, 214, 223, 235, 251];
            green = [ 37,  29,  25,  37,  67,  91, 132, 185, 251];
            blue = [ 37,  32,  33,  45,  66,  98, 137, 187, 251];
            break;

         // Coffee
         case 76:
            red = [ 79, 100, 119, 137, 153, 172, 192, 205, 250];
            green = [ 63,  79,  93, 103, 115, 135, 167, 196, 250];
            blue = [ 51,  59,  66,  61,  62,  70, 110, 160, 250];
            break;

         // Dark Rain Bow
         case 77:
            red = [  43,  44, 50,  66, 125, 172, 178, 155, 157];
            green = [  63,  63, 85, 101, 138, 163, 122,  51,  39];
            blue = [ 121, 101, 58,  44,  47,  55,  57,  44,  43];
            break;

         // Dark Terrain
         case 78:
            red = [  0, 41, 62, 79, 90, 87, 99, 140, 228];
            green = [  0, 57, 81, 93, 85, 70, 71, 125, 228];
            blue = [ 95, 91, 91, 82, 60, 43, 44, 112, 228];
            break;

         // Fall
         case 79:
            red = [ 49, 59, 72, 88, 114, 141, 176, 205, 222];
            green = [ 78, 72, 66, 57,  59,  75, 106, 142, 173];
            blue = [ 78, 55, 46, 40,  39,  39,  40,  41,  47];
            break;

         // Fruit Punch
         case 80:
            red = [ 243, 222, 201, 185, 165, 158, 166, 187, 219];
            green = [  94, 108, 132, 135, 125,  96,  68,  51,  61];
            blue = [   7,  9,   12,  19,  45,  89, 118, 146, 118];
            break;

         // Fuchsia
         case 81:
            red = [ 19, 44, 74, 105, 137, 166, 194, 206, 220];
            green = [ 19, 28, 40,  55,  82, 110, 159, 181, 220];
            blue = [ 19, 42, 68,  96, 129, 157, 188, 203, 220];
            break;

         // Grey Yellow
         case 82:
            red = [ 33, 44, 70,  99, 140, 165, 199, 211, 216];
            green = [ 38, 50, 76, 105, 140, 165, 191, 189, 167];
            blue = [ 55, 67, 97, 124, 140, 166, 163, 129,  52];
            break;

         // Green Brown Terrain
         case 83:
            red = [ 0, 33, 73, 124, 136, 152, 159, 171, 223];
            green = [ 0, 43, 92, 124, 134, 126, 121, 144, 223];
            blue = [ 0, 43, 68,  76,  73,  64,  72, 114, 223];
            break;

         // Green Pink
         case 84:
            red = [  5,  18,  45, 124, 193, 223, 205, 128, 49];
            green = [ 48, 134, 207, 230, 193, 113,  28,   0,  7];
            blue = [  6,  15,  41, 121, 193, 226, 208, 130, 49];
            break;

         // Island
         case 85:
            red = [ 180, 106, 104, 135, 164, 188, 189, 165, 144];
            green = [  72, 126, 154, 184, 198, 207, 205, 190, 179];
            blue = [  41, 120, 158, 188, 194, 181, 145, 100,  62];
            break;

         // Lake
         case 86:
            red = [  57,  72,  94, 117, 136, 154, 174, 192, 215];
            green = [   0,  33,  68, 109, 140, 171, 192, 196, 209];
            blue = [ 116, 137, 173, 201, 200, 201, 203, 190, 187];
            break;

         // Light Temperature
         case 87:
            red = [  31,  71, 123, 160, 210, 222, 214, 199, 183];
            green = [  40, 117, 171, 211, 231, 220, 190, 132,  65];
            blue = [ 234, 214, 228, 222, 210, 160, 105,  60,  34];
            break;

         // Light Terrain
         case 88:
            red = [ 123, 108, 109, 126, 154, 172, 188, 196, 218];
            green = [ 184, 138, 130, 133, 154, 175, 188, 196, 218];
            blue = [ 208, 130, 109,  99, 110, 122, 150, 171, 218];
            break;

         // Mint
         case 89:
            red = [ 105, 106, 122, 143, 159, 172, 176, 181, 207];
            green = [ 252, 197, 194, 187, 174, 162, 153, 136, 125];
            blue = [ 146, 133, 144, 155, 163, 167, 166, 162, 174];
            break;

         // Neon
         case 90:
            red = [ 171, 141, 145, 152, 154, 159, 163, 158, 177];
            green = [ 236, 143, 100,  63,  53,  55,  44,  31,   6];
            blue = [  59,  48,  46,  44,  42,  54,  82, 112, 179];
            break;

         // Pastel
         case 91:
            red = [ 180, 190, 209, 223, 204, 228, 205, 152,  91];
            green = [  93, 125, 147, 172, 181, 224, 233, 198, 158];
            blue = [ 236, 218, 160, 133, 114, 132, 162, 220, 218];
            break;

         // Pearl
         case 92:
            red = [ 225, 183, 162, 135, 115, 111, 119, 145, 211];
            green = [ 205, 177, 166, 135, 124, 117, 117, 132, 172];
            blue = [ 186, 165, 155, 135, 126, 130, 150, 178, 226];
            break;

         // Pigeon
         case 93:
            red = [ 39, 43, 59, 63, 80, 116, 153, 177, 223];
            green = [ 39, 43, 59, 74, 91, 114, 139, 165, 223];
            blue = [ 39, 50, 59, 70, 85, 115, 151, 176, 223];
            break;

         // Plum
         case 94:
            red = [ 0, 38, 60, 76, 84, 89, 101, 128, 204];
            green = [ 0, 10, 15, 23, 35, 57,  83, 123, 199];
            blue = [ 0, 11, 22, 40, 63, 86,  97,  94,  85];
            break;

         // Red Blue
         case 95:
            red = [ 94, 112, 141, 165, 167, 140,  91,  49,  27];
            green = [ 27,  46,  88, 135, 166, 161, 135,  97,  58];
            blue = [ 42,  52,  81, 106, 139, 158, 155, 137, 116];
            break;

         // Rose
         case 96:
            red = [ 30, 49, 79, 117, 135, 151, 146, 138, 147];
            green = [ 63, 60, 72,  90,  94,  94,  68,  46,  16];
            blue = [ 18, 28, 41,  56,  62,  63,  50,  36,  21];
            break;

         // Rust
         case 97:
            red = [  0, 30, 63, 101, 143, 152, 169, 187, 230];
            green = [  0, 14, 28,  42,  58,  61,  67,  74,  91];
            blue = [ 39, 26, 21,  18,  15,  14,  14,  13,  13];
            break;

         // Sandy Terrain
         case 98:
            red = [ 149, 140, 164, 179, 182, 181, 131, 87, 61];
            green = [  62,  70, 107, 136, 144, 138, 117, 87, 74];
            blue = [  40,  38,  45,  49,  49,  49,  38, 32, 34];
            break;

         // Sienna
         case 99:
            red = [ 99, 112, 148, 165, 179, 182, 183, 183, 208];
            green = [ 39,  40,  57,  79, 104, 127, 148, 161, 198];
            blue = [ 15,  16,  18,  33,  51,  79, 103, 129, 177];
            break;

         // Solar
         case 100:
            red = [ 99, 116, 154, 174, 200, 196, 201, 201, 230];
            green = [  0,   0,   8,  32,  58,  83, 119, 136, 173];
            blue = [  5,   6,   7,   9,   9,  14,  17,  19,  24];
            break;

         // South West
         case 101:
            red = [ 82, 106, 126, 141, 155, 163, 142, 107,  66];
            green = [ 62,  44,  69, 107, 135, 152, 149, 132, 119];
            blue = [ 39,  25,  31,  60,  73,  68,  49,  72, 188];
            break;

         // Starry Night
         case 102:
            red = [ 18, 29, 44,  72, 116, 158, 184, 208, 221];
            green = [ 27, 46, 71, 105, 146, 177, 189, 190, 183];
            blue = [ 39, 55, 80, 108, 130, 133, 124, 100,  76];
            break;

         // Sunset
         case 103:
            red = [ 0, 48, 119, 173, 212, 224, 228, 228, 245];
            green = [ 0, 13,  30,  47,  79, 127, 167, 205, 245];
            blue = [ 0, 68,  75,  43,  16,  22,  55, 128, 245];
            break;

         // Temperature Map
         case 104:
            red = [  34,  70, 129, 187, 225, 226, 216, 193, 179];
            green = [  48,  91, 147, 194, 226, 229, 196, 110,  12];
            blue = [ 234, 212, 216, 224, 206, 110,  53,  40,  29];
            break;

         // Thermometer
         case 105:
            red = [  30,  55, 103, 147, 174, 203, 188, 151, 105];
            green = [   0,  65, 138, 182, 187, 175, 121,  53,   9];
            blue = [ 191, 202, 212, 208, 171, 140,  97,  57,  30];
            break;

         // Valentine
         case 106:
            red = [ 112, 97, 113, 125, 138, 159, 178, 188, 225];
            green = [  16, 17,  24,  37,  56,  81, 110, 136, 189];
            blue = [  38, 35,  46,  59,  78, 103, 130, 152, 201];
            break;

         // Visible Spectrum
         case 107:
            red = [ 18,  72,   5,  23,  29, 201, 200, 98, 29];
            green = [  0,   0,  43, 167, 211, 117,   0,  0,  0];
            blue = [ 51, 203, 177,  26,  10,   9,   8,  3,  0];
            break;

         // Water Melon
         case 108:
            red = [ 19, 42, 64,  88, 118, 147, 175, 187, 205];
            green = [ 19, 55, 89, 125, 154, 169, 161, 129,  70];
            blue = [ 19, 32, 47,  70, 100, 128, 145, 130,  75];
            break;

         // Cool
         case 109:
            red = [  33,  31,  42,  68,  86, 111, 141, 172, 227];
            green = [ 255, 175, 145, 106,  88,  55,  15,   0,   0];
            blue = [ 255, 205, 202, 203, 208, 205, 203, 206, 231];
            break;

         // Copper
         case 110:
            red = [ 0, 25, 50, 79, 110, 145, 181, 201, 254];
            green = [ 0, 16, 30, 46,  63,  82, 101, 124, 179];
            blue = [ 0, 12, 21, 29,  39,  49,  61,  74, 103];
            break;

         // Gist Earth
         case 111:
            red = [ 0, 13,  30,  44,  72, 120, 156, 200, 247];
            green = [ 0, 36,  84, 117, 141, 153, 151, 158, 247];
            blue = [ 0, 94, 100,  82,  56,  66,  76, 131, 247];
            break;

         // Viridis
         case 112:
            red = [ 26, 51,  43,  33,  28,  35,  74, 144, 246];
            green = [  9, 24,  55,  87, 118, 150, 180, 200, 222];
            blue = [ 30, 96, 112, 114, 112, 101,  72,  35,   0];
            break;

         default:
            return JSROOT.Painter.CreateDefaultPalette();
      }

      return JSROOT.Painter.CreateGradientColorTable(stops, red, green, blue, 255, alfa);
   }

   // ==============================================================================

   JSROOT.Painter.drawEllipse = function() {

      var ellipse = this.GetObject();

      if(!this.lineatt) this.lineatt = JSROOT.Painter.createAttLine(ellipse);
      if (!this.fillatt) this.fillatt = this.createAttFill(ellipse);

      // create svg:g container for ellipse drawing
      this.RecreateDrawG(true, "text_layer");

      var x = this.AxisToSvg("x", ellipse.fX1, false),
          y = this.AxisToSvg("y", ellipse.fY1, false),
          rx = this.AxisToSvg("x", ellipse.fX1 + ellipse.fR1, false) - x,
          ry = y - this.AxisToSvg("y", ellipse.fY1 + ellipse.fR2, false);

      if ((ellipse.fPhimin == 0) && (ellipse.fPhimax == 360) && (ellipse.fTheta == 0)) {
            // this is simple case, which could be drawn with svg:ellipse
         this.draw_g.append("svg:ellipse")
                    .attr("cx", x).attr("cy", y)
                    .attr("rx", rx).attr("ry", ry)
                    .call(this.lineatt.func).call(this.fillatt.func);
         return;
      }

      // here svg:path is used to draw more complex figure

      var ct = Math.cos(Math.PI*ellipse.fTheta/180),
          st = Math.sin(Math.PI*ellipse.fTheta/180),
          dx1 = rx * Math.cos(ellipse.fPhimin*Math.PI/180),
          dy1 = ry * Math.sin(ellipse.fPhimin*Math.PI/180),
          x1 =  dx1*ct - dy1*st,
          y1 = -dx1*st - dy1*ct,
          dx2 = rx * Math.cos(ellipse.fPhimax*Math.PI/180),
          dy2 = ry * Math.sin(ellipse.fPhimax*Math.PI/180),
          x2 =  dx2*ct - dy2*st,
          y2 = -dx2*st - dy2*ct;

      this.draw_g
         .attr("transform","translate("+x.toFixed(1)+","+y.toFixed(1)+")")
         .append("svg:path")
         .attr("d", "M 0,0" +
                    " L " + x1.toFixed(1) + "," + y1.toFixed(1) +
                    " A " + rx.toFixed(1) + " " + ry.toFixed(1) + " " + -ellipse.fTheta.toFixed(1) + " 1 0 " + x2.toFixed(1) + "," + y2.toFixed(1) +
                    " L 0,0 Z")
         .call(this.lineatt.func).call(this.fillatt.func);
   }

   // =============================================================================

   JSROOT.Painter.drawLine = function() {
      var line = this.GetObject(),
          lineatt = JSROOT.Painter.createAttLine(line),
          kLineNDC = JSROOT.BIT(14),
          isndc = line.TestBit(kLineNDC);

      // create svg:g container for line drawing
      this.RecreateDrawG(true, "text_layer");

      this.draw_g
          .append("svg:line")
          .attr("x1", this.AxisToSvg("x", line.fX1, isndc))
          .attr("y1", this.AxisToSvg("y", line.fY1, isndc))
          .attr("x2", this.AxisToSvg("x", line.fX2, isndc))
          .attr("y2", this.AxisToSvg("y", line.fY2, isndc))
          .call(lineatt.func);
   }

   // =============================================================================

   JSROOT.Painter.drawPolyLine = function() {

      var polyline = this.GetObject(),
          lineatt = JSROOT.Painter.createAttLine(polyline),
          fillatt = this.createAttFill(polyline),
          kPolyLineNDC = JSROOT.BIT(14),
          isndc = polyline.TestBit(kPolyLineNDC),
          cmd = "";

      // create svg:g container for polyline drawing
      this.RecreateDrawG(true, "text_layer");

      for (var n=0;n<=polyline.fLastPoint;++n)
         cmd += ((n>0) ? "L" : "M") +
                this.AxisToSvg("x", polyline.fX[n], isndc) + "," +
                this.AxisToSvg("y", polyline.fY[n], isndc);

      if (fillatt.color!=='none') cmd+="Z";

      this.draw_g
          .append("svg:path")
          .attr("d", cmd)
          .call(lineatt.func)
          .call(fillatt.func);
   }

   // =============================================================================

   JSROOT.Painter.drawBox = function(divid, obj, opt) {

      var box = this.GetObject(),
          draw_line = (typeof this._drawopt == 'string') && (this._drawopt.toUpperCase().indexOf("L")>=0),
          lineatt = JSROOT.Painter.createAttLine(box),
          fillatt = this.createAttFill(box);

      // create svg:g container for box drawing
      this.RecreateDrawG(true, "text_layer");

      var x1 = this.AxisToSvg("x", box.fX1, false),
          x2 = this.AxisToSvg("x", box.fX2, false),
          y1 = this.AxisToSvg("y", box.fY1, false),
          y2 = this.AxisToSvg("y", box.fY2, false);

      // if box filled, contour line drawn only with "L" draw option:
      if ((fillatt.color != 'none') && !draw_line) lineatt.color = "none";

      this.draw_g
          .append("svg:rect")
          .attr("x", Math.min(x1,x2))
          .attr("y", Math.min(y1,y2))
          .attr("width", Math.abs(x2-x1))
          .attr("height", Math.abs(y1-y2))
          .call(lineatt.func)
          .call(fillatt.func);
   }

   // =============================================================================

   JSROOT.Painter.drawMarker = function() {
      var marker = this.GetObject(),
          att = JSROOT.Painter.createAttMarker(marker),
          kMarkerNDC = JSROOT.BIT(14),
          isndc = marker.TestBit(kMarkerNDC);

      // create svg:g container for box drawing
      this.RecreateDrawG(true, "text_layer");

      var x = this.AxisToSvg("x", marker.fX, isndc),
          y = this.AxisToSvg("y", marker.fY, isndc),
          path = att.create(x,y);

      if (path && path.length > 0)
         this.draw_g.append("svg:path")
             .attr("d", path)
             .call(att.func);
   }

   // ======================================================================================

   JSROOT.Painter.drawArrow = function() {
      var arrow = this.GetObject();
      if (!this.lineatt) this.lineatt = JSROOT.Painter.createAttLine(arrow);
      if (!this.fillatt) this.fillatt = this.createAttFill(arrow);

      var wsize = Math.max(this.pad_width(), this.pad_height()) * arrow.fArrowSize;
      if (wsize<3) wsize = 3;
      var hsize = wsize * Math.tan(arrow.fAngle/2 * (Math.PI/180));

      // create svg:g container for line drawing
      this.RecreateDrawG(true, "text_layer");

      var x1 = this.AxisToSvg("x", arrow.fX1, false),
          y1 = this.AxisToSvg("y", arrow.fY1, false),
          x2 = this.AxisToSvg("x", arrow.fX2, false),
          y2 = this.AxisToSvg("y", arrow.fY2, false),
          right_arrow = "M0,0" + " L"+wsize.toFixed(1) +","+hsize.toFixed(1) + " L0," + (hsize*2).toFixed(1),
          left_arrow =  "M" + wsize.toFixed(1) + ", 0" + " L 0," + hsize.toFixed(1) + " L " + wsize.toFixed(1) + "," + (hsize*2).toFixed(1),
          m_start = null, m_mid = null, m_end = null, defs = null,
          oo = arrow.fOption, len = oo.length;

      if (oo.indexOf("<")==0) {
         var closed = (oo.indexOf("<|") == 0);
         if (!defs) defs = this.draw_g.append("defs");
         m_start = "jsroot_arrowmarker_" +  JSROOT.id_counter++;
         var beg = defs.append("svg:marker")
                       .attr("id", m_start)
                       .attr("markerWidth", wsize.toFixed(1))
                       .attr("markerHeight", (hsize*2).toFixed(1))
                       .attr("refX", "0")
                       .attr("refY", hsize.toFixed(1))
                       .attr("orient", "auto")
                       .attr("markerUnits", "userSpaceOnUse")
                       .append("svg:path")
                       .style("fill","none")
                       .attr("d", left_arrow + (closed ? " Z" : ""))
                       .call(this.lineatt.func);
         if (closed) beg.call(this.fillatt.func);
      }

      var midkind = 0;
      if (oo.indexOf("->-")>=0)  midkind = 1; else
      if (oo.indexOf("-|>-")>=0) midkind = 11; else
      if (oo.indexOf("-<-")>=0) midkind = 2; else
      if (oo.indexOf("-<|-")>=0) midkind = 12;

      if (midkind > 0) {
         var closed = midkind > 10;
         if (!defs) defs = this.draw_g.append("defs");
         m_mid = "jsroot_arrowmarker_" + JSROOT.id_counter++;

         var mid = defs.append("svg:marker")
                      .attr("id", m_mid)
                      .attr("markerWidth", wsize.toFixed(1))
                      .attr("markerHeight", (hsize*2).toFixed(1))
                      .attr("refX", (wsize*0.5).toFixed(1))
                      .attr("refY", hsize.toFixed(1))
                      .attr("orient", "auto")
                      .attr("markerUnits", "userSpaceOnUse")
                      .append("svg:path")
                      .style("fill","none")
                      .attr("d", ((midkind % 10 == 1) ? right_arrow : left_arrow) +
                            ((midkind > 10) ? " Z" : ""))
                            .call(this.lineatt.func);
         if (midkind > 10) mid.call(this.fillatt.func);
      }

      if (oo.lastIndexOf(">") == len-1) {
         var closed = (oo.lastIndexOf("|>") == len-2) && (len>1);
         if (!defs) defs = this.draw_g.append("defs");
         m_end = "jsroot_arrowmarker_" + JSROOT.id_counter++;
         var end = defs.append("svg:marker")
                       .attr("id", m_end)
                       .attr("markerWidth", wsize.toFixed(1))
                       .attr("markerHeight", (hsize*2).toFixed(1))
                       .attr("refX", wsize.toFixed(1))
                       .attr("refY", hsize.toFixed(1))
                       .attr("orient", "auto")
                       .attr("markerUnits", "userSpaceOnUse")
                       .append("svg:path")
                       .style("fill","none")
                       .attr("d", right_arrow + (closed ? " Z" : ""))
                       .call(this.lineatt.func);
         if (closed) end.call(this.fillatt.func);
      }

      var path = this.draw_g
           .append("svg:path")
           .attr("d",  "M" + x1 + "," + y1 +
                       ((m_mid == null) ? "" : "L" + (x1/2+x2/2).toFixed(1) + "," + (y1/2+y2/2).toFixed(1)) +
                       " L" + x2 + "," + y2)
            .call(this.lineatt.func);

      if (m_start) path.style("marker-start","url(#" + m_start + ")");
      if (m_mid) path.style("marker-mid","url(#" + m_mid + ")");
      if (m_end) path.style("marker-end","url(#" + m_end + ")");
   }

   // =================================================================================

   JSROOT.Painter.drawRooPlot = function(divid, plot, opt) {

      var painter = new JSROOT.TObjectPainter(plot), cnt = -1;

      function DrawNextItem() {
         if (++cnt >= plot._items.arr.length) return painter.DrawingReady();

         JSROOT.draw(divid, plot._items.arr[cnt], plot._items.opt[cnt], DrawNextItem);
      }

      JSROOT.draw(divid, plot._hist, "hist", DrawNextItem);

      return painter;
   }

   // ===================================================================================

   JSROOT.TF1Painter = function(tf1) {
      JSROOT.TObjectPainter.call(this, tf1);
      this.bins = null;
   }

   JSROOT.TF1Painter.prototype = Object.create(JSROOT.TObjectPainter.prototype);

   JSROOT.TF1Painter.prototype.Eval = function(x) {
      return this.GetObject().evalPar(x);
   }

   JSROOT.TF1Painter.prototype.CreateBins = function(ignore_zoom) {
      var main = this.main_painter(), gxmin = 0, gxmax = 0, tf1 = this.GetObject();

      if ((main!==null) && !ignore_zoom)  {
         if (main.zoom_xmin !== main.zoom_xmax) {
            gxmin = main.zoom_xmin;
            gxmax = main.zoom_xmax;
         } else {
            gxmin = main.xmin;
            gxmax = main.xmax;
         }
      }

      if ((tf1.fSave.length > 0) && !this.nosave) {
         // in the case where the points have been saved, useful for example
         // if we don't have the user's function
         var np = tf1.fSave.length - 2,
             xmin = tf1.fSave[np],
             xmax = tf1.fSave[np+1],
             dx = (xmax - xmin) / (np-1),
             res = [];

         for (var n=0; n < np; ++n) {
            var xx = xmin + dx*n;
            // check if points need to be displayed at all, keep at least 4-5 points for Bezier curves
            if ((gxmin !== gxmax) && ((xx + 2*dx < gxmin) || (xx - 2*dx > gxmax))) continue;
            var yy = tf1.fSave[n];

            if (!isNaN(yy)) res.push({ x : xx, y : yy });
         }
         return res;
      }

      var xmin = tf1.fXmin, xmax = tf1.fXmax, logx = false, pad = this.root_pad();

      if (gxmin !== gxmax) {
         if (gxmin > xmin) xmin = gxmin;
         if (gxmax < xmax) xmax = gxmax;
      }

      if ((main!==null) && main.logx && (xmin>0) && (xmax>0)) {
         logx = true;
         xmin = Math.log(xmin);
         xmax = Math.log(xmax);
      }

      var np = Math.max(tf1.fNpx, 101),
         dx = (xmax - xmin) / (np - 1),
         res = [];

      for (var n=0; n < np; n++) {
         var xx = xmin + n*dx;
         if (logx) xx = Math.exp(xx);
         var yy = this.Eval(xx);
         if (!isNaN(yy)) res.push({ x : xx, y : yy });
      }
      return res;
   }

   JSROOT.TF1Painter.prototype.CreateDummyHisto = function() {

      var xmin = 0, xmax = 1, ymin = 0, ymax = 1,
          bins = this.CreateBins(true);

      if ((bins!==null) && (bins.length > 0)) {

         xmin = xmax = bins[0].x;
         ymin = ymax = bins[0].y;

         bins.forEach(function(bin) {
            xmin = Math.min(bin.x, xmin);
            xmax = Math.max(bin.x, xmax);
            ymin = Math.min(bin.y, ymin);
            ymax = Math.max(bin.y, ymax);
         });

         if (ymax > 0.0) ymax *= 1.05;
         if (ymin < 0.0) ymin *= 1.05;
      }

      var histo = JSROOT.Create("TH1I"),
          tf1 = this.GetObject();

      histo.fName = tf1.fName + "_hist";
      if (tf1.fTitle.indexOf(';')!==0) {
         var array = tf1.fTitle.split(';');
         histo.fTitle = array[0];
         if (array.length>1)
            histo.fXaxis.fTitle = array[1];
         if (array.length>2)
            histo.fYaxis.fTitle = array[2];
      }
      else histo.fTitle = tf1.fTitle;

      histo.fXaxis.fXmin = xmin;
      histo.fXaxis.fXmax = xmax;
      histo.fYaxis.fXmin = ymin;
      histo.fYaxis.fXmax = ymax;

      return histo;
   }

   JSROOT.TF1Painter.prototype.ProcessTooltipFunc = function(pnt) {
      var cleanup = false;

      if ((pnt === null) || (this.bins===null)) {
         cleanup = true;
      } else
      if ((this.bins.length==0) || (pnt.x < this.bins[0].grx) || (pnt.x > this.bins[this.bins.length-1].grx)) {
         cleanup = true;
      }

      if (cleanup) {
         if (this.draw_g !== null)
            this.draw_g.select(".tooltip_bin").remove();
         return null;
      }

      var min = 100000, best = -1, bin;

      for(var n=0; n<this.bins.length; ++n) {
         bin = this.bins[n];
         var dist = Math.abs(bin.grx - pnt.x);
         if (dist < min) { min = dist; best = n; }
      }

      bin = this.bins[best];

      var gbin = this.draw_g.select(".tooltip_bin"),
          radius = this.lineatt.width + 3;

      if (gbin.empty())
         gbin = this.draw_g.append("svg:circle")
                           .attr("class","tooltip_bin")
                           .style("pointer-events","none")
                           .attr("r", radius)
                           .call(this.lineatt.func)
                           .call(this.fillatt.func);

      var res = { name: this.GetObject().fName,
                  title: this.GetObject().fTitle,
                  x: bin.grx,
                  y: bin.gry,
                  color1: this.lineatt.color,
                  color2: this.fillatt.color,
                  lines: [],
                  exact : (Math.abs(bin.grx - pnt.x) < radius) && (Math.abs(bin.gry - pnt.y) < radius) };

      res.changed = gbin.property("current_bin") !== best;
      res.menu = res.exact;
      res.menu_dist = Math.sqrt((bin.grx-pnt.x)*(bin.grx-pnt.x) + (bin.gry-pnt.y)*(bin.grx-pnt.x));

      if (res.changed)
         gbin.attr("cx", bin.grx)
             .attr("cy", bin.gry)
             .property("current_bin", best);

      var name = this.GetTipName();
      if (name.length > 0) res.lines.push(name);

      var pmain = this.main_painter();
      if (pmain!==null)
         res.lines.push("x = " + pmain.AxisAsText("x",bin.x) + " y = " + pmain.AxisAsText("y",bin.y));

      return res;
   }

   JSROOT.TF1Painter.prototype.Redraw = function() {

      var w = this.frame_width(), h = this.frame_height(), tf1 = this.GetObject();

      this.RecreateDrawG(false, "main_layer");

      // recalculate drawing bins when necessary
      this.bins = this.CreateBins(false);

      var pthis = this;
      var pmain = this.main_painter();
      var name = this.GetTipName("\n");

      if (!this.lineatt)
         this.lineatt = JSROOT.Painter.createAttLine(tf1);
      this.lineatt.used = false;
      if (!this.fillatt)
         this.fillatt = this.createAttFill(tf1, undefined, undefined, 1);
      this.fillatt.used = false;

      var n, bin;
      // first calculate graphical coordinates
      for(n=0; n<this.bins.length; ++n) {
         bin = this.bins[n];
         //bin.grx = Math.round(pmain.grx(bin.x));
         //bin.gry = Math.round(pmain.gry(bin.y));
         bin.grx = pmain.grx(bin.x);
         bin.gry = pmain.gry(bin.y);
      }

      if (this.bins.length > 2) {

         var h0 = h;  // use maximal frame height for filling
         if ((pmain.hmin!==undefined) && (pmain.hmin>=0)) {
            h0 = Math.round(pmain.gry(0));
            if ((h0 > h) || (h0 < 0)) h0 = h;
         }

         var path = JSROOT.Painter.BuildSvgPath("bezier", this.bins, h0, 2);

         if (this.lineatt.color != "none")
            this.draw_g.append("svg:path")
               .attr("class", "line")
               .attr("d", path.path)
               .style("fill", "none")
               .call(this.lineatt.func);

         if (this.fillatt.color != "none")
            this.draw_g.append("svg:path")
               .attr("class", "area")
               .attr("d", path.path + path.close)
               .style("stroke", "none")
               .call(this.fillatt.func);
      }

      delete this.ProcessTooltip;

     if (JSROOT.gStyle.Tooltip > 0)
        this.ProcessTooltip = this.ProcessTooltipFunc;
   }

   JSROOT.TF1Painter.prototype.CanZoomIn = function(axis,min,max) {
      if (axis!=="x") return false;

      var tf1 = this.GetObject();

      if (tf1.fSave.length > 0) {
         // in the case where the points have been saved, useful for example
         // if we don't have the user's function
         var nb_points = tf1.fNpx;

         var xmin = tf1.fSave[nb_points + 1];
         var xmax = tf1.fSave[nb_points + 2];

         return Math.abs(xmin - xmax) / nb_points < Math.abs(min - max);
      }

      // if function calculated, one always could zoom inside
      return true;
   }

   JSROOT.TF1Painter.prototype.PerformDraw = function() {
      if (this.main_painter() === null) {
         var histo = this.CreateDummyHisto(), pthis = this;
         JSROOT.draw(this.divid, histo, "AXIS", function(hpainter) {
            pthis.SetDivId(pthis.divid);
            pthis.Redraw();
            return pthis.DrawingReady();
         });
         return pthis;
      }

      this.SetDivId(this.divid);
      this.Redraw();
      return this.DrawingReady();
   }

   JSROOT.Painter.drawFunction = function(divid, tf1, opt) {

      var painter = new JSROOT.TF1Painter(tf1);

      painter.SetDivId(divid, -1);
      var d = new JSROOT.DrawOptions(opt);
      painter.nosave = d.check('NOSAVE');

      if (JSROOT.Math !== undefined)
         return painter.PerformDraw();

      JSROOT.AssertPrerequisites("math", painter.PerformDraw.bind(painter));
      return painter;
   }

   // =======================================================================

   JSROOT.TGraphPainter = function(graph) {
      JSROOT.TObjectPainter.call(this, graph);
      this.ownhisto = false; // indicate if graph histogram was drawn for axes
      this.bins = null;
      this.xmin = this.ymin = this.xmax = this.ymax = 0;
      this.wheel_zoomy = true;
      this.is_bent = (graph._typename == 'TGraphBentErrors');
      this.has_errors = (graph._typename == 'TGraphErrors') ||
                        (graph._typename == 'TGraphAsymmErrors') ||
                         this.is_bent || graph._typename.match(/^RooHist/);
   }

   JSROOT.TGraphPainter.prototype = Object.create(JSROOT.TObjectPainter.prototype);

   JSROOT.TGraphPainter.prototype.Redraw = function() {
      this.DrawBins();
   }

   JSROOT.TGraphPainter.prototype.DecodeOptions = function(opt) {

      var d = new JSROOT.DrawOptions(opt);

      var res = { Line:0, Curve:0, Rect:0, Mark:0, Bar:0, OutRange: 0,  EF:0, Fill:0,
                  Errors: 0, MainError: 1, Ends: 1, Axis: "AXIS" };

      var graph = this.GetObject();

      if (this.has_errors) res.Errors = 1;

      if (d.check('L')) res.Line = 1;
      if (d.check('F')) res.Fill = 1;
      if (d.check('A')) res.Axis = "AXIS";
      if (d.check('X+')) res.Axis += "X+";
      if (d.check('Y+')) res.Axis += "Y+";
      if (d.check('C')) { res.Curve = 1; if (!res.Fill) res.Line = 1; }
      if (d.check('*')) res.Mark = 103;
      if (d.check('P0')) res.Mark = 104;
      if (d.check('P')) res.Mark = 1;
      if (d.check('B')) { res.Bar = 1; res.Errors = 0; }
      if (d.check('Z')) { res.Errors = 1; res.Ends = 0; }
      if (d.check('||')) { res.Errors = 1; res.MainError = 0; res.Ends = 1; }
      if (d.check('[]')) { res.Errors = 1; res.MainError = 0; res.Ends = 2; }
      if (d.check('|>')) { res.Errors = 1; res.Ends = 3; }
      if (d.check('>')) { res.Errors = 1; res.Ends = 4; }
      if (d.check('0')) { res.Mark = 1; res.Errors = 1; res.OutRange = 1; }
      if (d.check('1')) { if (res.Bar == 1) res.Bar = 2; }
      if (d.check('2')) { res.Rect = 1; res.Line = 0; res.Errors = 0; }
      if (d.check('3')) { res.EF = 1; res.Line = 0; res.Errors = 0; }
      if (d.check('4')) { res.EF = 2; res.Line = 0; res.Errors = 0; }
      if (d.check('5')) { res.Rect = 2; res.Line = 0; res.Errors = 0; }
      if (d.check('X')) res.Errors = 0;

      // special case - one could use svg:path to draw many pixels (
      if ((res.Mark==1) && (graph.fMarkerStyle==1)) res.Mark = 101;

      // if no drawing option is selected and if opt=='' nothing is done.
      if (res.Line + res.Fill + res.Mark + res.Bar + res.EF + res.Rect + res.Errors == 0) {
         if (d.empty()) res.Line = 1;
      }

      if (graph._typename == 'TGraphErrors') {
         if (d3.max(graph.fEX) < 1.0e-300 && d3.max(graph.fEY) < 1.0e-300)
            res.Errors = 0;
      }

      return res;
   }

   JSROOT.TGraphPainter.prototype.CreateBins = function() {
      var gr = this.GetObject();
      if (!gr) return;

      var p, kind = 0, npoints = gr.fNpoints;
      if ((gr._typename==="TCutG") && (npoints>3)) npoints--;

      if (gr._typename == 'TGraphErrors') kind = 1; else
      if (gr._typename == 'TGraphAsymmErrors' || gr._typename == 'TGraphBentErrors'
          || gr._typename.match(/^RooHist/)) kind = 2;

      this.bins = [];

      for (p=0;p<npoints;++p) {
         var bin = { x: gr.fX[p], y: gr.fY[p] };
         switch(kind) {
            case 1:
              bin.exlow = bin.exhigh = gr.fEX[p];
              bin.eylow = bin.eyhigh = gr.fEY[p];
              break;
            case 2:
               bin.exlow  = gr.fEXlow[p];
               bin.exhigh  = gr.fEXhigh[p];
               bin.eylow  = gr.fEYlow[p];
               bin.eyhigh = gr.fEYhigh[p];
               break;
         }
         this.bins.push(bin);

         if (p===0) {
            this.xmin = this.xmax = bin.x;
            this.ymin = this.ymax = bin.y;
         }

         if (kind > 0) {
            this.xmin = Math.min(this.xmin, bin.x - bin.exlow, bin.x + bin.exhigh);
            this.xmax = Math.max(this.xmax, bin.x - bin.exlow, bin.x + bin.exhigh);
            this.ymin = Math.min(this.ymin, bin.y - bin.eylow, bin.y + bin.eyhigh);
            this.ymax = Math.max(this.ymax, bin.y - bin.eylow, bin.y + bin.eyhigh);
         } else {
            this.xmin = Math.min(this.xmin, bin.x);
            this.xmax = Math.max(this.xmax, bin.x);
            this.ymin = Math.min(this.ymin, bin.y);
            this.ymax = Math.max(this.ymax, bin.y);
         }

      }
   }

   JSROOT.TGraphPainter.prototype.CreateHistogram = function() {
      // bins should be created

      var xmin = this.xmin, xmax = this.xmax, ymin = this.ymin, ymax = this.ymax;

      if (xmin >= xmax) xmax = xmin+1;
      if (ymin >= ymax) ymax = ymin+1;
      var dx = (xmax-xmin)*0.1, dy = (ymax-ymin)*0.1,
          uxmin = xmin - dx, uxmax = xmax + dx,
          minimum = ymin - dy, maximum = ymax + dy;

      if ((uxmin<0) && (xmin>=0)) uxmin = xmin*0.9;
      if ((uxmax>0) && (xmax<=0)) uxmax = 0;

      var graph = this.GetObject();

      if (graph.fMinimum != -1111) minimum = ymin = graph.fMinimum;
      if (graph.fMaximum != -1111) maximum = ymax = graph.fMaximum;
      if ((minimum < 0) && (ymin >=0)) minimum = 0.9*ymin;

      var histo = JSROOT.CreateHistogram("TH1I", 100);
      histo.fName = graph.fName + "_h";
      histo.fTitle = graph.fTitle;
      histo.fXaxis.fXmin = uxmin;
      histo.fXaxis.fXmax = uxmax;
      histo.fYaxis.fXmin = minimum;
      histo.fYaxis.fXmax = maximum;
      histo.fMinimum = minimum;
      histo.fMaximum = maximum;
      histo.fBits = histo.fBits | JSROOT.TH1StatusBits.kNoStats;
      return histo;
   }


   JSROOT.TGraphPainter.prototype.OptimizeBins = function(filter_func) {
      if ((this.bins.length < 30) && !filter_func) return this.bins;

      var selbins = null;
      if (typeof filter_func == 'function') {
         for (var n = 0; n < this.bins.length; ++n) {
            if (filter_func(this.bins[n],n)) {
               if (selbins==null)
                  selbins = (n==0) ? [] : this.bins.slice(0, n);
            } else {
               if (selbins != null) selbins.push(this.bins[n]);
            }
         }
      }
      if (selbins == null) selbins = this.bins;

      if ((selbins.length < 5000) || (JSROOT.gStyle.OptimizeDraw == 0)) return selbins;
      var step = Math.floor(selbins.length / 5000);
      if (step < 2) step = 2;
      var optbins = [];
      for (var n = 0; n < selbins.length; n+=step)
         optbins.push(selbins[n]);

      return optbins;
   }

   JSROOT.TGraphPainter.prototype.TooltipText = function(d, asarray) {
      var pmain = this.main_painter(), lines = [];

      lines.push(this.GetTipName());
      lines.push("x = " + pmain.AxisAsText("x", d.x));
      lines.push("y = " + pmain.AxisAsText("y", d.y));

      if (this.options.Errors && (pmain.x_kind=='normal') && ('exlow' in d) && ((d.exlow!=0) || (d.exhigh!=0)))
         lines.push("error x = -" + pmain.AxisAsText("x", d.exlow) +
                              "/+" + pmain.AxisAsText("x", d.exhigh));

      if ((this.options.Errors || (this.options.EF > 0)) && (pmain.y_kind=='normal') && ('eylow' in d) && ((d.eylow!=0) || (d.eyhigh!=0)) )
         lines.push("error y = -" + pmain.AxisAsText("y", d.eylow) +
                           "/+" + pmain.AxisAsText("y", d.eyhigh));

      if (asarray) return lines;

      var res = "";
      for (var n=0;n<lines.length;++n) res += ((n>0 ? "\n" : "") + lines[n]);
      return res;
   }

   JSROOT.TGraphPainter.prototype.DrawBins = function() {

      this.RecreateDrawG(false, "main_layer");

      var pthis = this,
          pmain = this.main_painter(),
          w = this.frame_width(),
          h = this.frame_height(),
          graph = this.GetObject(),
          excl_width = 0;

      if (!this.lineatt)
         this.lineatt = JSROOT.Painter.createAttLine(graph, undefined, true);
      if (!this.fillatt)
         this.fillatt = this.createAttFill(graph, undefined, undefined, 1);
      this.fillatt.used = false;

      if (this.fillatt) this.fillatt.used = false; // mark used only when really used
      this.draw_kind = "none"; // indicate if special svg:g were created for each bin
      this.marker_size = 0; // indicate if markers are drawn

      if (this.lineatt.excl_side!=0) {
         excl_width = this.lineatt.excl_side * this.lineatt.excl_width;
         if (this.lineatt.width>0) this.options.Line = 1;
      }

      var drawbins = null;

      if (this.options.EF) {

         drawbins = this.OptimizeBins();

         // build lower part
         for (var n=0;n<drawbins.length;++n) {
            var bin = drawbins[n];
            bin.grx = pmain.grx(bin.x);
            bin.gry = pmain.gry(bin.y - bin.eylow);
         }

         var path1 = JSROOT.Painter.BuildSvgPath(this.options.EF > 1 ? "bezier" : "line", drawbins),
             bins2 = [];

         for (var n=drawbins.length-1;n>=0;--n) {
            var bin = drawbins[n];
            bin.gry = pmain.gry(bin.y + bin.eyhigh);
            bins2.push(bin);
         }

         // build upper part (in reverse direction)
         var path2 = JSROOT.Painter.BuildSvgPath(this.options.EF > 1 ? "Lbezier" : "Lline", bins2);

         this.draw_g.append("svg:path")
                    .attr("d", path1.path + path2.path + "Z")
                    .style("stroke", "none")
                    .call(this.fillatt.func);
         this.draw_kind = "lines";
      }

      if (this.options.Line == 1 || this.options.Fill == 1 || (excl_width!==0)) {

         var close_symbol = "";
         if (graph._typename=="TCutG") this.options.Fill = 1;

         if (this.options.Fill == 1) {
            close_symbol = "Z"; // always close area if we want to fill it
            excl_width=0;
         }

         if (drawbins===null) drawbins = this.OptimizeBins();

         for (var n=0;n<drawbins.length;++n) {
            var bin = drawbins[n];
            bin.grx = pmain.grx(bin.x);
            bin.gry = pmain.gry(bin.y);
         }

         var kind = "line"; // simple line
         if (this.options.Curve === 1) kind = "bezier"; else
         if (excl_width!==0) kind+="calc"; // we need to calculated deltas to build exclusion points

         var path = JSROOT.Painter.BuildSvgPath(kind, drawbins);

         if (excl_width!==0) {
            var extrabins = [];
            for (var n=drawbins.length-1;n>=0;--n) {
               var bin = drawbins[n];
               var dlen = Math.sqrt(bin.dgrx*bin.dgrx + bin.dgry*bin.dgry);
               // shift point, using
               bin.grx += excl_width*bin.dgry/dlen;
               bin.gry -= excl_width*bin.dgrx/dlen;
               extrabins.push(bin);
            }

            var path2 = JSROOT.Painter.BuildSvgPath("L" + ((this.options.Curve === 1) ? "bezier" : "line"), extrabins);

            this.draw_g.append("svg:path")
                       .attr("d", path.path + path2.path + "Z")
                       .style("stroke", "none")
                       .call(this.fillatt.func)
                       .style('opacity', 0.75);
         }

         if (this.options.Line || this.options.Fill) {
            var elem = this.draw_g.append("svg:path")
                           .attr("d", path.path + close_symbol);
            if (this.options.Line)
               elem.call(this.lineatt.func);
            else
               elem.style('stroke','none');

            if (this.options.Fill)
               elem.call(this.fillatt.func);
            else
               elem.style('fill','none');
         }

         this.draw_kind = "lines";
      }

      var nodes = null;

      if (this.options.Errors || this.options.Rect || this.options.Bar) {

         drawbins = this.OptimizeBins(function(pnt,i) {

            var grx = pmain.grx(pnt.x);

            // when drawing bars, take all points
            if (!pthis.options.Bar && ((grx<0) || (grx>w))) return true;

            var gry = pmain.gry(pnt.y);

            if (!pthis.options.Bar && !pthis.options.OutRange && ((gry<0) || (gry>h))) return true;

            pnt.grx1 = Math.round(grx);
            pnt.gry1 = Math.round(gry);

            if (pthis.has_errors) {
               pnt.grx0 = Math.round(pmain.grx(pnt.x - pnt.exlow) - grx);
               pnt.grx2 = Math.round(pmain.grx(pnt.x + pnt.exhigh) - grx);
               pnt.gry0 = Math.round(pmain.gry(pnt.y - pnt.eylow) - gry);
               pnt.gry2 = Math.round(pmain.gry(pnt.y + pnt.eyhigh) - gry);

               if (pthis.is_bent) {
                  pnt.grdx0 = Math.round(pmain.gry(pnt.y + graph.fEXlowd[i]) - gry);
                  pnt.grdx2 = Math.round(pmain.gry(pnt.y + graph.fEXhighd[i]) - gry);
                  pnt.grdy0 = Math.round(pmain.grx(pnt.x + graph.fEYlowd[i]) - grx);
                  pnt.grdy2 = Math.round(pmain.grx(pnt.x + graph.fEYhighd[i]) - grx);
               } else {
                  pnt.grdx0 = pnt.grdx2 = pnt.grdy0 = pnt.grdy2 = 0;
               }
            }

            return false;
         });

         this.draw_kind = "nodes";

         // here are up to five elements are collected, try to group them
         nodes = this.draw_g.selectAll(".grpoint")
                     .data(drawbins)
                     .enter()
                     .append("svg:g")
                     .attr("class", "grpoint")
                     .attr("transform", function(d) { return "translate(" + d.grx1 + "," + d.gry1 + ")"; });
      }

      if (this.options.Bar) {
         // calculate bar width
         for (var i=1;i<drawbins.length-1;++i)
            drawbins[i].width = Math.max(2, (drawbins[i+1].grx1 - drawbins[i-1].grx1) / 2 - 2);

         // first and last bins
         switch (drawbins.length) {
            case 0: break;
            case 1: drawbins[0].width = w/4; break; // pathologic case of single bin
            case 2: drawbins[0].width = drawbins[1].width = (drawbins[1].grx1-drawbins[0].grx1)/2; break;
            default:
               drawbins[0].width = drawbins[1].width;
               drawbins[drawbins.length-1].width = drawbins[drawbins.length-2].width;
         }

         var yy0 = Math.round(pmain.gry(0));

         nodes.append("svg:rect")
            .attr("x", function(d) { return Math.round(-d.width/2); })
            .attr("y", function(d) {
                d.bar = true; // element drawn as bar
                if (pthis.options.Bar!==1) return 0;
                return (d.gry1 > yy0) ? yy0-d.gry1 : 0;
             })
            .attr("width", function(d) { return Math.round(d.width); })
            .attr("height", function(d) {
                if (pthis.options.Bar!==1) return h > d.gry1 ? h - d.gry1 : 0;
                return Math.abs(yy0 - d.gry1);
             })
            .call(this.fillatt.func);
      }

      if (this.options.Rect)
         nodes.filter(function(d) { return (d.exlow > 0) && (d.exhigh > 0) && (d.eylow > 0) && (d.eyhigh > 0); })
           .append("svg:rect")
           .attr("x", function(d) { d.rect = true; return d.grx0; })
           .attr("y", function(d) { return d.gry2; })
           .attr("width", function(d) { return d.grx2 - d.grx0; })
           .attr("height", function(d) { return d.gry0 - d.gry2; })
           .call(this.fillatt.func)
           .call(this.options.Rect === 2 ? this.lineatt.func : function() {});

      this.error_size = 0;

      if (this.options.Errors) {
         // to show end of error markers, use line width attribute
         var lw = this.lineatt.width + JSROOT.gStyle.fEndErrorSize, bb = 0,
             vv = this.options.Ends ? "m0," + lw + "v-" + 2*lw : "",
             hh = this.options.Ends ? "m" + lw + ",0h-" + 2*lw : "",
             vleft = vv, vright = vv, htop = hh, hbottom = hh,
             mm = this.options.MainError ? "M0,0L" : "M"; // command to draw main errors

         switch (this.options.Ends) {
            case 2:  // option []
               bb = Math.max(this.lineatt.width+1, Math.round(lw*0.66));
               vleft = "m"+bb+","+lw + "h-"+bb + "v-"+2*lw + "h"+bb;
               vright = "m-"+bb+","+lw + "h"+bb + "v-"+2*lw + "h-"+bb;
               htop = "m-"+lw+","+bb + "v-"+bb + "h"+2*lw + "v"+bb;
               hbottom = "m-"+lw+",-"+bb + "v"+bb + "h"+2*lw + "v-"+bb;
               break;
            case 3: // option |>
               lw = Math.max(lw, Math.round(graph.fMarkerSize*8*0.66));
               bb = Math.max(this.lineatt.width+1, Math.round(lw*0.66));
               vleft = "l"+bb+","+lw + "v-"+2*lw + "l-"+bb+","+lw;
               vright = "l-"+bb+","+lw + "v-"+2*lw + "l"+bb+","+lw;
               htop = "l-"+lw+","+bb + "h"+2*lw + "l-"+lw+",-"+bb;
               hbottom = "l-"+lw+",-"+bb + "h"+2*lw + "l-"+lw+","+bb;
               break;
            case 4: // option >
               lw = Math.max(lw, Math.round(graph.fMarkerSize*8*0.66));
               bb = Math.max(this.lineatt.width+1, Math.round(lw*0.66));
               vleft = "l"+bb+","+lw + "m0,-"+2*lw + "l-"+bb+","+lw;
               vright = "l-"+bb+","+lw + "m0,-"+2*lw + "l"+bb+","+lw;
               htop = "l-"+lw+","+bb + "m"+2*lw + ",0l-"+lw+",-"+bb;
               hbottom = "l-"+lw+",-"+bb + "m"+2*lw + ",0l-"+lw+","+bb;
               break;
         }

         this.error_size = lw;

         lw = Math.floor((this.lineatt.width-1)/2); // one should take into account half of end-cup line width
         nodes.filter(function(d) { return (d.exlow > 0) || (d.exhigh > 0) || (d.eylow > 0) || (d.eyhigh > 0); })
             .append("svg:path")
             .call(this.lineatt.func)
             .style('fill', "none")
             .attr("d", function(d) {
                d.error = true;
                return ((d.exlow > 0)  ? mm + (d.grx0+lw) + "," + d.grdx0 + vleft : "") +
                       ((d.exhigh > 0) ? mm + (d.grx2-lw) + "," + d.grdx2 + vright : "") +
                       ((d.eylow > 0)  ? mm + d.grdy0 + "," + (d.gry0-lw) + hbottom : "") +
                       ((d.eyhigh > 0) ? mm + d.grdy2 + "," + (d.gry2+lw) + htop : "");
              });
      }

      if (this.options.Mark) {
         // for tooltips use markers only if nodes where not created
         var step = Math.max(1, Math.round(this.bins.length / 50000)),
             path = "", n, pnt, grx, gry;

         if (!this.markeratt)
            this.markeratt = JSROOT.Painter.createAttMarker(graph, this.options.Mark - 100);
         else
            this.markeratt.Change(undefined, this.options.Mark - 100);

         this.marker_size = this.markeratt.size;

         this.markeratt.reset_pos();

         for (n=0;n<this.bins.length;n+=step) {
            pnt = this.bins[n];
            grx = pmain.grx(pnt.x);
            if ((grx > -this.marker_size) && (grx < w+this.marker_size)) {
               gry = pmain.gry(pnt.y);
               if ((gry >-this.marker_size) && (gry < h+this.marker_size)) {
                  path += this.markeratt.create(grx, gry);
               }
            }
         }

         if (path.length>0) {
            this.draw_g.append("svg:path")
                       .attr("d", path)
                       .call(this.markeratt.func);
            if ((nodes===null) && (this.draw_kind=="none"))
               this.draw_kind = (this.options.Mark==101) ? "path" : "mark";

         }
      }
   }

   JSROOT.TGraphPainter.prototype.ProcessTooltip = function(pnt) {
      if (!pnt) {
         if (this.draw_g !== null)
            this.draw_g.select(".tooltip_bin").remove();
         return null;
      }

      if ((this.draw_kind=="lines") || (this.draw_kind=="path") || (this.draw_kind=="mark"))
         return this.ProcessTooltipForPath(pnt);

      if (this.draw_kind!="nodes") return null;

      var width = this.frame_width(),
          height = this.frame_height(),
          pmain = this.main_painter(),
          painter = this,
          findbin = null, best_dist2 = 1e10, best = null;

      this.draw_g.selectAll('.grpoint').each(function() {
         var d = d3.select(this).datum();
         if (d===undefined) return;
         var dist2 = Math.pow(pnt.x - d.grx1, 2);
         if (pnt.nproc===1) dist2 += Math.pow(pnt.y - d.gry1, 2);
         if (dist2 >= best_dist2) return;

         var rect = null;

         if (d.error || d.rect || d.marker) {
            rect = { x1: Math.min(-painter.error_size, d.grx0),
                     x2: Math.max(painter.error_size, d.grx2),
                     y1: Math.min(-painter.error_size, d.gry2),
                     y2: Math.max(painter.error_size, d.gry0) };
         } else
         if (d.bar) {
             rect = { x1: -d.width/2, x2: d.width/2, y1: 0, y2: height - d.gry1 };

             if (painter.options.Bar===1) {
                var yy0 = pmain.gry(0);
                rect.y1 = (d.gry1 > yy0) ? yy0-d.gry1 : 0;
                rect.y2 = (d.gry1 > yy0) ? 0 : yy0-d.gry1;
             }
          } else {
             rect = { x1: -5, x2: 5, y1: -5, y2: 5 };
          }
          var matchx = (pnt.x >= d.grx1 + rect.x1) && (pnt.x <= d.grx1 + rect.x2);
          var matchy = (pnt.y >= d.gry1 + rect.y1) && (pnt.y <= d.gry1 + rect.y2);

          if (matchx && (matchy || (pnt.nproc > 1))) {
             best_dist2 = dist2;
             findbin = this;
             best = rect;
             best.exact = matchx && matchy;
          }
       });

      var ttrect = this.draw_g.select(".tooltip_bin");

      if (findbin == null) {
         ttrect.remove();
         return null;
      }

      var d = d3.select(findbin).datum();

      var res = { name: this.GetObject().fName, title: this.GetObject().fTitle,
                  x: d.grx1, y: d.gry1,
                  color1: this.lineatt.color,
                  lines: this.TooltipText(d, true) };

      if (pnt.disabled) {
         // tooltip disabled - only return info
         ttrect.remove();
         return res;
      }

      if (this.fillatt && this.fillatt.used) res.color2 = this.fillatt.color;

      if (best.exact) res.exact = true;
      res.menu = res.exact; // activate menu only when exactly locate bin
      res.menu_dist = 3; // distance always fixed

      if (ttrect.empty())
         ttrect = this.draw_g.append("svg:rect")
                             .attr("class","tooltip_bin h1bin")
                             .style("pointer-events","none");

      res.changed = ttrect.property("current_bin") !== findbin;

      if (res.changed)
         ttrect.attr("x", d.grx1 + best.x1)
               .attr("width", best.x2 - best.x1)
               .attr("y", d.gry1 + best.y1)
               .attr("height", best.y2 - best.y1)
               .style("opacity", "0.3")
               .property("current_bin", findbin);

      return res;
   }

   JSROOT.TGraphPainter.prototype.ProcessTooltipForPath = function(pnt) {

      if (this.bins === null) return null;

      var islines = (this.draw_kind=="lines"),
          ismark = (this.draw_kind=="mark"),
          bestbin = null,
          bestdist = 1e10,
          pmain = this.main_painter(),
          dist, grx, gry, n, bin;

      for (n=0;n<this.bins.length;++n) {
         bin = this.bins[n];

         grx = pmain.grx(bin.x);
         gry = pmain.gry(bin.y);

         dist = (pnt.x-grx)*(pnt.x-grx) + (pnt.y-gry)*(pnt.y-gry);

         if (dist < bestdist) {
            bestdist = dist;
            bestbin = bin;
         }
      }

      // check last point
      if ((bestdist > 100) && islines) bestbin = null;

      var radius = Math.max(this.lineatt.width + 3, 4);

      if (this.marker_size > 0) radius = Math.max(Math.round(this.marker_size*7), radius);

      if (bestbin !== null)
         bestdist = Math.sqrt(Math.pow(pnt.x-pmain.grx(bestbin.x),2) + Math.pow(pnt.y-pmain.gry(bestbin.y),2));

      if (!islines && !ismark && (bestdist>radius)) bestbin = null;

      if (ismark && (bestbin!==null)) {
         if ((pnt.nproc == 1) && (bestdist>radius)) bestbin = null; else
         if ((this.bins.length==1) && (bestdist>3*radius)) bestbin = null;
      }

      var ttbin = this.draw_g.select(".tooltip_bin");

      if (bestbin===null) {
         ttbin.remove();
         return null;
      }

      var res = { name: this.GetObject().fName, title: this.GetObject().fTitle,
                  x: pmain.grx(bestbin.x), y: pmain.gry(bestbin.y),
                  color1: this.lineatt.color,
                  lines: this.TooltipText(bestbin, true) };

      if (pnt.disabled) {
         ttbin.remove();
         return res;
      }

      if (this.fillatt && this.fillatt.used) res.color2 = this.fillatt.color;

      if (!islines) {
         res.color1 = JSROOT.Painter.root_colors[this.GetObject().fMarkerColor];
         if (!res.color2) res.color2 = res.color1;
      }

      if (ttbin.empty())
         ttbin = this.draw_g.append("svg:g")
                             .attr("class","tooltip_bin");

      var gry1, gry2;

      if (this.options.EF && islines) {
         gry1 = pmain.gry(bestbin.y - bestbin.eylow);
         gry2 = pmain.gry(bestbin.y + bestbin.eyhigh);
      } else {
         gry1 = gry2 = pmain.gry(bestbin.y);
      }

      res.exact = (Math.abs(pnt.x - res.x) <= radius) &&
                  ((Math.abs(pnt.y - gry1) <= radius) || (Math.abs(pnt.y - gry2) <= radius));

      res.menu = res.exact;
      res.menu_dist = Math.sqrt((pnt.x-res.x)*(pnt.x-res.x) + Math.pow(Math.min(Math.abs(pnt.y-gry1),Math.abs(pnt.y-gry2)),2));

      res.changed = ttbin.property("current_bin") !== bestbin;

      if (res.changed) {
         ttbin.selectAll("*").remove(); // first delete all children
         ttbin.property("current_bin", bestbin);

         if (ismark) {
            ttbin.append("svg:rect")
                 .attr("class","h1bin")
                 .style("pointer-events","none")
                 .style("opacity", "0.3")
                 .attr("x", (res.x - radius).toFixed(1))
                 .attr("y", (res.y - radius).toFixed(1))
                 .attr("width", (2*radius).toFixed(1))
                 .attr("height", (2*radius).toFixed(1));
         } else {
            ttbin.append("svg:circle").attr("cy", gry1.toFixed(1))
            if (Math.abs(gry1-gry2) > 1)
               ttbin.append("svg:circle").attr("cy", gry2.toFixed(1));

            var elem = ttbin.selectAll("circle")
                            .attr("r", radius)
                            .attr("cx", res.x.toFixed(1));

            if (!islines) {
               elem.style('stroke', res.color1 == 'black' ? 'green' : 'black').style('fill','none');
            } else {
               if (this.options.Line)
                  elem.call(this.lineatt.func);
               else
                  elem.style('stroke','black');
               if (this.options.Fill)
                  elem.call(this.fillatt.func);
               else
                  elem.style('fill','none');
            }
         }
      }

      return res;
   }

   JSROOT.TGraphPainter.prototype.UpdateObject = function(obj) {
      if (!this.MatchObjectType(obj)) return false;

      // if our own histogram was used as axis drawing, we need update histogram  as well
      if (this.ownhisto)
         this.main_painter().UpdateObject(obj.fHistogram);

      var graph = this.GetObject();
      // TODO: make real update of TGraph object content
      graph.fX = obj.fX;
      graph.fY = obj.fY;
      graph.fNpoints = obj.fNpoints;
      this.CreateBins();
      return true;
   }

   JSROOT.TGraphPainter.prototype.CanZoomIn = function(axis,min,max) {
      // allow to zoom TGraph only when at least one point in the range

      var gr = this.GetObject();
      if ((gr===null) || (axis!=="x")) return false;

      for (var n=0; n < gr.fNpoints; ++n)
         if ((min < gr.fX[n]) && (gr.fX[n] < max)) return true;

      return false;
   }

   JSROOT.TGraphPainter.prototype.ButtonClick = function(funcname) {

      if (funcname !== "ToggleZoom") return false;

      var main = this.main_painter();
      if (main === null) return false;

      if ((this.xmin===this.xmax) && (this.ymin = this.ymax)) return false;

      main.Zoom(this.xmin, this.xmax, this.ymin, this.ymax);

      return true;
   }

   JSROOT.TGraphPainter.prototype.DrawNextFunction = function(indx, callback) {
      // method draws next function from the functions list

      var graph = this.GetObject();

      if (!graph.fFunctions || (indx >= graph.fFunctions.arr.length))
         return JSROOT.CallBack(callback);

      JSROOT.draw(this.divid, graph.fFunctions.arr[indx], graph.fFunctions.opt[indx],
                  this.DrawNextFunction.bind(this, indx+1, callback));
   }

   JSROOT.TGraphPainter.prototype.PerformDrawing = function(divid, hpainter) {
      if (hpainter) this.ownhisto = true;
      this.SetDivId(divid);
      this.DrawBins();
      this.DrawNextFunction(0, this.DrawingReady.bind(this));
      return this;
   }

   JSROOT.Painter.drawGraph = function(divid, graph, opt) {

      var painter = new JSROOT.TGraphPainter(graph);

      painter.options = painter.DecodeOptions(opt);

      painter.SetDivId(divid, -1); // just to get access to existing elements

      painter.CreateBins();

      if (!painter.main_painter()) {
         if (!graph.fHistogram)
            graph.fHistogram = painter.CreateHistogram();
         JSROOT.draw(divid, graph.fHistogram, painter.options.Axis, painter.PerformDrawing.bind(painter, divid));
      } else {
         painter.PerformDrawing(divid);
      }

      return painter;
   }

   // =============================================================

   JSROOT.TMultiGraphPainter = function(mgraph) {
      JSROOT.TObjectPainter.call(this, mgraph);
      this.firstpainter = null;
      this.autorange = false;
      this.painters = []; // keep painters to be able update objects
   }

   JSROOT.TMultiGraphPainter.prototype = Object.create(JSROOT.TObjectPainter.prototype);

   JSROOT.TMultiGraphPainter.prototype.Cleanup = function() {
      this.painters = [];
      JSROOT.TObjectPainter.prototype.Cleanup.call(this);
   }

   JSROOT.TMultiGraphPainter.prototype.UpdateObject = function(obj) {
      if (!this.MatchObjectType(obj)) return false;

      var mgraph = this.GetObject(),
          graphs = obj.fGraphs;

      mgraph.fTitle = obj.fTitle;

      var isany = false;
      if (this.firstpainter) {
         var histo = obj.fHistogram;
         if (this.autorange && !histo)
            histo = this.ScanGraphsRange(graphs);

         if (this.firstpainter.UpdateObject(histo)) isany = true;
      }

      for (var i = 0; i < graphs.arr.length; ++i) {
         if (i<this.painters.length)
            if (this.painters[i].UpdateObject(graphs.arr[i])) isany = true;
      }

      if (obj.fFunctions)
         for (var i = 0; i < obj.fFunctions.arr.length; ++i) {
            var func = obj.fFunctions.arr[i];
            if (!func || !func._typename || !func.fName) continue;
            var funcpainter = this.FindPainterFor(null, func.fName, func._typename);
            if (funcpainter) funcpainter.UpdateObject(func);
         }

      return isany;
   }

   JSROOT.TMultiGraphPainter.prototype.ComputeGraphRange = function(res, gr) {
      // Compute the x/y range of the points in this graph
      if (gr.fNpoints == 0) return;
      if (res.first) {
         res.xmin = res.xmax = gr.fX[0];
         res.ymin = res.ymax = gr.fY[0];
         res.first = false;
      }
      for (var i=0; i < gr.fNpoints; ++i) {
         res.xmin = Math.min(res.xmin, gr.fX[i]);
         res.xmax = Math.max(res.xmax, gr.fX[i]);
         res.ymin = Math.min(res.ymin, gr.fY[i]);
         res.ymax = Math.max(res.ymax, gr.fY[i]);
      }
      return res;
   }

   JSROOT.TMultiGraphPainter.prototype.padtoX = function(pad, x) {
      // Convert x from pad to X.
      if (pad.fLogx && (x < 50))
         return Math.exp(2.302585092994 * x);
      return x;
   }

   JSROOT.TMultiGraphPainter.prototype.ScanGraphsRange = function(graphs, histo, pad) {
      var mgraph = this.GetObject(),
          maximum, minimum, dx, dy, uxmin = 0, uxmax = 0, logx = false, logy = false,
          rw = {  xmin: 0, xmax: 0, ymin: 0, ymax: 0, first: true };

      if (pad!=null) {
         logx = pad.fLogx;
         logy = pad.fLogy;
         rw.xmin = pad.fUxmin;
         rw.xmax = pad.fUxmax;
         rw.ymin = pad.fUymin;
         rw.ymax = pad.fUymax;
         rw.first = false;
      }
      if (histo!=null) {
         minimum = histo.fYaxis.fXmin;
         maximum = histo.fYaxis.fXmax;
         if (pad!=null) {
            uxmin = this.padtoX(pad, rw.xmin);
            uxmax = this.padtoX(pad, rw.xmax);
         }
      } else {
         this.autorange = true;

         for (var i = 0; i < graphs.arr.length; ++i)
            this.ComputeGraphRange(rw, graphs.arr[i]);

         if (rw.xmin == rw.xmax) rw.xmax += 1.;
         if (rw.ymin == rw.ymax) rw.ymax += 1.;
         dx = 0.05 * (rw.xmax - rw.xmin);
         dy = 0.05 * (rw.ymax - rw.ymin);
         uxmin = rw.xmin - dx;
         uxmax = rw.xmax + dx;
         if (logy) {
            if (rw.ymin <= 0) rw.ymin = 0.001 * rw.ymax;
            minimum = rw.ymin / (1 + 0.5 * JSROOT.log10(rw.ymax / rw.ymin));
            maximum = rw.ymax * (1 + 0.2 * JSROOT.log10(rw.ymax / rw.ymin));
         } else {
            minimum = rw.ymin - dy;
            maximum = rw.ymax + dy;
         }
         if (minimum < 0 && rw.ymin >= 0)
            minimum = 0;
         if (maximum > 0 && rw.ymax <= 0)
            maximum = 0;
      }

      if (uxmin < 0 && rw.xmin >= 0)
         uxmin = logx ? 0.9 * rw.xmin : 0;
      if (uxmax > 0 && rw.xmax <= 0)
         uxmax = logx? 1.1 * rw.xmax : 0;

      if (mgraph.fMinimum != -1111)
         rw.ymin = minimum = mgraph.fMinimum;
      if (mgraph.fMaximum != -1111)
         rw.ymax = maximum = mgraph.fMaximum;

      if (minimum < 0 && rw.ymin >= 0 && logy)
         minimum = 0.9 * rw.ymin;
      if (maximum > 0 && rw.ymax <= 0 && logy)
         maximum = 1.1 * rw.ymax;
      if (minimum <= 0 && logy)
         minimum = 0.001 * maximum;
      if (uxmin <= 0 && logx)
         uxmin = (uxmax > 1000) ? 1 : 0.001 * uxmax;

      // Create a temporary histogram to draw the axis (if necessary)
      if (!histo) {
         histo = JSROOT.Create("TH1I");
         histo.fTitle = mgraph.fTitle;
         histo.fXaxis.fXmin = uxmin;
         histo.fXaxis.fXmax = uxmax;
      }

      histo.fYaxis.fXmin = minimum;
      histo.fYaxis.fXmax = maximum;

      return histo;
   }

   JSROOT.TMultiGraphPainter.prototype.DrawAxis = function(callback) {
      // draw special histogram

      var mgraph = this.GetObject(),
          histo = this.ScanGraphsRange(mgraph.fGraphs, mgraph.fHistogram, this.root_pad());

      // histogram painter will be first in the pad, will define axis and
      // interactive actions
      JSROOT.draw(this.divid, histo, "AXIS", callback);
   }

   JSROOT.TMultiGraphPainter.prototype.DrawNextFunction = function(indx, callback) {
      // method draws next function from the functions list

      var mgraph = this.GetObject();

      if (!mgraph.fFunctions || (indx >= mgraph.fFunctions.arr.length))
         return JSROOT.CallBack(callback);

      JSROOT.draw(this.divid, mgraph.fFunctions.arr[indx], mgraph.fFunctions.opt[indx],
                  this.DrawNextFunction.bind(this, indx+1, callback));
   }

   JSROOT.TMultiGraphPainter.prototype.DrawNextGraph = function(indx, opt, subp) {
      if (subp) this.painters.push(subp);

      var graphs = this.GetObject().fGraphs;

      // at the end of graphs drawing draw functions (if any)
      if (indx >= graphs.arr.length)
         return this.DrawNextFunction(0, this.DrawingReady.bind(this));

      JSROOT.draw(this.divid, graphs.arr[indx], graphs.opt[indx] || opt,
                  this.DrawNextGraph.bind(this, indx+1, opt));
   }

   JSROOT.Painter.drawMultiGraph = function(divid, mgraph, opt) {

      var painter = new JSROOT.TMultiGraphPainter(mgraph);

      painter.SetDivId(divid, -1); // it may be no element to set divid

      if (opt == null) opt = "";
      opt = opt.toUpperCase().replace("3D","").replace("FB",""); // no 3D supported, FB not clear

      if ((opt.indexOf("A") >= 0) || !this.main_painter()) {
         opt = opt.replace("A","");
         painter.DrawAxis(function(hpainter) {
            painter.firstpainter = hpainter;
            painter.SetDivId(divid);
            painter.DrawNextGraph(0, opt);
         });
      } else {
         painter.SetDivId(divid);
         painter.DrawNextGraph(0, opt);
      }

      return painter;
   }

   // ==============================================================================

   JSROOT.Painter.drawLegend = function(divid, obj, opt) {

      var painter = new JSROOT.TPavePainter(obj);

      painter.SetDivId(divid, 2);

      painter.AssignFinishPave(); // do it once again while this is changed

      painter.PaveDrawFunc = function(w, h) {

         var legend = this.GetObject(),
             nlines = legend.fPrimitives.arr.length,
             ncols = legend.fNColumns,
             nrows = nlines;

         if (ncols<2) ncols = 1; else { while ((nrows-1)*ncols >= nlines) nrows--; }

         this.StartTextDrawing(legend.fTextFont, h / (nlines * 1.2));

         var tcolor = JSROOT.Painter.root_colors[legend.fTextColor],
             column_width = Math.round(w/ncols),
             padding_x = Math.round(0.03*w/ncols),
             padding_y = Math.round(0.03*h),
             step_y = (h - 2*padding_y)/nrows,
             any_opt = false;

         for (var i = 0; i < nlines; ++i) {
            var leg = legend.fPrimitives.arr[i],
                lopt = leg.fOption.toLowerCase(),
                icol = i % ncols, irow = (i - icol) / ncols,
                x0 = icol * column_width,
                tpos_x = x0 + Math.round(legend.fMargin*column_width),
                pos_y = Math.round(padding_y + irow*step_y), // top corner
                mid_y = Math.round(padding_y + (irow+0.5)*step_y), // center line
                o_fill = leg, o_marker = leg, o_line = leg,
                mo = leg.fObject,
                painter = null,
                isany = false;

            if ((mo !== null) && (typeof mo == 'object')) {
               if ('fLineColor' in mo) o_line = mo;
               if ('fFillColor' in mo) o_fill = mo;
               if ('fMarkerColor' in mo) o_marker = mo;

               painter = this.FindPainterFor(mo);
            }

            // Draw fill pattern (in a box)
            if (lopt.indexOf('f') != -1) {
               var fillatt = (painter && painter.fillatt) ? painter.fillatt : this.createAttFill(o_fill);
               // box total height is yspace*0.7
               // define x,y as the center of the symbol for this entry
               this.draw_g.append("svg:rect")
                      .attr("x", x0 + padding_x)
                      .attr("y", Math.round(pos_y+step_y*0.1))
                      .attr("width", tpos_x - 2*padding_x - x0)
                      .attr("height", Math.round(step_y*0.8))
                      .call(fillatt.func);
               if (fillatt.color !== 'none') isany = true;
            }

            // Draw line
            if (lopt.indexOf('l') != -1) {
               var lineatt = (painter && painter.lineatt) ? painter.lineatt : JSROOT.Painter.createAttLine(o_line)
               this.draw_g.append("svg:line")
                  .attr("x1", x0 + padding_x)
                  .attr("y1", mid_y)
                  .attr("x2", tpos_x - padding_x)
                  .attr("y2", mid_y)
                  .call(lineatt.func);
               if (lineatt.color !== 'none') isany = true;
            }

            // Draw error
            if (lopt.indexOf('e') != -1  && (lopt.indexOf('l') == -1 || lopt.indexOf('f') != -1)) {
            }

            // Draw Polymarker
            if (lopt.indexOf('p') != -1) {
               var marker = (painter && painter.markeratt) ? painter.markeratt : JSROOT.Painter.createAttMarker(o_marker);
               this.draw_g
                   .append("svg:path")
                   .attr("d", marker.create((x0 + tpos_x)/2, mid_y))
                   .call(marker.func);
               if (marker.color !== 'none') isany = true;
            }

            // special case - nothing draw, try to show rect with line attributes
            if (!isany && painter && painter.lineatt && (painter.lineatt.color !== 'none'))
               this.draw_g.append("svg:rect")
                          .attr("x", x0 + padding_x)
                          .attr("y", Math.round(pos_y+step_y*0.1))
                          .attr("width", tpos_x - 2*padding_x - x0)
                          .attr("height", Math.round(step_y*0.8))
                          .attr("fill", "none")
                          .call(painter.lineatt.func);

            var pos_x = tpos_x;
            if (lopt.length>0) any_opt = true;
                          else if (!any_opt) pos_x = x0 + padding_x;

            this.DrawText("start", pos_x, pos_y, x0+column_width-pos_x-padding_x, step_y, leg.fLabel, tcolor);
         }

         // rescale after all entries are shown
         this.FinishTextDrawing(null, this.FinishPave);
      }

      painter.Redraw();

      return painter;
   }

   // ===========================================================================

   JSROOT.Painter.drawPaletteAxis = function(divid,palette,opt) {

      // disable draw of shadow element of TPave
      palette.fBorderSize = 1;
      palette.fShadowColor = 0;

      var painter = new JSROOT.TPavePainter(palette);

      painter.SetDivId(divid);

      painter.z_handle = new JSROOT.TAxisPainter(palette.fAxis, true);
      painter.z_handle.SetDivId(divid, -1);

      painter.Cleanup = function() {
         if (this.z_handle) {
            this.z_handle.Cleanup();
            delete this.z_handle;
         }

         JSROOT.TObjectPainter.prototype.Cleanup.call(this);
      }

      painter.PaveDrawFunc = function(s_width, s_height, arg) {

         var pthis = this,
             palette = this.GetObject(),
             axis = palette.fAxis,
             can_move = (typeof arg == 'string') && (arg.indexOf('canmove')>0),
             postpone_draw = (typeof arg == 'string') && (arg.indexOf('postpone')>0),
             nbr1 = axis.fNdiv % 100,
             pos_x = parseInt(this.draw_g.attr("x")), // pave position
             pos_y = parseInt(this.draw_g.attr("y")),
             width = this.pad_width(),
             height = this.pad_height(),
             axisOffset = axis.fLabelOffset * width,
             main = this.main_painter(),
             zmin = 0, zmax = 100,
             contour = main.fContour;

         if (nbr1<=0) nbr1 = 8;
         axis.fTickSize = 0.6 * s_width / width; // adjust axis ticks size

         if (contour) {
            zmin = Math.min(contour[0], main.zmin);
            zmax = Math.max(contour[contour.length-1], main.zmax);
         } else
         if ((main.gmaxbin!==undefined) && (main.gminbin!==undefined)) {
            // this is case of TH2 (needs only for size adjustment)
            zmin = main.gminbin; zmax = main.gmaxbin;
         } else
         if ((main.hmin!==undefined) && (main.hmax!==undefined)) {
            // this is case of TH1
            zmin = main.hmin; zmax = main.hmax;
         }

         var z = null, z_kind = "normal";

         if (this.root_pad().fLogz) {
            z = d3.scaleLog();
            z_kind = "log";
         } else {
            z = d3.scaleLinear();
         }
         z.domain([zmin, zmax]).range([s_height,0]);

         this.draw_g.selectAll("rect").style("fill", 'white');

         if (!contour || postpone_draw)
            // we need such rect to correctly calculate size
            this.draw_g.append("svg:rect")
                       .attr("x", 0)
                       .attr("y",  0)
                       .attr("width", s_width)
                       .attr("height", s_height)
                       .style("fill", 'white');
         else
            for (var i=0;i<contour.length-1;++i) {
               var z0 = z(contour[i]),
                   z1 = z(contour[i+1]),
                   col = main.getValueColor((contour[i]+contour[i+1])/2);

               var r = this.draw_g.append("svg:rect")
                          .attr("x", 0)
                          .attr("y",  z1.toFixed(1))
                          .attr("width", s_width)
                          .attr("height", (z0-z1).toFixed(1))
                          .style("fill", col)
                          .style("stroke", col)
                          .property("fill0", col)
                          .property("fill1", d3.rgb(col).darker(0.5).toString())

               if (JSROOT.gStyle.Tooltip > 0)
                  r.on('mouseover', function() {
                     d3.select(this).transition().duration(100).style("fill", d3.select(this).property('fill1'));
                  }).on('mouseout', function() {
                     d3.select(this).transition().duration(100).style("fill", d3.select(this).property('fill0'));
                  }).append("svg:title").text(contour[i].toFixed(2) + " - " + contour[i+1].toFixed(2));

               if (JSROOT.gStyle.Zooming)
                  r.on("dblclick", function() { pthis.main_painter().Unzoom("z"); });
            }


         this.z_handle.SetAxisConfig("zaxis", z_kind, z, zmin, zmax, zmin, zmax);

         this.z_handle.DrawAxis(true, this.draw_g, s_width, s_height, "translate(" + s_width + ", 0)");

         if (can_move && ('getBoundingClientRect' in this.draw_g.node())) {
            var rect = this.draw_g.node().getBoundingClientRect();

            var shift = (pos_x + parseInt(rect.width)) - Math.round(0.995*width) + 3;

            if (shift>0) {
               this.draw_g.attr("x", pos_x - shift).attr("y", pos_y)
                          .attr("transform", "translate(" + (pos_x-shift) + ", " + pos_y + ")");
               palette.fX1NDC -= shift/width;
               palette.fX2NDC -= shift/width;
            }
         }

         if (!JSROOT.gStyle.Zooming) return;

         var evnt = null, doing_zoom = false, sel1 = 0, sel2 = 0, zoom_rect = null;

         function moveRectSel() {

            if (!doing_zoom) return;

            d3.event.preventDefault();
            var m = d3.mouse(evnt);

            if (m[1] < sel1) sel1 = m[1]; else sel2 = m[1];

            zoom_rect.attr("y", sel1)
                     .attr("height", Math.abs(sel2-sel1));
         }

         function endRectSel() {
            if (!doing_zoom) return;

            d3.event.preventDefault();
            d3.select(window).on("mousemove.colzoomRect", null)
                             .on("mouseup.colzoomRect", null);
            zoom_rect.remove();
            zoom_rect = null;
            doing_zoom = false;

            var zmin = Math.min(z.invert(sel1), z.invert(sel2)),
                zmax = Math.max(z.invert(sel1), z.invert(sel2));

            pthis.main_painter().Zoom("z", zmin, zmax);
         }

         function startRectSel() {
            // ignore when touch selection is activated
            if (doing_zoom) return;
            doing_zoom = true;

            d3.event.preventDefault();

            evnt = this;
            var origin = d3.mouse(evnt);

            sel1 = sel2 = origin[1];

            zoom_rect = pthis.draw_g
                   .append("svg:rect")
                   .attr("class", "zoom")
                   .attr("id", "colzoomRect")
                   .attr("x", "0")
                   .attr("width", s_width)
                   .attr("y", sel1)
                   .attr("height", 5);

            d3.select(window).on("mousemove.colzoomRect", moveRectSel)
                             .on("mouseup.colzoomRect", endRectSel, true);

            d3.event.stopPropagation();
         }

         this.draw_g.select(".axis_zoom")
                    .on("mousedown", startRectSel)
                    .on("dblclick", function() { pthis.main_painter().Unzoom("z"); });
      }

      painter.ShowContextMenu = function(evnt) {
         this.main_painter().ShowContextMenu("z", evnt, this.GetObject().fAxis);
      }

      painter.UseContextMenu = true;

      painter.DrawPave(opt);

      return painter.DrawingReady();
   }

   // =========================================================================================

   JSROOT.Painter.drawWebPainting = function(divid, obj, opt) {

      var painter = new JSROOT.TObjectPainter(obj);

      painter.UpdateObject = function(obj) {
         if (!this.MatchObjectType(obj)) return false;
         this.draw_object = obj;
         return true;
      }

      painter.Redraw = function() {
         var obj = this.GetObject(), attr = null, indx = 0,
             lineatt = null, fillatt = null, markeratt = null;
         if (!obj || !obj.fOper) return;

         this.RecreateDrawG(true, "special_layer");

         for (var k=0;k<obj.fOper.arr.length;++k) {
            var oper = obj.fOper.opt[k];
            switch (oper) {
               case "attr":
                  attr = obj.fOper.arr[k];
                  lineatt = fillatt = markeratt = null;
                  continue;
               case "rect":
               case "box": {
                  var x1 = this.AxisToSvg("x", obj.fBuf[indx++]),
                      y1 = this.AxisToSvg("y", obj.fBuf[indx++]),
                      x2 = this.AxisToSvg("x", obj.fBuf[indx++]),
                      y2 = this.AxisToSvg("y", obj.fBuf[indx++]);

                  if (!lineatt) lineatt = JSROOT.Painter.createAttLine(attr);

                  var rect = this.draw_g
                     .append("svg:rect")
                     .attr("x", Math.min(x1,x2))
                     .attr("y", Math.min(y1,y2))
                     .attr("width", Math.abs(x2-x1))
                     .attr("height", Math.abs(y1-y2))
                     .call(lineatt.func);

                  if (oper === "box") {
                     if (!fillatt) fillatt = this.createAttFill(attr);
                     rect.call(fillatt.func);
                  }
                  continue;
               }
               case "line":
               case "linendc": {

                  var isndc = (oper==="linendc"),
                      x1 = this.AxisToSvg("x", obj.fBuf[indx++], isndc),
                      y1 = this.AxisToSvg("y", obj.fBuf[indx++], isndc),
                      x2 = this.AxisToSvg("x", obj.fBuf[indx++], isndc),
                      y2 = this.AxisToSvg("y", obj.fBuf[indx++], isndc);

                  if (!lineatt) lineatt = JSROOT.Painter.createAttLine(attr);

                  this.draw_g
                      .append("svg:line").attr("x1", x1).attr("y1", y1).attr("x2", x2).attr("y2", y2)
                      .call(lineatt.func);

                  continue;
               }
               case "polyline":
               case "polylinendc":
               case "fillarea": {

                  var npoints = parseInt(obj.fOper.arr[k].fString), cmd = "";

                  if (!lineatt) lineatt = JSROOT.Painter.createAttLine(attr);

                  for (var n=0;n<npoints;++n)
                     cmd += ((n>0) ? "L" : "M") +
                            this.AxisToSvg("x", obj.fBuf[indx++], false) + "," +
                            this.AxisToSvg("y", obj.fBuf[indx++], false);

                  if (oper == "fillarea") cmd+="Z";
                  var path = this.draw_g
                          .append("svg:path")
                          .attr("d", cmd)
                          .call(lineatt.func);

                  if (oper == "fillarea") {
                     if (!fillatt) fillatt = this.createAttFill(attr);
                     path.call(fillatt.func);
                  }

                  continue;
               }

               case "polymarker": {
                  var npoints = parseInt(obj.fOper.arr[k].fString), cmd = "";

                  if (!markeratt) markeratt = JSROOT.Painter.createAttMarker(attr);

                  markeratt.reset_pos();
                  for (var n=0;n<npoints;++n)
                     cmd += markeratt.create(this.AxisToSvg("x", obj.fBuf[indx++], false),
                                             this.AxisToSvg("y", obj.fBuf[indx++], false));

                  if (cmd)
                     this.draw_g.append("svg:path").attr("d", cmd).call(markeratt.func);

                  continue;
               }

               case "text":
               case "textndc": {
                  var isndc = (oper==="textndc"),
                      xx = this.AxisToSvg("x", obj.fBuf[indx++], isndc),
                      yy = this.AxisToSvg("y", obj.fBuf[indx++], isndc);

                  if (attr) {
                     var height = (attr.fTextSize > 1) ? attr.fTextSize : this.pad_height() * attr.fTextSize;

                     var group = this.draw_g.append("svg:g");

                     this.StartTextDrawing(attr.fTextFont, height, group);

                     var angle = attr.fTextAngle;
                     angle -= Math.floor(angle/360) * 360;
                     if (angle>0) angle = -360 + angle; // rotation angle in ROOT and SVG has different meaning

                     var enable_latex = 0; // 0-off, 1 - when make sense, 2 - always

                     // todo - correct support of angle
                     this.DrawText(attr.fTextAlign, xx, yy, 0, angle, obj.fOper.arr[k].fString, JSROOT.Painter.root_colors[attr.fTextColor], enable_latex, group);

                     this.FinishTextDrawing(group);
                  }
                  continue;
               }

               default:
                  console.log('unsupported operation', oper);
            }

         }
      }

      painter.SetDivId(divid);

      painter.options = opt;

      painter.Redraw();

      return painter.DrawingReady();
   }

   return JSROOT.Painter;

}));
