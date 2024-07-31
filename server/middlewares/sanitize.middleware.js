//  trims data
const sanitizeData = async (req,res,next)=>{
    // console.log('sanitizeData middleware called');
    for (const key in req.body) {
        if (typeof req.body[key] === 'string') {
          req.body[key] = req.body[key].trim();
        }
    }
    next()
}
export default sanitizeData;