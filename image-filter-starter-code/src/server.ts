import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

   app.get( "/filteredimage/", ( req: Request, res: Response ) => {
    // destruct our path params
    let { image_url } = req.query;
    console.log(image_url);

  
    if (!image_url) { 
      // respond with an error if not
      return res.status(400).send(`image url is required`);
    }

    // try to find the car by id
    let image = filterImageFromURL(image_url); 

    image.then(
    // Fulfillment handler
    (response) => {
        return res.status(200).send(response);
    },
    // Rejection handler for `fetch` promise
    (error) => {
        return res.status(404).send(`image is not found`);
    }
)
.catch((error) => {
    res.status(404).send(`image is not found`);
})


    
  } );

  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();