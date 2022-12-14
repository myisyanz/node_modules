#!/usr/bin/env node
/*
	Terminal Kit

	Copyright (c) 2009 - 2022 Cédric Ronvel

	The MIT License (MIT)

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/

"use strict" ;



const termkit = require( '../../lib/termkit.js' ) ;
const term = termkit.terminal ;

term.clear() ;



var document = term.createDocument( {
//	backgroundAttr: { bgColor: 'magenta' , dim: true } ,
} ) ;



//var placeHolder = 'var name = "Bob" ;\nconsole.log( `Hello ${name}! How are you?` ) ;\n\n' ;
//var placeHolder = 'var name = "Bob" ;\nconsole.log( `Hello ${name}! How are you?` ) ;\nconsole.log( `Hello $name}! How are you?` ) ;\n\n' ;
//var placeHolder = 'fn( 1 ) ;\n\n' ;
//var placeHolder = 're = /^some regexp (bob|bill) [a-zA-Z_-]+$/g ;\n' ;
var placeHolder = 're = {\n\tprop: "value" ,\n\tkey: 3\n} ;\n' ;
//var placeHolder = '\n' ;

try {
	var StateMachine = require( 'text-machine' ) ;

	var stateMachine = new StateMachine( {
		program: require( 'text-machine/languages/javascript.js' ) ,
		api: termkit.TextBuffer.TextMachineApi
	} ) ;
}
catch( error ) {
	if ( error.code === 'MODULE_NOT_FOUND' ) {
		placeHolder = 'Try to:\n"npm install text-machine"\n... to enjoy a mini demo of\na Javascript syntax highlighter!' ;
	}
	else {
		throw error ;
	}
}



var textBox = new termkit.EditableTextBox( {
	parent: document ,
	content: placeHolder ,
	attr: { bgColor: 'black' } ,
	//hidden: true ,
	x: 10 ,
	y: 2 ,
	width: 50 ,
	height: 20 ,
	scrollable: true ,
	vScrollBar: true ,
	//tabWidth: 2 ,
	//lineWrap: true ,
	wordWrap: true ,
	stateMachine: stateMachine
} ) ;

document.giveFocusTo( textBox ) ;

//setTimeout( () => textBox.setTabWidth( 8 ) , 1000 ) ;
//setTimeout( () => textBox.setTabWidth( 2 ) , 2000 ) ;

term.on( 'key' , function( key ) {
	switch( key ) {
		case 'CTRL_C' :
			term.grabInput( false ) ;
			term.hideCursor( false ) ;
			term.styleReset() ;
			term.clear() ;
			process.exit() ;
			break ;
		
		case 'CTRL_D' :
			term.saveCursor() ;
			term.moveTo( 1 , 25 ) ;
			term.styleReset() ;
			term.eraseDisplayBelow() ;
			term( "Content: %s" , textBox.getContent().replace( /\n/g , '\\n' ).replace( /\t/g , '\\t' ) ) ;
			term.restoreCursor() ;
			break ;
		
		case 'CTRL_W' :
			textBox.textBuffer.wrapAllLines( 20 ) ;
			textBox.draw() ;
			break ;
	}
} ) ;

