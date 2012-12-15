ZUSE.Layer = function ( type, s, p ) {

	this.type = type;
	this.parent = p;
	this.spacing = s;
	this.open = false;
	this.intermediate = false;
	this.meshes = new THREE.Object3D();
	this.sheets = new Array();
	this.pins = new Array();
	this.cycleAccess = new Object();

	switch ( type ) {

		case ZUSE.LayerTypes.LAYER_A:

			this.levels = 7;

			this.addSheet( ZUSE.SheetTypes.SHEET_AG,  0,   0,   0,  70,  70, 0 );
			this.addSheet( ZUSE.SheetTypes.SHEET_AD,  3,  74,  74,  76,  66, 1 );
			this.addSheet( ZUSE.SheetTypes.SHEET_AD,  2, 114, 114,  76,  66, 1 );
			this.addSheet( ZUSE.SheetTypes.SHEET_AD,  1, 154, 154,  76,  66, 1 );
			this.addSheet( ZUSE.SheetTypes.SHEET_AD,  0, 194, 194,  76,  66, 1 );
			this.addSheet( ZUSE.SheetTypes.SHEET_AE,  3,  11,  21,  50,  50, 2 );
			this.addSheet( ZUSE.SheetTypes.SHEET_AE,  0, 131, 141,  50,  50, 2 );
			this.addSheet( ZUSE.SheetTypes.SHEET_AB,  3,  74,  74, 135, 125, 2 );
			this.addSheet( ZUSE.SheetTypes.SHEET_AB,  2, 114, 114, 135, 125, 2 );
			this.addSheet( ZUSE.SheetTypes.SHEET_AB,  1, 154, 154, 135, 125, 2 );
			this.addSheet( ZUSE.SheetTypes.SHEET_AB,  0, 194, 194, 135, 125, 2 );
			this.addSheet( ZUSE.SheetTypes.SHEET_AE,  1,  91, 101,  50,  50, 3 );
			this.addSheet( ZUSE.SheetTypes.SHEET_AA,  3,  51,  61, 125, 125, 3 );
			this.addSheet( ZUSE.SheetTypes.SHEET_AA,  1, 131, 141, 125, 125, 3 );
			this.addSheet( ZUSE.SheetTypes.SHEET_AE,  2,  51,  61,  50,  50, 4 );
			this.addSheet( ZUSE.SheetTypes.SHEET_AA,  2,  91, 101, 125, 125, 4 );
			this.addSheet( ZUSE.SheetTypes.SHEET_AA,  0, 171, 181, 125, 125, 4 );
			this.addSheet( ZUSE.SheetTypes.SHEET_AP, '',  -6,   4,  84,  84, 5 );
			this.addSheet( ZUSE.SheetTypes.SHEET_AG,  1,   0,   0,  70,  70, 6 );

			this.addStaticPin(  25,  75 );
			this.addStaticPin(  65,  75 );
			this.addStaticPin( 105,  75 );
			this.addStaticPin( 145,  75 );
			this.addStaticPin( 185,  75 );
			this.addStaticPin( 225,  75 );
			this.addStaticPin(  65, 155 );
			this.addStaticPin( 105, 155 );
			this.addStaticPin( 145, 155 );
			this.addStaticPin( 185, 155 );
			this.addStaticPin( 225, 155 );
			this.addMovingPin(  80,  90, 100,  90, "E3" );
			this.addMovingPin( 120, 130, 100,  90, "E2" );
			this.addMovingPin( 160, 170, 100,  90, "E1" );
			this.addMovingPin( 200, 210, 100,  90, "E0" );
			this.addMovingPin(  80,  90, 140, 130, "D3" );
			this.addMovingPin( 120, 130, 140, 130, "D2" );
			this.addMovingPin( 160, 170, 140, 130, "D1" );
			this.addMovingPin( 200, 210, 140, 130, "D0" );

			break;

		case ZUSE.LayerTypes.LAYER_B:

			this.levels = 8;

			this.addSheet( ZUSE.SheetTypes.SHEET_BG,   0,   0,   0,   0,   0, 0 );
			this.addSheet( ZUSE.SheetTypes.SHEET_BQ0, '', -10,   0,  10,   0, 1 );
			this.addSheet( ZUSE.SheetTypes.SHEET_BQ1, '',  50,  60, 110, 110, 1 );
			this.addSheet( ZUSE.SheetTypes.SHEET_BC,   3,  74,  74,  15,   5, 2 );
			this.addSheet( ZUSE.SheetTypes.SHEET_BC,   2, 114, 114,  15,   5, 2 );
			this.addSheet( ZUSE.SheetTypes.SHEET_BC,   1, 154, 154,  15,   5, 2 );
			this.addSheet( ZUSE.SheetTypes.SHEET_BC,   0, 194, 194,  15,   5, 2 );
			this.addSheet( ZUSE.SheetTypes.SHEET_BH,   2,  91, 101,   5,   5, 3 );
			this.addSheet( ZUSE.SheetTypes.SHEET_BH,   0, 171, 181,   5,   5, 3 );
			this.addSheet( ZUSE.SheetTypes.SHEET_BB,   3,  71,  81, 116, 106, 3 );
			this.addSheet( ZUSE.SheetTypes.SHEET_BB,   2, 111, 121, 116, 106, 3 );
			this.addSheet( ZUSE.SheetTypes.SHEET_BB,   1, 151, 161, 116, 106, 3 );
			this.addSheet( ZUSE.SheetTypes.SHEET_BB,   0, 191, 201, 116, 106, 3 );
			this.addSheet( ZUSE.SheetTypes.SHEET_BH,   3,  51,  61,   5,   5, 4 );
			this.addSheet( ZUSE.SheetTypes.SHEET_BH,   1, 131, 141,   5,   5, 4 );
			this.addSheet( ZUSE.SheetTypes.SHEET_BA,   3,  61,  71, 125, 125, 4 );
			this.addSheet( ZUSE.SheetTypes.SHEET_BA,   1, 141, 151, 125, 125, 4 );
			this.addSheet( ZUSE.SheetTypes.SHEET_BF,   3,  51,  61,  61,  61, 4 );
			this.addSheet( ZUSE.SheetTypes.SHEET_BF0, '', 171, 181,  61,  61, 4 );
			this.addSheet( ZUSE.SheetTypes.SHEET_BA,   2, 101, 111, 125, 125, 5 );
			this.addSheet( ZUSE.SheetTypes.SHEET_BA,   0, 181, 191, 125, 125, 5 );
			this.addSheet( ZUSE.SheetTypes.SHEET_BF4, '', -30, -20,  61,  61, 5 );
			this.addSheet( ZUSE.SheetTypes.SHEET_BF,   1, 131, 141,  61,  61, 5 );
			this.addSheet( ZUSE.SheetTypes.SHEET_BN,  '',   0,   0, 130, 120, 6 );
			this.addSheet( ZUSE.SheetTypes.SHEET_BF,   2,  91, 101,  61,  61, 6 );
			this.addSheet( ZUSE.SheetTypes.SHEET_BG,   1,   0,   0,   0,   0, 7 );

			this.addStaticPin(  65,  35 );
			this.addStaticPin( 105,  35 );
			this.addStaticPin( 145,  35 );
			this.addStaticPin( 185,  35 );
			this.addStaticPin( 225,  35 );
			this.addStaticPin(  25,  75 );
			this.addStaticPin(  65,  75 );
			this.addStaticPin( 105,  75 );
			this.addStaticPin( 145,  75 );
			this.addStaticPin( 185,  75 );
			this.addStaticPin( 225,  75 );
			this.addStaticPin(  75, 155 );
			this.addStaticPin( 115, 155 );
			this.addStaticPin( 155, 155 );
			this.addStaticPin( 195, 155 );
			this.addStaticPin( 235, 155 );
			this.addMovingPin(  80,  90,  20,  10, "H3" );
			this.addMovingPin( 120, 130,  20,  10, "H2" );
			this.addMovingPin( 160, 170,  20,  10, "H1" );
			this.addMovingPin( 200, 210,  20,  10, "H0" );
			this.addMovingPin(  80,  90, 100,  90, "G3" );
			this.addMovingPin( 120, 130, 100,  90, "G2" );
			this.addMovingPin( 160, 170, 100,  90, "G1" );
			this.addMovingPin( 200, 210, 100,  90, "G0" );
			this.addMovingPin(  65,  75, 115, 115, "Q8" );
			this.addMovingPin( 105, 115, 115, 115, "Q7" );
			this.addMovingPin( 145, 155, 115, 115, "Q6" );
			this.addMovingPin( 185, 195, 115, 115, "Q5" );
			this.addMovingPin( 225, 235, 115, 115, "Q4" );
			this.addMovingPin(  80,  90, 140, 130, "C3" );
			this.addMovingPin( 120, 130, 140, 130, "C2" );
			this.addMovingPin( 160, 170, 140, 130, "C1" );
			this.addMovingPin( 200, 210, 140, 130, "C0" );
			this.addMovingPin(  85,  95, 230, 230, "Q3", 1, 3 );
			this.addMovingPin( 125, 135, 230, 230, "Q2", 1, 3 );
			this.addMovingPin( 165, 175, 230, 230, "Q1", 1, 3 );
			this.addMovingPin( 205, 215, 230, 230, "Q0", 1, 3 );

			break;

		case ZUSE.LayerTypes.LAYER_C:

			this.levels = 7;

			this.addSheet( ZUSE.SheetTypes.SHEET_CG,  0,   0,   0,   0,   0, 0 );
			this.addSheet( ZUSE.SheetTypes.SHEET_CV, '',  34,  34, 135, 125, 1 );
			this.addSheet( ZUSE.SheetTypes.SHEET_CK,  2, 114, 114,  76,  66, 1 );
			this.addSheet( ZUSE.SheetTypes.SHEET_CK,  0, 194, 194,  76,  66, 1 );
			this.addSheet( ZUSE.SheetTypes.SHEET_CR, '',   0,   0,   5,  -5, 1 );
			this.addSheet( ZUSE.SheetTypes.SHEET_CS, '',  20,  30,  10,  10, 2 );
			this.addSheet( ZUSE.SheetTypes.SHEET_CT, '',  35,  45, 125, 125, 3 );
			this.addSheet( ZUSE.SheetTypes.SHEET_CW1, 2,  75,  85,  10,   0, 3 );
			this.addSheet( ZUSE.SheetTypes.SHEET_CW1, 0, 155, 165,  10,   0, 3 );
			this.addSheet( ZUSE.SheetTypes.SHEET_CU, '',   0,   0, 125, 115, 4 );
			this.addSheet( ZUSE.SheetTypes.SHEET_CW0, 2, 121, 121,  10,   0, 4 );
			this.addSheet( ZUSE.SheetTypes.SHEET_CW0, 0, 201, 201,  10,   0, 4 );
			this.addSheet( ZUSE.SheetTypes.SHEET_CM,  2, 114, 114, 125, 115, 5 );
			this.addSheet( ZUSE.SheetTypes.SHEET_CM,  0, 194, 194, 125, 115, 5 );
			this.addSheet( ZUSE.SheetTypes.SHEET_CF,  2,  91, 101,  61,  61, 5 );
			this.addSheet( ZUSE.SheetTypes.SHEET_CF,  0, 171, 181,  61,  61, 5 );
			this.addSheet( ZUSE.SheetTypes.SHEET_CJ,  2,  91, 101,  11,  11, 5 );
			this.addSheet( ZUSE.SheetTypes.SHEET_CJ,  0, 171, 181,  11,  11, 5 );
			this.addSheet( ZUSE.SheetTypes.SHEET_CG,  1,   0,   0,   0,   0, 6 );

			this.addStaticPin( 105,  35 );
			this.addStaticPin( 145,  35 );
			this.addStaticPin( 185,  35 );
			this.addStaticPin( 225,  35 );
			this.addStaticPin( 105,  75 );
			this.addStaticPin( 145,  75 );
			this.addStaticPin( 185,  75 );
			this.addStaticPin( 225,  75 );
			this.addStaticPin(  25, 155 );
			this.addStaticPin(  65, 155 );
			this.addStaticPin( 105, 155 );
			this.addStaticPin( 145, 155 );
			this.addStaticPin( 185, 155 );
			this.addStaticPin( 225, 155 );
			this.addMovingPin(  80,  90,  15,  15, "S0" );
			this.addMovingPin( 120, 130,  20,  10, "W2" );
			this.addMovingPin( 160, 170,  15,  15, "S1" );
			this.addMovingPin( 200, 210,  20,  10, "W0" );
			this.addMovingPin(  80,  90,  95,  95, "S2" );
			this.addMovingPin( 120, 130, 100,  90, "K2" );
			this.addMovingPin( 160, 170,  95,  95, "S3" );
			this.addMovingPin( 200, 210, 100,  90, "K0" );
			this.addMovingPin(  90,  90, 115, 115, "Z0" );
			this.addMovingPin( 105, 107, 115, 115, "Z1" );
			this.addMovingPin( 170, 170, 115, 115, "Z2" );
			this.addMovingPin( 185, 187, 115, 115, "Z3" );
			this.addMovingPin(  40,  50, 140, 130, "T"  );
			this.addMovingPin( 120, 130, 140, 130, "M2" );
			this.addMovingPin( 200, 210, 140, 130, "M0" );
			this.addMovingPin(  45,  45, 210, 200, "V", 0, 1 );

			break;

		case ZUSE.LayerTypes.LAYER_D:

			this.levels = 7;

			this.addSheet( ZUSE.SheetTypes.SHEET_DG,  0,   0,   0,   0,   0, 0 );
			this.addSheet( ZUSE.SheetTypes.SHEET_DV, '',  34,  34, 135, 125, 1 );
			this.addSheet( ZUSE.SheetTypes.SHEET_DK,  3,  74,  74,  76,  66, 1 );
			this.addSheet( ZUSE.SheetTypes.SHEET_DK,  1, 154, 154,  76,  66, 1 );
			this.addSheet( ZUSE.SheetTypes.SHEET_DR, '',   0,   0,   5,  -5, 1 );
			this.addSheet( ZUSE.SheetTypes.SHEET_DS, '',  20,  30,  10,  10, 2 );
			this.addSheet( ZUSE.SheetTypes.SHEET_DT, '',  35,  45, 125, 125, 3 );
			this.addSheet( ZUSE.SheetTypes.SHEET_DW1, 3,  35,  45,  10,   0, 3 );
			this.addSheet( ZUSE.SheetTypes.SHEET_DW1, 1, 115, 125,  10,   0, 3 );
			this.addSheet( ZUSE.SheetTypes.SHEET_DU, '',   0,   0, 125, 115, 4 );
			this.addSheet( ZUSE.SheetTypes.SHEET_DW0, 3,  81,  81,  10,   0, 4 );
			this.addSheet( ZUSE.SheetTypes.SHEET_DW0, 1, 161, 161,  10,   0, 4 );
			this.addSheet( ZUSE.SheetTypes.SHEET_DM,  3,  74,  74, 125, 115, 5 );
			this.addSheet( ZUSE.SheetTypes.SHEET_DM,  1, 154, 154, 125, 115, 5 );
			this.addSheet( ZUSE.SheetTypes.SHEET_DF,  3,  51,  61,  61,  61, 5 );
			this.addSheet( ZUSE.SheetTypes.SHEET_DF,  1, 131, 141,  61,  61, 5 );
			this.addSheet( ZUSE.SheetTypes.SHEET_DJ,  3,  51,  61,  11,  11, 5 );
			this.addSheet( ZUSE.SheetTypes.SHEET_DJ,  1, 131, 141,  11,  11, 5 );
			this.addSheet( ZUSE.SheetTypes.SHEET_DG,  1,   0,   0,   0,   0, 6 );

			this.addStaticPin(  65,  35 );
			this.addStaticPin( 105,  35 );
			this.addStaticPin( 145,  35 );
			this.addStaticPin( 185,  35 );
			this.addStaticPin(  65,  75 );
			this.addStaticPin( 105,  75 );
			this.addStaticPin( 145,  75 );
			this.addStaticPin( 185,  75 );
			this.addStaticPin(  25, 155 );
			this.addStaticPin(  65, 155 );
			this.addStaticPin( 105, 155 );
			this.addStaticPin( 145, 155 );
			this.addStaticPin( 185, 155 );
			this.addStaticPin( 225, 155 );
			this.addMovingPin(  40,  50,  15,  15, "S0" );
			this.addMovingPin(  80,  90,  20,  10, "W3" );
			this.addMovingPin( 120, 130,  15,  15, "S1" );
			this.addMovingPin( 160, 170,  20,  10, "W1" );
			this.addMovingPin(  40,  50,  95,  95, "S2" );
			this.addMovingPin(  80,  90, 100,  90, "K3" );
			this.addMovingPin( 120, 130,  95,  95, "S3" );
			this.addMovingPin( 160, 170, 100,  90, "K1" );
			this.addMovingPin( 103, 105, 115, 115, "Z1" );
			this.addMovingPin( 120, 120, 115, 115, "Z0" );
			this.addMovingPin( 183, 185, 115, 115, "Z3" );
			this.addMovingPin( 200, 200, 115, 115, "Z2" );
			this.addMovingPin(  40,  50, 140, 130, "T"  );
			this.addMovingPin(  80,  90, 140, 130, "M3" );
			this.addMovingPin( 160, 170, 140, 130, "M1" );
			this.addMovingPin(  45,  45, 210, 200, "V", 1, 6 );

			break;

		case ZUSE.LayerTypes.LAYER_0A:

			this.levels = 1.5;
			this.spacing = 10;
			this.intermediate = true;

			this.addIntermediateSheet( ZUSE.SheetTypes.SHEET_Z0A, 0, 70 );

			this.addStaticPin(  25,  75 );
			this.addStaticPin(  65,  75 );
			this.addStaticPin( 105,  75 );
			this.addStaticPin( 145,  75 );
			this.addStaticPin( 185,  75 );
			this.addStaticPin( 225,  75 );
			this.addStaticPin(  65, 155 );
			this.addStaticPin( 105, 155 );
			this.addStaticPin( 145, 155 );
			this.addStaticPin( 185, 155 );
			this.addStaticPin( 225, 155 );

			break;

		case ZUSE.LayerTypes.LAYER_AB:

			this.levels = 1.5;
			this.spacing = 10;
			this.intermediate = true;

			this.addIntermediateSheet( ZUSE.SheetTypes.SHEET_ZAB, 0, 0 );

			this.addStaticPin(  65,  35 );
			this.addStaticPin( 105,  35 );
			this.addStaticPin( 145,  35 );
			this.addStaticPin( 185,  35 );
			this.addStaticPin( 225,  35 );
			this.addStaticPin(  25,  75 );
			this.addStaticPin(  65,  75 );
			this.addStaticPin( 105,  75 );
			this.addStaticPin( 145,  75 );
			this.addStaticPin( 185,  75 );
			this.addStaticPin( 225,  75 );
			this.addStaticPin(  65, 155, 1, 3 );
			this.addStaticPin( 105, 155, 1, 3 );
			this.addStaticPin( 145, 155, 1, 3 );
			this.addStaticPin( 185, 155, 1, 3 );
			this.addStaticPin( 225, 155, 1, 3 );
			this.addStaticPin(  75, 155, 0, 2 );
			this.addStaticPin( 115, 155, 0, 2 );
			this.addStaticPin( 155, 155, 0, 2 );
			this.addStaticPin( 195, 155, 0, 2 );
			this.addStaticPin( 235, 155, 0, 2 );

			break;

		case ZUSE.LayerTypes.LAYER_BC:

			this.levels = 1.5;
			this.spacing = 10;
			this.intermediate = true;

			this.addIntermediateSheet( ZUSE.SheetTypes.SHEET_ZBC, 0, 0 );

			this.addStaticPin(  65,  35, 1, 3 );
			this.addStaticPin( 105,  35 );
			this.addStaticPin( 145,  35 );
			this.addStaticPin( 185,  35 );
			this.addStaticPin( 225,  35 );
			this.addStaticPin(  25,  75, 1, 3 );
			this.addStaticPin(  65,  75, 1, 3 );
			this.addStaticPin( 105,  75 );
			this.addStaticPin( 145,  75 );
			this.addStaticPin( 185,  75 );
			this.addStaticPin( 225,  75 );
			this.addStaticPin(  25, 155, 0, 2 );
			this.addStaticPin(  65, 155, 0, 2 );
			this.addStaticPin( 105, 155, 0, 2 );
			this.addStaticPin( 145, 155, 0, 2 );
			this.addStaticPin( 185, 155, 0, 2 );
			this.addStaticPin( 225, 155, 0, 2 );
			this.addStaticPin(  75, 155, 1, 3 );
			this.addStaticPin( 115, 155, 1, 3 );
			this.addStaticPin( 155, 155, 1, 3 );
			this.addStaticPin( 195, 155, 1, 3 );
			this.addStaticPin( 235, 155, 1, 3 );

			break;

		case ZUSE.LayerTypes.LAYER_CD:

			this.levels = 1.5;
			this.spacing = 10;
			this.intermediate = true;

			this.addIntermediateSheet( ZUSE.SheetTypes.SHEET_ZCD, 0, 0 );

			this.addStaticPin(  65,  35, 0, 2 );
			this.addStaticPin( 105,  35 );
			this.addStaticPin( 145,  35 );
			this.addStaticPin( 185,  35 );
			this.addStaticPin( 225,  35, 1, 3 );
			this.addStaticPin(  65,  75, 0, 2 );
			this.addStaticPin( 105,  75 );
			this.addStaticPin( 145,  75 );
			this.addStaticPin( 185,  75 );
			this.addStaticPin( 225,  75, 1, 3 );
			this.addStaticPin(  25, 155 );
			this.addStaticPin(  65, 155 );
			this.addStaticPin( 105, 155 );
			this.addStaticPin( 145, 155 );
			this.addStaticPin( 185, 155 );
			this.addStaticPin( 225, 155 );
			this.addMovingPin(  45,  45, 210, 200, "V" );

			break;

		case ZUSE.LayerTypes.LAYER_D0:

			this.levels = 1.5;
			this.spacing = 10;
			this.intermediate = true;

			this.addIntermediateSheet( ZUSE.SheetTypes.SHEET_ZD0, 0, 0 );

			this.addStaticPin(  65,  35 );
			this.addStaticPin( 105,  35 );
			this.addStaticPin( 145,  35 );
			this.addStaticPin( 185,  35 );
			this.addStaticPin(  65,  75 );
			this.addStaticPin( 105,  75 );
			this.addStaticPin( 145,  75 );
			this.addStaticPin( 185,  75 );
			this.addStaticPin(  25, 155 );
			this.addStaticPin(  65, 155 );
			this.addStaticPin( 105, 155 );
			this.addStaticPin( 145, 155 );
			this.addStaticPin( 185, 155 );
			this.addStaticPin( 225, 155 );

			break;

	}

	this.addStaticPin(   0,  90,   6 );
	this.addStaticPin( 240,  90,   6 );
	this.addMovingPin(  80,  90,  50,  50, "J3" );
	this.addMovingPin( 120, 130,  50,  50, "J2" );
	this.addMovingPin( 160, 170,  50,  50, "J1" );
	this.addMovingPin( 200, 210,  50,  50, "J0" );
	this.addMovingPin(  40,  50,  60,  60, "F4" );
	this.addMovingPin(  80,  90,  60,  60, "F3" );
	this.addMovingPin( 120, 130,  60,  60, "F2" );
	this.addMovingPin( 160, 170,  60,  60, "F1" );
	this.addMovingPin( 200, 210,  60,  60, "F0" );
	this.addMovingPin(  80,  90, 180, 180, "A3" );
	this.addMovingPin( 120, 130, 180, 180, "A2" );
	this.addMovingPin( 160, 170, 180, 180, "A1" );
	this.addMovingPin( 200, 210, 180, 180, "A0" );
	this.addMovingPin(  85,  85, 210, 200, "B3" );
	this.addMovingPin( 125, 125, 210, 200, "B2" );
	this.addMovingPin( 165, 165, 210, 200, "B1" );
	this.addMovingPin( 205, 205, 210, 200, "B0" );
	this.addMovingPin(   0,   0,  10,   0, "Y0", 6 );
	this.addMovingPin( 240, 240,  10,   0, "Y1", 6 );
	this.addMovingPin( 270, 280,  10,  10, "X0", 6 );
	this.addMovingPin(   0,   0, 130, 120, "Y2", 6 );
	this.addMovingPin( 240, 240, 130, 120, "Y3", 6 );
	this.addMovingPin( 270, 280, 130, 130, "X1", 6 );

};

ZUSE.Layer.prototype = {

	constructor: ZUSE.Layer,

	addSheet: function ( type, ordinal, x1, x2, y1, y2, level ) {

		var name = type + ordinal;
		var moving = ( x1 !== x2 || y1 !== y2 );
		var sheet = new ZUSE.Sheet( [ this.type, name ], type, x1, x2, y1, y2, 2 * level + 1, this.spacing, false, moving );
		this.meshes.add( sheet.mesh );
		this.sheets.push( sheet );
		this.cycleAccess[ name ] = sheet;

		this.parent.selectables2.push( sheet.mesh );

	},

	addIntermediateSheet: function ( type, x, y ) {

		var sheet = new ZUSE.Sheet( [ this.type, type ], type, x, x, y, y, 1.5, this.spacing, true, false );
		this.meshes.add( sheet.mesh );
		this.sheets.push( sheet );

		this.parent.selectables2.push( sheet.mesh );

	},

	addStaticPin: function ( x, y, a, b ) {

		var pin;
		var radius = 4;

		switch ( arguments.length ) {

			case 3:

				radius = a;

			case 2:

				pin = new ZUSE.Pin( null, x, x, y, y, 0, 2 * this.levels, this.spacing, radius, false );
				break;

			case 4:

				pin = new ZUSE.Pin( null, x, x, y, y, a, b, this.spacing, radius, false );
				break;

		}

		this.meshes.add( pin.mesh );
		this.pins.push( pin );

		this.parent.selectables2.push( pin.mesh );

	},

	addMovingPin: function ( x1, x2, y1, y2, name, a, b, c ) {

		var pin;
		var radius = 4;
		var isPulser = false;

		switch ( arguments.length ) {

			case 6:

				isPulser = true;
				radius = a;

			case 5:

				pin = new ZUSE.Pin( [ this.type, name ], x1, x2, y1, y2, 0, 2 * this.levels, this.spacing, radius, true );
				break;

			case 8:

				isPulser = true;
				radius = c;

			case 7:

				pin = new ZUSE.Pin( [ this.type, name ], x1, x2, y1, y2, 2 * a, 2 * b + 2, this.spacing, radius, true );
				break;

		}

		this.meshes.add( pin.mesh );
		this.pins.push( pin );
		this.cycleAccess[ name ] = pin;

		if ( isPulser ) {
			this.parent.pulsers.push( pin );
		}

		this.parent.selectables2.push( pin.mesh );

	},

	changeSpacing: function () {

		for ( var i = 0; i < this.sheets.length; i++ ) {

			var z = this.sheets[ i ].level * this.spacing;
			this.sheets[ i ].setHeight( z );

		}

		for ( var i = 0; i < this.pins.length; i++ ) {

			var z1 = this.pins[ i ].l1 * this.spacing;
			var z2 = this.pins[ i ].l2 * this.spacing;
			this.pins[ i ].setHeight( z1, z2 );

		}

	},

	getHeight: function () {

		return this.levels * 2 * this.spacing;

	},

	setVisibility: function ( bool ) {

		for ( var i = 0; i < this.meshes.children.length; i++ ) {

			this.meshes.children[ i ].visible = bool;

		}

	}

};

