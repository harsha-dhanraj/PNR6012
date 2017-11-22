var express = require('express');
var router = express.Router();
const Devices = require('../models/devices');
//to add new device if  it is not present 

router.post('/', (req, res, next) => {      //checking for already existing device
    console.log(req.body);
    var newDevice = req.body;
    var type = newDevice.metadata.type;
    console.log(type);
    Devices.getDevicebyDeviceType(type,(err,device)=>{
        if (device.length != 0){
            res.json({
                status:false,
                msg:"Device already Present"
            });
        }else{
            Devices.addDevice(newDevice,(err,device)=>{
                console.log(newDevice);
                if (err){
                    console.error(err);
                    res.json({
                        success: false,
                        msg: "Some Error"
                    });
                } else {
                    res.json({
                        success:true,
                        msg:"Device registered successfully....",
                        device:device
                    })
                }
            });
        }
    })
    
});

router.post('/find_by_type', (req, res, next) => {
    var type = req.body.type;
    Devices.getDevicebyDeviceType(type,(err,device)=>{
        if (device.length == 0){
            res.json({
                status:false,
                msg:"No Device(s) found"
            });
        }else{
            res.json({
                success:true,
                msg:"Device(s) found....",
                device:device
            })
        }
    })
});

router.get('/',(req,res,next)=>{
    Devices.getDevice((err,devices)=>{
        if (err){
            console.error(err);
            res.json({
                success:false,
                msg:"Some Error"
            })
        }else{
            res.json({
                success:true,
                devices:devices
            })
        }
    });
});
module.exports = router;