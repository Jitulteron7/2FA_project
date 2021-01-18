const express=require("express");
const app=express();
const BodyParser=require("body-parser");
const speakeasy=require("speakeasy");
const ejs=require("ejs");
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));
var secret=speakeasy.generateSecret({
  length:20
});
//time based one time password

app.get("/",function(req,res){
var token_G=speakeasy.totp({
  secret:secret.base32,
  encoding:"base32"
});

// console.log(token_G);
// exports.token=token_G;
res.render("index",{token:token_G});
});
app.post("/",function(req,res)
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
    res.send("<body style='background-color:#D0F4FB'><h1 style='color:red;position:absolute;left:5%;top:30%;font-size:5rem;translate(-50%,-50%)'>One Time password expired try again !!</h1></body>");
  }

});
app.listen(4000,function(err)
{
  if(err)
  {
    console.log(err);
  }
  else{
    console.log("Conneted to port 4000");
  }
})
