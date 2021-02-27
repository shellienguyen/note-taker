// Import application dependencies
const fs = require( 'fs' );
const express = require( 'express' );
const morganLogger = require( 'morgan' );
const path = require( 'path' );
const dbJasonNotes = require( './db/db.json' );

// Instantiate the server
const app = express();
const PORT = process.env.PORT || 3001;

// Setup middleware to parse json and urlendoded for POST requests
app.use( express.urlencoded({ extended: true }));
app.use( express.json());

// Setup middleware function to look up the files relative to the static
// directory.  The name of the statci dir is not part of the URL.
// Static files are files clients download from the server.  Express, by
// default does not allow static files, this middleware enables static files.
app.use( express.static( 'public' ));

// Setup morgan middleware to log HTTP requests and errors
app.use( morganLogger( 'dev' ));

/////////////////////////////////////////////////////////////

// ----------  Setup HTML Routes  ----------
// Locate and read the file's content, then send it back to the client
app.get( '/notes', ( req, res ) => {
   res.sendFile( path.join( __dirname, '/public/notes.html' ));
});

app.get( '*', ( req, res ) => {
   res.sendFile( path.join( __dirname, '/pulic/index.html' ));
});
// -----------------------------------------

// Listen for requests
app.listen( PORT, () => {
   console.log( `API server now on port ${PORT}!` );
});