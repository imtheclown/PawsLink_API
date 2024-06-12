'use strict'

module.exports = app => {
    app.use((req, res, next) =>{
        // there is no response data
        if(!req.responseData){
            return next();
        }else{
            console.log(
                (req.responseData.statusCode === 200
                    ?req.responseData.statusCode
                    :req.responseData.statusCode +
                    ' - ' +
                    req.route.path
                )
            );
            if(!req.responseData.body){
                return res.sendStatus(req.responseData.statusCode || 202);
            } else {
                return res
                .status(req.responseData.statusCode || 202)
                .send(req.responseData.body)
            }
        }
    })
}