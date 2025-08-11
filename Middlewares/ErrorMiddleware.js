const ErrorMiddleware=(error, _req, res, _next)=>{
  console.log("Error",error);
  
  if(!error.status||error.status==500) 
    res.status(500).send(error.message);
  else res.status(error.status).send(error.message);
}

export default ErrorMiddleware;