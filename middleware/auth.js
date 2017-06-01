module.exports = {
    logged: function (req,res,next)
    {
        if(req.isAuthenticated())
        {
            res.redirect('/app/');
        }
        else
        {
            next();
        }
    }
};