const express=require();
const router=express.Router();
const BodyParser=require("body-parser");
const speakeasy=require("speakeasy");
router.get("/",function(req,res){
    res.render("index");
  
  var token_G=speakeasy.totp({
    secret:secret.base32,
    encoding:"base32"
  });
   console.log(token_G);
  });
  router.post("/",function(req,res)
  {
    const token =req.body.input;
    var token_V=speakeasy.totp.verify({
      secret:secret.base32,
      encoding:"base32",
      token:token,
      window:0,
    });
    if(token_V){
      res.write("<body style='background-color:#D0F4FB'><h1 style='color:green;position:absolute;left:40%;top:30%;font-size:5rem;translate(-50%,-50%)'>varified !!</h1></body>")
    }
    else{
      res.send("<body style='background-color:#D0F4FB'><h1 style='color:red;position:absolute;left:40%;top:30%;font-size:5rem;translate(-50%,-50%)'>One Time password expired try again</h1></body>");
    }
  
  });
  module.exports=router;