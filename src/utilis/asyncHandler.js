// Method 1
//  --> Making a async handker function with help of promises

const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) => {
      next(error);
      res.status(error.code || 500).json({
        success: false,
        errorMessage: error.message,
      });
    });
  };
};

export { asyncHandler };

/*

Method 2
---> Making  a async handler function with help of async/await 


const asyncHandler = (fn) => async (req, res, next) => {
    try {
            await fn(req, res, next)
    } catch (error) {
        res.status(err.code || 500).json({
            success : false,
            errorMessage :  err.message
        })
    }
} 

*/
