const IS_ADMIN = true;

const verifyRole = (req,res,next) => {
    if (!IS_ADMIN) return res.send({error:"usuario no valido!"});
    next();
};
export { verifyRole };